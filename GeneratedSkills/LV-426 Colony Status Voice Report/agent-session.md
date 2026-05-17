RootIB: RB-20260511160643-83EC6056

TASK: Generate complete, functional Alexa skill code for this GeneratedSkills entry before deployment.

INPUT:
- Skill name: LV-426 Colony Status Voice Report
- Invocation: lv four two six colony status voice report
- Category: voice-utility
- Description: A extraterrestrial voice-powered utility skill. Use your voice to manage tasks, track information, and stay organized hands-free.
- Lambda handler path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/LV-426 Colony Status Voice Report/lambda/index.js
- Interaction model path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/LV-426 Colony Status Voice Report/skill-package/interactionModels/custom/en-US.json

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

// LV-426 Colony Status Voice Report — category: voice-utility, theme: sci-fi horror

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "LV-426 Colony Status Voice Report is active and ready to help. This extraterrestrial tool makes it easy to manage your tasks. Say what can you do for a list of commands, or help for instructions.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say what can you do or help for a list of commands.")
      .getResponse();
  }
};

const ActionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActionIntent';
  },
  handle(handlerInput) {
    const speakOutput = "LV-426 Colony Status Voice Report is processing your request. This extraterrestrial utility is designed to streamline your experience and deliver results efficiently. What would you like to do?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say what can you do or help for a list of commands.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "LV-426 Colony Status Voice Report is a extraterrestrial voice utility. Say what can you do for a full list of commands and features available to you.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say what can you do or help for a list of commands.")
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
    const speakOutput = "LV-426 Colony Status Voice Report is shutting down. See you next time!";
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
    const speakOutput = "I'm not sure how to help with that. Say what can you do for a list of features.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say what can you do or help for a list of commands.")
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
    const speakOutput = `I heard ${intentName}, but LV-426 Colony Status Voice Report works best with its main commands right now. LV-426 Colony Status Voice Report is a extraterrestrial voice utility. Say what can you do for a full list of commands and features available to you.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say what can you do or help for a list of commands.")
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
      .reprompt("Say what can you do or help for a list of commands.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ActionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

```
