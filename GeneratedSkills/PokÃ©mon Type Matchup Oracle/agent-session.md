RootIB: RB-20260511160643-7CD6052B

TASK: Generate complete, functional Alexa skill code for this GeneratedSkills entry before deployment.

INPUT:
- Skill name: PokÃ©mon Type Matchup Oracle
- Invocation: pokemon type matchup oracle
- Category: identifier
- Description: Identify any pokemon entity, creature, or specimen from Pokémon world. Describe what you've encountered and get an instant pocket-monster classification.
- Lambda handler path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/PokÃ©mon Type Matchup Oracle/lambda/index.js
- Interaction model path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/PokÃ©mon Type Matchup Oracle/skill-package/interactionModels/custom/en-US.json

CONSTRAINTS:
- Replace placeholder or template behavior with complete production-ready logic.
- Keep the skill deployable with ask deploy.
- Preserve RootIB provenance already present in source files.
- Use safe input handling and user-friendly Alexa responses.
- Do not deploy until the generated code is functionally complete.

OUTPUT:
- Fully implemented lambda/index.js behavior for the skill.
- Any interaction model updates required for the implemented intents.
- A brief readiness summary explaining whether the skill is ready to deploy.

VERIFY:
- The handler should not contain TODO placeholders or generic intent-reflector fallback behavior.
- The skill should provide meaningful responses for its main voice flow.
- The skill should be ready for syntax validation and ask deploy.

CURRENT_LAMBDA_EXCERPT:
```javascript
// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// PokÃ©mon Type Matchup Oracle — category: identifier, theme: pokemon

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "PokÃ©mon Type Matchup Oracle is online. I can identify any pokemon creature, entity, or type based on your description. Describe what you've encountered, or say identify something to begin.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

const IdentifyIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IdentifyIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Running identification scan for the Pokémon world. Based on typical characteristics, this appears to be a specimen with pocket-monster traits. Please describe more details for a precise match.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "PokÃ©mon Type Matchup Oracle identifies pokemon entities based on descriptions. Say identify or describe what you've found, and I'll classify it.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
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
    const speakOutput = "Identification session closed. Stay observant out there.";
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
    const speakOutput = "I couldn't identify that. Try describing physical features or behavior patterns.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
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
    const speakOutput = `I heard ${intentName}, but PokÃ©mon Type Matchup Oracle works best with its main commands right now. PokÃ©mon Type Matchup Oracle identifies pokemon entities based on descriptions. Say identify or describe what you've found, and I'll classify it.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = 'Sorry, something went wrong. Please try again.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    IdentifyIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

```
