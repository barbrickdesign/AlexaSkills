$ErrorActionPreference = 'Stop'

# ================================
#  CONFIG
# ================================
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillsRoot = Join-Path $repoRoot 'GeneratedSkills'
$ask = if ($env:ASK_CMD) {
    $env:ASK_CMD
} elseif (Get-Command ask -ErrorAction SilentlyContinue) {
    'ask'
} elseif (Get-Command 'ask.cmd' -ErrorAction SilentlyContinue) {
    'ask.cmd'
} else {
    'ask'
}

$REAL_ARN = if ($env:SHARED_LAMBDA_ARN) {
    $env:SHARED_LAMBDA_ARN
} else {
    'arn:aws:lambda:us-east-1:253879783704:function:ask-r2d2-default-default-1777789576120'
}

if ($REAL_ARN -like '*YOUR_AWS_ACCOUNT_ID*' -or $REAL_ARN -like '*SharedSkillLambda*') {
    Write-Host 'ERROR: REAL_ARN still contains a placeholder.'
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$AllowedCategories = @(
    'KNOWLEDGE_AND_TRIVIA','GAMES','EDUCATION_AND_REFERENCE','LIFESTYLE',
    'MUSIC_AND_AUDIO','NOVELTY','HUMOR','MOVIES_AND_TV','SOCIAL','UTILITIES',
    'HEALTH_AND_FITNESS','FOOD_AND_DRINK','SMART_HOME','KIDS','BUSINESS_AND_FINANCE',
    'COMMUNICATION','SHOPPING','SPORTS','WEATHER'
)

$CategoryMap = @{
    'NOVELTY_AND_HUMOR' = 'NOVELTY'
    'PRODUCTIVITY' = 'UTILITIES'
    'GAMES_TRIVIA_AND_ACCESSORIES' = 'GAMES'
    'ENTERTAINMENT' = 'NOVELTY'
    'NEWS' = 'EDUCATION_AND_REFERENCE'
}

$DefaultCategory = 'KNOWLEDGE_AND_TRIVIA'

# ================================
#  ALWAYS FIX PERMISSIONS FIRST
# ================================
function Fix-Lambda-Permission {
    if (-not $REAL_ARN) {
        Write-Host 'Skipping Lambda permission fix because REAL_ARN is empty.'
        return
    }

    $functionName = ($REAL_ARN -split ':')[-1]
    Write-Host ''
    Write-Host '=== FIXING LAMBDA PERMISSIONS (GLOBAL ALEXA ACCESS) ==='
    Write-Host ''

    try {
        aws lambda add-permission `
            --function-name $functionName `
            --statement-id allow-alexa-all-skills `
            --action lambda:InvokeFunction `
            --principal alexa-appkit.amazon.com `
            --region us-east-1 `
            --output text 2>$null | Out-Null
    } catch {
        Write-Host 'Lambda permission already existed or could not be updated.'
    }

    Write-Host 'Lambda permission fix executed.'
    Write-Host ''
}

Fix-Lambda-Permission

# ================================
#  STRIP BOM
# ================================
function Strip-BOM($path) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $clean = $bytes[3..($bytes.Length-1)]
        [System.IO.File]::WriteAllBytes($path, $clean)
        return $true
    }
    return $false
}

# ================================
#  INVOCATION NAME FIXER
# ================================
function Convert-NameToInvocation([string]$name) {
    if (-not $name) { return 'my skill' }

    $n = $name.ToLowerInvariant()

    $n = $n -replace '0',' zero '
    $n = $n -replace '1',' one '
    $n = $n -replace '2',' two '
    $n = $n -replace '3',' three '
    $n = $n -replace '4',' four '
    $n = $n -replace '5',' five '
    $n = $n -replace '6',' six '
    $n = $n -replace '7',' seven '
    $n = $n -replace '8',' eight '
    $n = $n -replace '9',' nine '

    $n = -join ($n.ToCharArray() | ForEach-Object {
        if (($_ -ge 'a' -and $_ -le 'z') -or $_ -eq ' ' -or $_ -eq "'" -or $_ -eq '.') { $_ }
        else { ' ' }
    })

    $n = ($n -replace '\s+',' ').Trim()

    if ([string]::IsNullOrWhiteSpace($n)) { $n = 'my skill' }

    if (-not ($n[0] -ge 'a' -and $n[0] -le 'z')) {
        $n = 'the ' + $n
    }

    return $n
}

# ================================
#  FIX CATEGORY
# ================================
function Resolve-Category([string]$category) {
    if ($AllowedCategories -contains $category) {
        return $category
    }

    if ($CategoryMap.ContainsKey($category)) {
        return $CategoryMap[$category]
    }

    return $DefaultCategory
}

function Get-ModelPath($skillDir) {
    $paths = @(
        (Join-Path $skillDir 'models\en-US.json'),
        (Join-Path $skillDir 'skill-package\interactionModels\custom\en-US.json')
    )

    foreach ($path in $paths) {
        if (Test-Path $path) { return $path }
    }

    return $null
}

# ================================
#  FIX INVOCATION NAME IN MODEL
# ================================
function Fix-InvocationName($skillDir, $skillName, $manifestName) {
    $modelPath = Get-ModelPath $skillDir
    if (-not $modelPath) { return }

    Strip-BOM $modelPath | Out-Null

    try { $model = Get-Content $modelPath -Raw | ConvertFrom-Json }
    catch { return }

    if (-not $model.interactionModel -or -not $model.interactionModel.languageModel) { return }

    $sourceName = if ($manifestName) { $manifestName } elseif ($skillName) { $skillName } else { $model.interactionModel.languageModel.invocationName }
    $fixed = Convert-NameToInvocation $sourceName
    $model.interactionModel.languageModel.invocationName = $fixed

    $text = $model | ConvertTo-Json -Depth 50
    [System.IO.File]::WriteAllText($modelPath, $text, $utf8NoBom)
}

# ================================
#  NORMALIZE MANIFEST
# ================================
function Normalize-Manifest($skillDir) {
    $manifestPath = Join-Path $skillDir 'skill-package\skill.json'
    if (-not (Test-Path $manifestPath)) { return @{ status = 'missing'; name = $null } }

    Strip-BOM $manifestPath | Out-Null

    try { $json = Get-Content $manifestPath -Raw | ConvertFrom-Json }
    catch { return @{ status = 'invalid'; name = $null } }

    if (-not $json.manifest) { return @{ status = 'invalid'; name = $null } }
    if (-not $json.manifest.apis) { $json.manifest | Add-Member -MemberType NoteProperty -Name apis -Value @{} }
    if (-not $json.manifest.apis.custom) { $json.manifest.apis | Add-Member -MemberType NoteProperty -Name custom -Value @{} }
    $json.manifest.apis.custom.endpoint = @{ uri = $REAL_ARN }

    if (-not $json.manifest.publishingInformation) {
        $json.manifest | Add-Member -MemberType NoteProperty -Name publishingInformation -Value @{}
    }

    $category = $json.manifest.publishingInformation.category
    $json.manifest.publishingInformation.category = Resolve-Category $category

    $name = $null
    if ($json.manifest.publishingInformation.locales.'en-US'.name) {
        $name = [string]$json.manifest.publishingInformation.locales.'en-US'.name
    }

    $text = $json | ConvertTo-Json -Depth 50
    [System.IO.File]::WriteAllText($manifestPath, $text, $utf8NoBom)

    return @{ status = 'fixed'; name = $name }
}

# ================================
#  CHECK IF SKILL ALREADY DEPLOYED
# ================================
function Get-SkillId($skillDir) {
    $askStates = Join-Path $skillDir '.ask\ask-states.json'
    if (-not (Test-Path $askStates)) { return $null }

    try {
        $json = Get-Content $askStates -Raw | ConvertFrom-Json
        return $json.profiles.default.skillId
    } catch {
        return $null
    }
}

# ================================
#  FIX ALL MANIFESTS + MODELS (NO DEPLOY)
# ================================
function Fix-All-Manifests {
    $skillDirs = Get-ChildItem -Path $skillsRoot -Recurse -Filter ask-resources.json |
        Select-Object -ExpandProperty DirectoryName

    $log = @()

    foreach ($skillDir in $skillDirs) {
        $skillName = Split-Path $skillDir -Leaf
        Write-Host ''
        Write-Host "=== FIXING $skillName ==="

        $manifestPath = Join-Path $skillDir 'skill-package\skill.json'
        if (-not (Test-Path $manifestPath)) {
            $log += "$skillName : missing"
            Write-Host '  - Manifest missing.'
            continue
        }

        $norm = Normalize-Manifest $skillDir
        if ($norm.status -eq 'missing' -or $norm.status -eq 'invalid') {
            $log += "$skillName : $($norm.status)"
            Write-Host "  - Manifest $($norm.status)."
            continue
        }

        Fix-InvocationName $skillDir $skillName $norm.name
        $log += "$skillName : $($norm.status)"
    }

    $log | Set-Content (Join-Path $repoRoot 'manifest-fix-log.txt') -Encoding Ascii
    Write-Host ''
    Write-Host 'Manifest fix log written to manifest-fix-log.txt'
}

# ================================
#  DEPLOY SKILL (SAFE: NO RECREATION)
# ================================
function Deploy-Skill($skillDir, $skillName) {
    $lambdaPath = Join-Path $skillDir 'lambda\package.json'
    if (-not (Test-Path $lambdaPath)) { return 'nolambda' }

    $skillId = Get-SkillId $skillDir

    Push-Location (Join-Path $skillDir 'lambda')
    npm install --omit=dev --no-audit --no-fund | Out-Null
    Pop-Location

    if ($skillId) {
        Write-Host "  - Skill already exists ($skillId). Updating only."
        Push-Location $skillDir
        & $ask deploy --profile default --ignore-hash
        $code = $LASTEXITCODE
        Pop-Location
        if ($code -eq 0) { return 'updated' }
        return 'update-failed'
    }

    Write-Host '  - Creating NEW skill...'
    Push-Location $skillDir
    & $ask deploy --profile default
    $code = $LASTEXITCODE
    Pop-Location
    if ($code -eq 0) { return 'created' }
    return 'create-failed'
}

# ================================
#  DEPLOY ALL SKILLS (SAFE)
# ================================
function Deploy-All {
    $skillDirs = Get-ChildItem -Path $skillsRoot -Recurse -Filter ask-resources.json |
        Select-Object -ExpandProperty DirectoryName

    foreach ($skillDir in $skillDirs) {
        $skillName = Split-Path $skillDir -Leaf
        Write-Host ''
        Write-Host "=== $skillName ==="

        $norm = Normalize-Manifest $skillDir
        if ($norm.status -eq 'missing' -or $norm.status -eq 'invalid') {
            Write-Host "  - Skipping (manifest $($norm.status))."
            continue
        }

        Fix-InvocationName $skillDir $skillName $norm.name
        $result = Deploy-Skill $skillDir $skillName
        Write-Host 'Deploy:' $result
    }
}

# ================================
#  MENU
# ================================
Write-Host ''
Write-Host '1 = Fix Everything (Manifest + Category + Invocation) ONLY'
Write-Host '2 = Safe Deploy All (no recreation, includes fixes)'
Write-Host ''

$choice = Read-Host 'Choose'

switch ($choice) {
    '1' { Fix-All-Manifests }
    '2' { Deploy-All }
    default { Write-Host 'Invalid choice' }
}
