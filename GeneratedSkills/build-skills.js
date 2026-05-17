// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const fs = require('fs');
const path = require('path');

// ─── Invocation Name Helpers ────────────────────────────────────────────────

const DIGIT_WORDS = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
  '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
};

const NUMBER_WORDS = {
  '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six',
  '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
  '100': 'one hundred', '1000': 'one thousand'
};

function toInvocationName(skillName) {
  let name = skillName;

  // Special token replacements (before lowercase)
  name = name.replace(/\b007\b/g, 'double oh seven');
  name = name.replace(/&/g, ' and ');

  // Normalize mojibake sequences (double-encoded UTF-8 chars in directory names)
  // e.g. PokÃ©mon — U+00C3 followed by U+00A9 → é → e
  name = name.replace(/\u00C3\u00A9/g, 'e'); // é (PokÃ©mon)
  name = name.replace(/\u00C3\u00A0/g, 'a'); // à
  name = name.replace(/\u00C3\u00A8/g, 'e'); // è
  name = name.replace(/\u00C3\u00AA/g, 'e'); // ê
  name = name.replace(/\u00C3\u00B9/g, 'u'); // ù
  name = name.replace(/\u00C3\u00BB/g, 'u'); // û

  // Normalize plain accented characters
  name = name.replace(/[éèêë]/g, 'e');
  name = name.replace(/[àâä]/g, 'a');
  name = name.replace(/[ùûü]/g, 'u');
  name = name.replace(/[ôöò]/g, 'o');
  name = name.replace(/[îï]/g, 'i');

  // Lowercase
  name = name.toLowerCase();

  // Remove dots
  name = name.replace(/\./g, '');

  // Replace hyphens with spaces
  name = name.replace(/-/g, ' ');

  // Replace apostrophes/special chars
  name = name.replace(/[''']/g, '');
  name = name.replace(/[^a-z0-9 ]/g, ' ');

  // Convert standalone number tokens to words
  name = name.replace(/\b(\d+)\b/g, (match) => {
    if (NUMBER_WORDS[match]) return NUMBER_WORDS[match];
    // Convert digit by digit for larger numbers not in the map
    return match.split('').map(d => DIGIT_WORDS[d] || d).join(' ');
  });

  // Collapse multiple spaces
  name = name.replace(/\s+/g, ' ').trim();

  return name;
}

// ─── Category Detection ──────────────────────────────────────────────────────

const CATEGORY_RULES = [
  { category: 'which-quiz',    keywords: ['which ', 'what are you', 'who are you', 'sorting'] },
  { category: 'identifier',    keywords: ['identifier', 'identify', ' species', ' entity', ' type matchup', 'symbiote', 'pandora creature', 'narnian creature', 'dragon species', 'dino species', 'sea creature', 'kung fu style', 'cosmic entity', 'demonic entity', 'spirit entity', 'federation species', 'mutant power', 'enchanted object'] },
  { category: 'oracle',        keywords: ['oracle', 'prophecy', 'panther god', 'eywa', 'decision', 'red pill', 'kwisatz'] },
  { category: 'character',     keywords: ['quote machine', 'character', 'ask the', 'talk to the', 'translator', 'minion language', 'na\'vi language', 'elvish word', 'glader slang', 'pirate code'] },
  { category: 'trivia',        keywords: ['trivia challenge', 'trivia', 'lore quiz', 'lore challenge', 'filmography quiz', 'pop culture comedy', 'lyric game', 'guess that', 'face-off quiz', 'timeline quiz'] },
  { category: 'daily-quote',   keywords: ['daily quote', 'quote', 'daily motivation', 'daily mantra', 'daily salute', 'daily reflection', 'daily empowerment', 'daily energy', 'daily pump', 'daily stress', 'daily wisdom', 'daily guidance', 'daily instructions', 'daily debrief', 'daily moana', 'daily terrible', 'daily joke', 'daily family'] },
  { category: 'fact-of-day',   keywords: ['fact of the day', 'fact of day', 'daily fact', 'daily science', 'daily scare', 'daily brief', 'word of the day', 'tip of the day', 'wisdom of the day', 'lesson of the day', 'lessons daily', 'life lessons'] },
  { category: 'briefing',      keywords: ['briefing', 'status report', 'daily briefing', 'daily report', 'daily debrief', 'daily orders', 'mission briefing', 'daily training', 'corporate briefing', 'heritage briefing', 'chronicle', 'stardate', 'captain\'s log', 'explorer\'s journal', 'daily prophet', 'daily planner', 'daily deals', 'daily metrics'] },
  { category: 'game',          keywords: ['game', 'challenge game', 'escape game', 'hunt game', 'adventure', 'puzzle game', 'detective game', 'survival challenge', 'battle royale', 'guessing game', 'mystery', 'choose-your-path', 'choose your path', 'face-off', 'morality test', 'pencil challenge', 'rose petal', 'saw trap', 'davy jones', 'dream realm', 'who is ghostface', 'neo vs smith', 'neuralyzer', 'shield throw', 'simba\'s growth'] },
  { category: 'guide',         keywords: ['guide', 'survival guide', 'training guide', 'advisor', 'planner', 'builder', 'coach', 'tutor', 'instructor', 'companion', 'tips', 'rules guide', 'bestiary'] },
  { category: 'voice-utility', keywords: ['voice ', 'calculator', 'converter', 'timer', 'tracker', 'reminder', 'log', 'journal', 'dashboard', 'automator', 'beat maker', 'inventory', 'brainstorm', 'scrollbot', 'ping map', 'mesh', 'trust ledger', 'swarm', 'mandomos', 'lead qualification', 'sales pipeline', 'device telemetry', 'package arrival', 'energy-usage', 'energy usage', 'aquarium monitor', 'password idea', 'random number', 'unit converter'] },
  { category: 'utility',       keywords: [''] }  // catch-all
];

function detectCategory(skillName) {
  const lower = skillName.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.category === 'utility') continue; // checked last
    for (const kw of rule.keywords) {
      if (kw && lower.includes(kw.toLowerCase())) {
        return rule.category;
      }
    }
  }
  return 'utility';
}

// ─── Theme / Content DB ──────────────────────────────────────────────────────

/**
 * Returns a set of themed phrases for the skill name.
 * Looks for keyword matches in skill name to pick the best theme bucket.
 */
function getTheme(skillName) {
  const lower = skillName.toLowerCase();

  const themes = [
    { keys: ['007', 'bond', 'james bond', 'mi6', 'spy', 'treadstone', 'bourne', 'maverick', 'top gun', 'mission impossible', 'imf', 'cia', 'callsign', 'martini'],
      label: 'espionage', adj: 'top-secret', world: 'intelligence world', color: 'midnight blue' },
    { keys: ['star wars', 'jedi', 'sith', 'r2', 'clone wars', 'darth', 'rebel', 'mandalorian', 'this is the way', 'force'],
      label: 'star wars', adj: 'galactic', world: 'galaxy far, far away', color: 'lightsaber blue' },
    { keys: ['marvel', 'avengers', 'mcu', 'spider', 'iron man', 'captain america', 'thor', 'hulk', 'shield', 'hydra', 'wakanda', 'vibranium', 'infinity', 'guardians', 'black panther', 'deadpool', 'wolverine', 'x-men', 'mutant', 'venom', 'carnage', 'symbiote', 'doctor strange', 'sanctum', 'multiverse', 'variants', 'spidey'],
      label: 'marvel', adj: 'heroic', world: 'Marvel universe', color: 'red and gold' },
    { keys: ['dc', 'batman', 'superman', 'wonder woman', 'gotham', 'justice league', 'aquaman', 'kryptonite', 'trident'],
      label: 'dc', adj: 'legendary', world: 'DC universe', color: 'dark knight black' },
    { keys: ['pokemon', 'pokémon', 'pokã©mon', 'pikachu', 'pokedex', 'pokédex', 'pokedollar', 'pokéteam', "who's that pokemon", "who's that pokémon"],
      label: 'pokemon', adj: 'pocket-monster', world: 'Pokémon world', color: 'Poké-yellow' },
    { keys: ['harry potter', 'hogwarts', 'wizarding', 'diagon', 'patronus', 'spell', 'potion', 'hufflepuff', 'gryffindor', 'slytherin', 'ravenclaw', 'voldemort', 'dumbledore'],
      label: 'wizarding', adj: 'magical', world: 'Wizarding World', color: 'enchanted purple' },
    { keys: ['lord of the rings', 'middle-earth', 'fellowship', 'hobbit', 'shire', 'mordor', 'elvish', 'ring-bearer', 'tolkien', 'nine realms explorer', 'narnian', 'narnia', 'wardrobe', 'aslan', 'white witch'],
      label: 'fantasy realms', adj: 'epic', world: 'fantasy realm', color: 'forest green' },
    { keys: ['star trek', 'federation', 'stardate', 'holodeck', 'vulcan', 'live long and prosper', 'enterprise'],
      label: 'star trek', adj: 'starfleet', world: 'Federation universe', color: 'starfleet gold' },
    { keys: ['matrix', 'neo', 'red pill', 'blue pill', 'spoon', 'zion', 'agent smith', 'morpheus'],
      label: 'matrix', adj: 'simulated', world: 'the Matrix', color: 'digital green' },
    { keys: ['terminator', 'skynet', 't-800', 't-1000', 'judgment day', 'i\'ll be back', 'cyberdyne'],
      label: 'terminator', adj: 'cybernetic', world: 'post-apocalyptic future', color: 'chrome silver' },
    { keys: ['back to the future', 'bttf', 'delorean', 'great scott', 'time travel', 'time machine', 'time-lost', 'time stone', 'time traveler'],
      label: 'time travel', adj: 'temporal', world: 'the timestream', color: 'flux capacitor blue' },
    { keys: ['jurassic', 'dinosaur', 'velociraptor', 'life finds a way', 'dino'],
      label: 'dinosaurs', adj: 'prehistoric', world: 'Jurassic era', color: 'jungle green' },
    { keys: ['alien', 'predator', 'xenomorph', 'lv-426', 'weyland', 'ripley'],
      label: 'sci-fi horror', adj: 'extraterrestrial', world: 'deep space', color: 'space black' },
    { keys: ['avatar', 'pandora', "na'vi", 'eywa', 'rda', 'unobtanium'],
      label: 'avatar', adj: 'na\'vi', world: 'Pandora', color: 'bioluminescent blue' },
    { keys: ['dune', 'fremen', 'spice', 'arrakis', 'atreides', 'harkonnen', 'kwisatz'],
      label: 'dune', adj: 'desert-world', world: 'Arrakis', color: 'sand gold' },
    { keys: ['transformers', 'autobot', 'decepticon', 'optimus', 'roll out', 'cybertronian', 'energon', 'allspark'],
      label: 'transformers', adj: 'robotic', world: 'Cybertron', color: 'Autobot red' },
    { keys: ['hunger games', 'mockingjay', 'panem', 'district', 'katniss', 'capitol', 'may the odds', 'arena'],
      label: 'hunger games', adj: 'district', world: 'Panem', color: 'Mockingjay gold' },
    { keys: ['lion king', 'simba', 'hakuna matata', 'pride rock', 'mufasa', 'remember who you are'],
      label: 'lion king', adj: 'pride lands', world: 'the Pride Lands', color: 'savanna gold' },
    { keys: ['shrek', 'ogre', 'layers', 'fiona', 'donkey', 'far far away', 'swamp'],
      label: 'shrek', adj: 'ogre-sized', world: 'Far Far Away', color: 'swamp green' },
    { keys: ['disney', 'pixar', 'animated', 'fairytale', 'classic fairytale', 'tale as old as time', 'bedtime', 'moana', 'wayfinding'],
      label: 'disney magic', adj: 'magical', world: 'Disney realm', color: 'fairy-tale gold' },
    { keys: ['frozen', 'let it go', 'elsa', 'olaf'],
      label: 'frozen', adj: 'icy', world: 'Arendelle', color: 'ice blue' },
    { keys: ['barbie', 'barbieland', 'kenough', 'dream house'],
      label: 'barbie', adj: 'Barbie-world', world: 'Barbieland', color: 'Barbie pink' },
    { keys: ['kung fu panda', 'shifu', 'po ', 'furious five', 'there are no accidents', 'dragon warrior'],
      label: 'kung fu panda', adj: 'kung-fu', world: 'the Valley of Peace', color: 'jade green' },
    { keys: ['how to train your dragon', 'httyd', 'hiccup', 'night fury', 'toothless', 'berk', 'dragon rider', 'dragon bond', 'dragon species'],
      label: 'dragons', adj: 'dragon-riding', world: 'Berk', color: 'dragon scale green' },
    { keys: ['mortal kombat', 'fatality', 'finish him', 'sub-zero', 'scorpion'],
      label: 'mortal kombat', adj: 'flawless-victory', world: 'Outworld', color: 'blood red' },
    { keys: ['fast and furious', 'f&f', 'toretto', 'quarter mile', 'family', 'vin diesel'],
      label: 'fast and furious', adj: 'high-octane', world: 'the race circuit', color: 'neon orange' },
    { keys: ['rocky', 'creed', 'eye of the tiger', 'philadelphia', 'boxing'],
      label: 'boxing', adj: 'champion', world: 'the ring', color: 'champion gold' },
    { keys: ['horror', 'slasher', 'scary', 'boogeyman', 'freddy', 'jason', 'michael myers', 'pennywise', 'ghostface', 'scream', 'conjuring', 'insidious', 'saw', 'jigsaw', 'camp crystal lake', 'final girl', 'do you like scary'],
      label: 'horror', adj: 'terrifying', world: 'the horror realm', color: 'blood red' },
    { keys: ['maze runner', 'glader', 'griever', 'wicked', 'scorch'],
      label: 'maze runner', adj: 'maze-running', world: 'the Maze', color: 'concrete grey' },
    { keys: ['witcher', 'geralt', 'sign', 'potion and sign'],
      label: 'witcher', adj: 'monster-hunting', world: 'the Continent', color: 'wolf silver' },
    { keys: ['greek myth', 'olympian', 'demigod', "camp half-blood", 'percy jackson', 'titan', 'zeus'],
      label: 'greek mythology', adj: 'olympian', world: 'Mount Olympus', color: 'golden laurel' },
    { keys: ['sonic', 'gotta go fast', 'dr eggman', 'chaos emerald'],
      label: 'sonic', adj: 'supersonic', world: 'Green Hill Zone', color: 'cobalt blue' },
    { keys: ['mean girls', 'burn book', 'on wednesdays', 'clique', 'teen movie'],
      label: 'teen drama', adj: 'totally fetch', world: 'high school', color: 'pink' },
    { keys: ['lego', 'emmet', 'master builder', 'everything is awesome', 'lord business', 'piece of resistance'],
      label: 'lego', adj: 'brick-built', world: 'the LEGO universe', color: 'bright yellow' },
    { keys: ['indiana jones', 'belongs in a museum', 'temple', 'artifact', 'archaeological'],
      label: 'archaeology', adj: 'adventurous', world: 'ancient ruins', color: 'golden tan' },
    { keys: ['enchanted', 'enchanting', 'giselle'],
      label: 'enchanted', adj: 'fairy-tale', world: 'Andalasia', color: 'royal blue' },
    { keys: ['pirates', 'pirate', 'captain jack', 'rum', 'seven seas', 'davy jones', 'sea'],
      label: 'pirates', adj: 'swashbuckling', world: 'the high seas', color: 'ocean blue' },
    { keys: ['wolf', 'wilderness', 'survival', 'wasteland', 'zombie', 'apocalyptic', 'flare virus', 'post-apocalyptic'],
      label: 'survival', adj: 'survival-ready', world: 'the wasteland', color: 'rust orange' },
    { keys: ['planet of the apes', 'ape ', 'caesar', 'simian', 'ape society', 'ape evolution'],
      label: 'planet of the apes', adj: 'evolved-ape', world: 'the Ape Nation', color: 'earth brown' },
    { keys: ['space', 'galaxy', 'galactic', 'astronaut', 'nebula', 'cosmos', 'lore keeper', 'star captain'],
      label: 'space', adj: 'cosmic', world: 'the cosmos', color: 'deep space purple' },
    { keys: ['war', 'wwii', 'manhattan project', 'military', 'howling commandos', 'tactical', 'fighter jet', 'dogfight'],
      label: 'military history', adj: 'tactical', world: 'the battlefield', color: 'olive green' },
    { keys: ['godzilla', 'kong', 'kaiju', 'monarch', 'monster island'],
      label: 'kaiju', adj: 'titan-sized', world: 'Monster Island', color: 'radiation green' },
    { keys: ['crypto', 'bitcoin', 'blockchain', 'nft', 'defi'],
      label: 'crypto', adj: 'decentralized', world: 'the blockchain', color: 'bitcoin orange' },
    { keys: ['fitness', 'workout', 'exercise', 'running', 'stretching', 'step', 'daily workout'],
      label: 'fitness', adj: 'fitness-focused', world: 'the gym', color: 'energy green' },
    { keys: ['meditation', 'mindfulness', 'stress', 'breathing', 'gratitude', 'cbt', 'sleep', 'soundscape'],
      label: 'wellness', adj: 'wellness', world: 'a peaceful space', color: 'calm blue' },
    { keys: ['recipe', 'cook', 'meal', 'food', 'nutrition', 'chimichanga', 'grocery', 'pantry'],
      label: 'cooking', adj: 'culinary', world: 'the kitchen', color: 'warm orange' },
    { keys: ['finance', 'budget', 'savings', 'spending', 'financial', 'business', 'revenue', 'sales'],
      label: 'finance', adj: 'financially savvy', world: 'the marketplace', color: 'dollar green' },
    { keys: ['pet', 'dog', 'cat', 'aquarium'],
      label: 'pets', adj: 'pet-friendly', world: 'the animal kingdom', color: 'warm brown' },
    { keys: ['home', 'decor', 'wardrobe', 'outfit', 'fashion', 'barbieland'],
      label: 'lifestyle', adj: 'stylish', world: 'the lifestyle scene', color: 'chic pink' },
    { keys: ['science', 'chemistry', 'physics', 'biology', 'nuclear', 'math', 'geology'],
      label: 'science', adj: 'scientific', world: 'the lab', color: 'electric blue' },
    { keys: ['history', 'history time machine', 'historical'],
      label: 'history', adj: 'historically rich', world: 'the archives', color: 'parchment gold' },
    { keys: ['music', 'song', 'mixtape', 'beat', 'theory', 'lyric'],
      label: 'music', adj: 'rhythmic', world: 'the music scene', color: 'concert purple' },
    { keys: ['language', 'word', 'phrase', 'travel phrase', 'learning companion'],
      label: 'language', adj: 'multilingual', world: 'the language lab', color: 'royal blue' },
    { keys: ['story', 'tale', 'poem', 'writing', 'journal', 'storybook', 'narrative'],
      label: 'creative writing', adj: 'imaginative', world: 'the story realm', color: 'literary amber' },
    { keys: ['kid', 'children', 'bedtime', 'reward', 'chore', 'school', 'homework'],
      label: 'family', adj: 'family-friendly', world: 'home', color: 'sunshine yellow' },
  ];

  for (const theme of themes) {
    for (const key of theme.keys) {
      if (key && lower.includes(key.toLowerCase())) {
        return theme;
      }
    }
  }

  return { label: 'general', adj: 'versatile', world: 'your world', color: 'sky blue' };
}

// ─── Content Templates ───────────────────────────────────────────────────────

function buildLambdaCode(skillName, category, invocationName, theme) {
  const { label, adj, world } = theme;

  const templates = {
    'which-quiz': {
      launch: `Welcome to ${skillName}! I'm about to figure out which ${label} character, hero, or type you truly are. Answer my questions honestly and I'll reveal your result. Ready? Say yes to begin, or help if you need instructions.`,
      reprompt: `Say yes to start the quiz, or help for instructions.`,
      mainIntent: 'StartQuizIntent',
      mainSamples: ['yes', 'start the quiz', 'begin', 'let\'s go', 'start', 'I\'m ready'],
      mainResponse: `Excellent! Here is your first question. In the ${world}, do you prefer to act boldly and charge into danger, or observe carefully and plan your next move?`,
      fallback: `I didn't quite catch that. Try saying yes to begin the quiz.`,
      help: `In ${skillName}, I ask you a series of questions to find out which ${label} character or type you are. Say yes to start, or stop to exit.`,
      stop: `Thanks for taking the ${skillName} quiz. Until next time!`,
    },
    'identifier': {
      launch: `${skillName} is online. I can identify any ${label} creature, entity, or type based on your description. Describe what you've encountered, or say identify something to begin.`,
      reprompt: `Tell me what you want to identify, or say identify something.`,
      mainIntent: 'IdentifyIntent',
      mainSamples: ['identify', 'what is this', 'identify something', 'run identification', 'scan this', 'what kind is this', 'classify this'],
      mainResponse: `Running identification scan for the ${world}. Based on typical characteristics, this appears to be a specimen with ${adj} traits. Please describe more details for a precise match.`,
      fallback: `I couldn't identify that. Try describing physical features or behavior patterns.`,
      help: `${skillName} identifies ${label} entities based on descriptions. Say identify or describe what you've found, and I'll classify it.`,
      stop: `Identification session closed. Stay observant out there.`,
    },
    'oracle': {
      launch: `The ${skillName} awakens. The ${adj} forces of ${world} are ready to speak. Ask your question, seek a prophecy, or say reveal to receive guidance.`,
      reprompt: `Ask your question or say reveal for a prophecy.`,
      mainIntent: 'RevealIntent',
      mainSamples: ['reveal', 'speak to me', 'what does the oracle say', 'give me a prophecy', 'tell me my fate', 'show me the path', 'what is my destiny'],
      mainResponse: `The oracle speaks from the heart of ${world}: paths converge in unexpected ways for those who remain ${adj} in spirit. Trust your instincts and move forward with purpose.`,
      fallback: `The oracle requires a clearer question. Ask again.`,
      help: `${skillName} delivers ${adj} prophecies and guidance from ${world}. Say reveal or ask a question for your answer.`,
      stop: `The oracle rests. Return when you seek guidance again.`,
    },
    'character': {
      launch: `${skillName} is ready. You can ask me to speak in character, share a line, or deliver wisdom from ${world}. Say speak to hear something ${adj}, or help for options.`,
      reprompt: `Say speak or ask me something from ${world}.`,
      mainIntent: 'SpeakIntent',
      mainSamples: ['speak', 'say something', 'give me a line', 'talk to me', 'what would you say', 'share some wisdom', 'tell me something'],
      mainResponse: `Speaking from the heart of ${world}: every moment in this ${adj} journey matters. The choices you make define who you are.`,
      fallback: `Try saying speak, or ask me to say something from ${world}.`,
      help: `${skillName} channels characters and voices from ${world}. Say speak or give me a line for ${adj} dialogue.`,
      stop: `Until we meet again. Stay true to ${world}.`,
    },
    'trivia': {
      launch: `Welcome to ${skillName}! Test your knowledge of ${world} across ${adj} trivia challenges. Say start trivia to begin, or help for instructions.`,
      reprompt: `Say start trivia to begin, or help for instructions.`,
      mainIntent: 'StartTriviaIntent',
      mainSamples: ['start trivia', 'begin', 'let\'s play', 'start the game', 'give me a question', 'quiz me', 'I\'m ready'],
      mainResponse: `Great! Here's your first ${adj} trivia question from ${world}: In the lore of ${world}, what is often considered the most powerful symbol of strength and courage? Take your best guess!`,
      fallback: `I didn't catch your answer. Try saying start trivia or help.`,
      help: `${skillName} tests your knowledge of ${world}. Say start trivia to get ${adj} questions and track your score.`,
      stop: `Thanks for playing ${skillName}. Keep exploring ${world}!`,
    },
    'daily-quote': {
      launch: `${skillName} is here with today's ${adj} inspiration from ${world}. Say give me a quote for your daily message, or help for options.`,
      reprompt: `Say give me a quote or today's quote for your daily message.`,
      mainIntent: 'QuoteIntent',
      mainSamples: ['give me a quote', "today's quote", 'inspire me', 'motivate me', 'what\'s the quote today', 'daily quote', 'say something inspiring'],
      mainResponse: `Today's ${adj} message from ${world}: "Strength is not measured by how much you can bear alone, but by how wisely you choose when to stand firm and when to reach out." Let that guide you today.`,
      fallback: `Try saying give me a quote for your daily inspiration.`,
      help: `${skillName} delivers a fresh ${adj} quote from ${world} each session. Say give me a quote to receive today's message.`,
      stop: `Carry today's wisdom with you. Goodbye from ${world}.`,
    },
    'fact-of-day': {
      launch: `${skillName} is ready with today's ${adj} fact from ${world}. Say give me a fact for your daily discovery, or help for options.`,
      reprompt: `Say give me a fact for today's discovery.`,
      mainIntent: 'FactIntent',
      mainSamples: ['give me a fact', "today's fact", 'tell me something', 'what\'s today\'s fact', 'fact of the day', 'educate me', 'surprise me'],
      mainResponse: `Today's ${adj} fact from ${world}: The unique conditions found in ${world} have produced some of the most remarkable phenomena ever documented. Researchers continue to uncover new details about how ${world} operates and evolves.`,
      fallback: `Try saying give me a fact for today's discovery.`,
      help: `${skillName} delivers a fresh ${adj} fact from ${world} each day. Say give me a fact to hear today's discovery.`,
      stop: `Come back tomorrow for another fact. Goodbye!`,
    },
    'briefing': {
      launch: `${skillName} is transmitting. Today's ${adj} briefing from ${world} is ready. Say start briefing or status report to receive your update.`,
      reprompt: `Say start briefing or status report.`,
      mainIntent: 'BriefingIntent',
      mainSamples: ['start briefing', 'status report', 'give me the briefing', 'what\'s the update', 'report in', 'briefing please', 'latest update'],
      mainResponse: `${adj.charAt(0).toUpperCase() + adj.slice(1)} briefing from ${world}: All key systems are nominal. Conditions remain stable across the primary sectors. No critical alerts at this time. Personnel are advised to maintain standard protocols and stay alert to any changes in the current situation. End of briefing.`,
      fallback: `Try saying start briefing or status report.`,
      help: `${skillName} delivers ${adj} status briefings and updates from ${world}. Say start briefing for the latest report.`,
      stop: `Briefing concluded. Stay informed and ready.`,
    },
    'game': {
      launch: `Welcome to ${skillName}! Enter the ${adj} world of ${world} and take on the challenge. Say start game to begin, or help for instructions.`,
      reprompt: `Say start game to begin, or help for instructions.`,
      mainIntent: 'StartGameIntent',
      mainSamples: ['start game', 'begin', 'let\'s play', 'start the challenge', 'I\'m ready', 'play', 'begin the adventure'],
      mainResponse: `The ${adj} challenge begins! You find yourself in ${world} at a critical crossroads. Every decision matters. Your first challenge: you encounter an obstacle ahead. Do you go around it, push through, or find a creative solution? Choose wisely.`,
      fallback: `I didn't catch that. Say start game to begin the ${adj} challenge.`,
      help: `${skillName} is an interactive ${adj} experience set in ${world}. Say start game to begin, and follow the prompts to navigate the adventure.`,
      stop: `Game paused. Return to ${world} whenever you're ready. Goodbye!`,
    },
    'guide': {
      launch: `${skillName} is your expert ${adj} guide for ${world}. Ask for tips, guidance, or say give me advice for your first recommendation.`,
      reprompt: `Say give me advice or ask for tips about ${world}.`,
      mainIntent: 'AdviceIntent',
      mainSamples: ['give me advice', 'give me a tip', 'guide me', 'what should I know', 'help me out', 'teach me something', 'best tip'],
      mainResponse: `Here's your ${adj} guide tip for ${world}: Success in ${world} comes from preparation, adaptability, and understanding the key principles that govern this environment. Focus on foundational skills first, then build toward mastery through consistent practice.`,
      fallback: `Try saying give me advice or give me a tip.`,
      help: `${skillName} provides ${adj} guidance and expert advice for navigating ${world}. Say give me advice or give me a tip to get started.`,
      stop: `Good luck out there. Remember your ${adj} guide training!`,
    },
    'voice-utility': {
      launch: `${skillName} is active and ready to help. This ${adj} tool makes it easy to manage your tasks. Say what can you do for a list of commands, or help for instructions.`,
      reprompt: `Say what can you do or help for a list of commands.`,
      mainIntent: 'ActionIntent',
      mainSamples: ['what can you do', 'go', 'start', 'run', 'activate', 'begin', 'execute'],
      mainResponse: `${skillName} is processing your request. This ${adj} utility is designed to streamline your experience and deliver results efficiently. What would you like to do?`,
      fallback: `I'm not sure how to help with that. Say what can you do for a list of features.`,
      help: `${skillName} is a ${adj} voice utility. Say what can you do for a full list of commands and features available to you.`,
      stop: `${skillName} is shutting down. See you next time!`,
    },
    'utility': {
      launch: `${skillName} is ready. This ${adj} skill is here to assist you. Say help for options, or tell me what you need.`,
      reprompt: `Tell me what you need or say help for options.`,
      mainIntent: 'ActionIntent',
      mainSamples: ['help me', 'go', 'start', 'what can you do', 'activate', 'begin', 'let\'s go'],
      mainResponse: `${skillName} is here and ${adj}. How can I assist you today? I can help with a variety of tasks related to ${world}. Just let me know what you need.`,
      fallback: `I didn't catch that. Say help for a list of what I can do.`,
      help: `${skillName} is a ${adj} Alexa skill. You can ask for help, start a task, or explore what this skill offers. Say go to begin.`,
      stop: `Goodbye! Come back anytime you need ${adj} assistance.`,
    },
  };

  const t = templates[category] || templates['utility'];

  return `// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// ${skillName} — category: ${category}, theme: ${label}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = ${JSON.stringify(t.launch)};
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

const ${t.mainIntent}Handler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === '${t.mainIntent}';
  },
  handle(handlerInput) {
    const speakOutput = ${JSON.stringify(t.mainResponse)};
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = ${JSON.stringify(t.help)};
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = ${JSON.stringify(t.stop)};
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speakOutput = ${JSON.stringify(t.fallback)};
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const UnhandledIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = \`I heard \${intentName}, but ${skillName} works best with its main commands right now. ${t.help}\`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(\`~~~~ Error handled: \${error.stack}\`);
    const speakOutput = 'Sorry, something went wrong. Please try again.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(${JSON.stringify(t.reprompt)})
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ${t.mainIntent}Handler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
`;
}

function buildInteractionModel(invocationName, category, mainIntent, mainSamples) {
  const baseIntents = [
    {
      name: mainIntent,
      slots: [],
      samples: mainSamples
    },
    {
      name: 'AMAZON.HelpIntent',
      samples: ['help', 'what can you do', 'how do I use this', 'instructions']
    },
    {
      name: 'AMAZON.CancelIntent',
      samples: ['cancel', 'never mind', 'forget it']
    },
    {
      name: 'AMAZON.StopIntent',
      samples: ['stop', 'exit', 'quit', 'goodbye']
    },
    {
      name: 'AMAZON.FallbackIntent',
      samples: []
    }
  ];

  return {
    interactionModel: {
      languageModel: {
        invocationName,
        intents: baseIntents,
        types: []
      }
    }
  };
}

function getCategoryAlexa(category) {
  const map = {
    'which-quiz': 'KNOWLEDGE_AND_TRIVIA',
    'identifier': 'KNOWLEDGE_AND_TRIVIA',
    'oracle': 'LIFESTYLE',
    'character': 'ENTERTAINMENT',
    'trivia': 'KNOWLEDGE_AND_TRIVIA',
    'daily-quote': 'LIFESTYLE',
    'fact-of-day': 'EDUCATION_AND_REFERENCE',
    'briefing': 'NEWS',
    'game': 'GAMES_TRIVIA_AND_ACCESSORIES',
    'guide': 'EDUCATION_AND_REFERENCE',
    'voice-utility': 'UTILITIES',
    'utility': 'UTILITIES',
  };
  return map[category] || 'UTILITIES';
}

function getCategoryDescription(skillName, category, theme) {
  const { label, adj, world } = theme;
  const descs = {
    'which-quiz': `Find out which ${label} character or type you truly are with this ${adj} personality quiz. Answer a series of questions and discover your result from ${world}.`,
    'identifier': `Identify any ${label} entity, creature, or specimen from ${world}. Describe what you've encountered and get an instant ${adj} classification.`,
    'oracle': `Receive ${adj} prophecies and guidance from the oracle of ${world}. Ask your questions and discover what the forces of ${world} reveal about your path.`,
    'character': `Interact with the voices and wisdom of ${world}. Get ${adj} quotes, character lines, and memorable dialogue delivered straight to your Alexa device.`,
    'trivia': `Test your knowledge of ${world} with ${adj} trivia questions. Challenge yourself on lore, facts, and memorable moments from ${world}.`,
    'daily-quote': `Start each day with a fresh ${adj} quote and inspiration from ${world}. Let the wisdom of ${world} guide and motivate you.`,
    'fact-of-day': `Discover something new every day with ${adj} facts about ${world}. Expand your knowledge with fascinating insights from ${world}.`,
    'briefing': `Stay informed with ${adj} briefings and status updates from ${world}. Get the latest news, reports, and important information delivered by voice.`,
    'game': `Embark on a ${adj} interactive adventure in ${world}. Make choices, face challenges, and shape the outcome of your story.`,
    'guide': `Your essential ${adj} guide to ${world}. Get expert tips, strategies, and advice to help you navigate ${world} with confidence.`,
    'voice-utility': `A ${adj} voice-powered utility skill. Use your voice to manage tasks, track information, and stay organized hands-free.`,
    'utility': `${skillName} is a ${adj} Alexa skill designed to assist you with everyday tasks related to ${world}.`,
  };
  return descs[category] || descs['utility'];
}

function buildSkillJson(skillName, category, theme, alexaCategory) {
  const description = getCategoryDescription(skillName, category, theme);
  const shortDesc = description.slice(0, 160);

  const examplePhrases = {
    'which-quiz': ['Alexa, open ' + skillName.slice(0, 40), 'start the quiz', 'yes, I\'m ready'],
    'identifier': ['Alexa, open ' + skillName.slice(0, 40), 'identify something', 'classify this'],
    'oracle': ['Alexa, open ' + skillName.slice(0, 40), 'reveal', 'give me a prophecy'],
    'character': ['Alexa, open ' + skillName.slice(0, 40), 'speak', 'give me a line'],
    'trivia': ['Alexa, open ' + skillName.slice(0, 40), 'start trivia', 'quiz me'],
    'daily-quote': ['Alexa, open ' + skillName.slice(0, 40), 'give me a quote', 'inspire me'],
    'fact-of-day': ['Alexa, open ' + skillName.slice(0, 40), 'give me a fact', 'today\'s fact'],
    'briefing': ['Alexa, open ' + skillName.slice(0, 40), 'start briefing', 'status report'],
    'game': ['Alexa, open ' + skillName.slice(0, 40), 'start game', 'let\'s play'],
    'guide': ['Alexa, open ' + skillName.slice(0, 40), 'give me advice', 'guide me'],
    'voice-utility': ['Alexa, open ' + skillName.slice(0, 40), 'what can you do', 'start'],
    'utility': ['Alexa, open ' + skillName.slice(0, 40), 'help', 'start'],
  };

  return {
    manifest: {
      publishingInformation: {
        locales: {
          'en-US': {
            summary: shortDesc,
            examplePhrases: examplePhrases[category] || examplePhrases['utility'],
            name: skillName,
            description
          }
        },
        isAvailableWorldwide: true,
        testingInstructions: `Say "Alexa, open ${skillName}" to launch. Follow the prompts to interact with the skill.`,
        category: alexaCategory,
        distributionCountries: []
      },
      apis: {
        custom: {
          endpoint: {
            uri: `arn:aws:lambda:us-east-1:253879783704:function:ask-${skillName}-default-default-1777789576120`
          }
        }
      },
      manifestVersion: '1.0'
    }
  };
}

// ─── Main Build Loop ─────────────────────────────────────────────────────────

const BASE_DIR = __dirname;

function getMainIntentInfo(category, templates) {
  // Returns {mainIntent, mainSamples} for the interaction model
  const map = {
    'which-quiz':    { intent: 'StartQuizIntent',    samples: ['yes', 'start the quiz', 'begin', 'let\'s go', 'start', 'I\'m ready'] },
    'identifier':    { intent: 'IdentifyIntent',      samples: ['identify', 'what is this', 'identify something', 'run identification', 'scan this', 'classify this'] },
    'oracle':        { intent: 'RevealIntent',         samples: ['reveal', 'speak to me', 'what does the oracle say', 'give me a prophecy', 'tell me my fate', 'what is my destiny'] },
    'character':     { intent: 'SpeakIntent',          samples: ['speak', 'say something', 'give me a line', 'talk to me', 'share some wisdom'] },
    'trivia':        { intent: 'StartTriviaIntent',    samples: ['start trivia', 'begin', 'let\'s play', 'quiz me', 'give me a question', 'I\'m ready'] },
    'daily-quote':   { intent: 'QuoteIntent',          samples: ['give me a quote', "today's quote", 'inspire me', 'motivate me', 'daily quote'] },
    'fact-of-day':   { intent: 'FactIntent',           samples: ['give me a fact', "today's fact", 'tell me something', 'educate me', 'fact of the day'] },
    'briefing':      { intent: 'BriefingIntent',       samples: ['start briefing', 'status report', 'give me the briefing', 'what\'s the update', 'report in'] },
    'game':          { intent: 'StartGameIntent',      samples: ['start game', 'begin', 'let\'s play', 'play', 'begin the adventure'] },
    'guide':         { intent: 'AdviceIntent',         samples: ['give me advice', 'give me a tip', 'guide me', 'what should I know', 'teach me something'] },
    'voice-utility': { intent: 'ActionIntent',         samples: ['what can you do', 'go', 'start', 'run', 'activate', 'begin'] },
    'utility':       { intent: 'ActionIntent',         samples: ['help me', 'go', 'start', 'what can you do', 'begin'] },
  };
  const info = map[category] || map['utility'];
  return { mainIntent: info.intent, mainSamples: info.samples };
}

function buildSkill(skillDir) {
  const skillName = path.basename(skillDir);
  const category = detectCategory(skillName);
  const invocationName = toInvocationName(skillName);
  const theme = getTheme(skillName);
  const alexaCategory = getCategoryAlexa(category);
  const { mainIntent, mainSamples } = getMainIntentInfo(category);

  // Paths
  const lambdaPath = path.join(skillDir, 'lambda', 'index.js');
  const modelPath = path.join(skillDir, 'skill-package', 'interactionModels', 'custom', 'en-US.json');
  const skillJsonPath = path.join(skillDir, 'skill-package', 'skill.json');
  const statusPath = path.join(skillDir, 'status.json');

  // Build content
  const lambdaCode = buildLambdaCode(skillName, category, invocationName, theme);
  const interactionModel = buildInteractionModel(invocationName, category, mainIntent, mainSamples);
  const skillJson = buildSkillJson(skillName, category, theme, alexaCategory);
  const statusJson = { generated: true, customized: true, deployed: false, published: false, category, builtAt: new Date().toISOString() };

  // Write files
  fs.writeFileSync(lambdaPath, lambdaCode, 'utf8');
  fs.writeFileSync(modelPath, JSON.stringify(interactionModel, null, 2), 'utf8');
  fs.writeFileSync(skillJsonPath, JSON.stringify(skillJson, null, 2), 'utf8');
  fs.writeFileSync(statusPath, JSON.stringify(statusJson, null, 2), 'utf8');

  return { skillName, category, invocationName, theme: theme.label };
}

function main() {
  console.log('🚀 Building all Alexa skills...\n');

  const entries = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules')
    .map(e => path.join(BASE_DIR, e.name));

  let built = 0;
  let errors = 0;
  const results = [];

  for (const skillDir of entries) {
    try {
      const result = buildSkill(skillDir);
      results.push(result);
      built++;
      if (built % 50 === 0) {
        console.log(`  ✅ ${built} skills customized...`);
      }
    } catch (err) {
      console.error(`  ❌ Error building ${path.basename(skillDir)}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n✅ Done! ${built} skills customized, ${errors} errors.\n`);

  // Print category breakdown
  const cats = {};
  for (const r of results) {
    cats[r.category] = (cats[r.category] || 0) + 1;
  }
  console.log('Category breakdown:');
  for (const [cat, count] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat.padEnd(20)} ${count}`);
  }

  // Write SKILLS_STATUS.md
  const now = new Date().toISOString();
  const catRows = Object.entries(cats).sort((a, b) => b[1] - a[1])
    .map(([cat, count]) => `| ${cat} | ${count} |`).join('\n');

  const statusMd = `RootIB: RB-20260504022302-A1B2C3D4

# Alexa Skills Status

**Built:** ${now}
**Total skills customized:** ${built}
**Errors:** ${errors}

## Category Breakdown

| Category | Count |
|---|---|
${catRows}

## Sample Skills by Category

${results.slice(0, 30).map(r => `- **${r.skillName}** → \`${r.category}\` (\`${r.invocationName}\`)`).join('\n')}

---
_Generated by build-skills.js_
`;

  fs.writeFileSync(path.join(BASE_DIR, 'SKILLS_STATUS.md'), statusMd, 'utf8');
  console.log('\n📄 SKILLS_STATUS.md written.');

  // Write deploy-skills.sh
  const deploySh = `#!/usr/bin/env bash
# RootIB: RB-20260504022302-A1B2C3D4
# deploy-skills.sh — Deploy all customized Alexa skills via ASK CLI
# Usage: ./deploy-skills.sh [--dry-run]

set -euo pipefail

DRY_RUN=false
if [[ "\${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 Dry run mode — no deployments will be made."
fi

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
BUILT=0
FAILED=0

echo "🚀 Deploying Alexa skills from \$SCRIPT_DIR ..."

for skill_dir in "\$SCRIPT_DIR"/*/; do
  skill_name="\$(basename "\$skill_dir")"

  # Skip if status.json says not customized
  status_file="\$skill_dir/status.json"
  if [[ ! -f "\$status_file" ]]; then
    echo "  ⚠️  Skipping \$skill_name (no status.json)"
    continue
  fi

  customized=\$(node -e "const s=require('\$status_file'); process.stdout.write(String(s.customized||false))")
  if [[ "\$customized" != "true" ]]; then
    echo "  ⏩ Skipping \$skill_name (not customized)"
    continue
  fi

  echo "  📦 Deploying: \$skill_name"

  if [[ "\$DRY_RUN" == "false" ]]; then
    pushd "\$skill_dir" > /dev/null
    ask deploy --ignore-hash || {
      echo "  ❌ Deploy failed for \$skill_name"
      FAILED=\$((FAILED+1))
      popd > /dev/null
      continue
    }
    popd > /dev/null
  fi

  BUILT=\$((BUILT+1))
done

echo ""
echo "✅ Deployment complete: \$BUILT succeeded, \$FAILED failed."
`;

  fs.writeFileSync(path.join(BASE_DIR, 'deploy-skills.sh'), deploySh, 'utf8');
  try { fs.chmodSync(path.join(BASE_DIR, 'deploy-skills.sh'), 0o755); } catch (_) {}
  console.log('📄 deploy-skills.sh written.\n');
}

main();
