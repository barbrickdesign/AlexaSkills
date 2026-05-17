RootIB: RB-20260511160643-CBBE8BE7

TASK: Generate complete, functional Alexa skill code for this GeneratedSkills entry before deployment.

INPUT:
- Skill name: Na'vi Language Lesson of the Day
- Invocation: navi language lesson of the day
- Category: character
- Description: Interact with the voices and wisdom of Pandora. Get na'vi quotes, character lines, and memorable dialogue delivered straight to your Alexa device.
- Lambda handler path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/Na'vi Language Lesson of the Day/lambda/index.js
- Interaction model path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/Na'vi Language Lesson of the Day/skill-package/interactionModels/custom/en-US.json

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

// Na'vi Language Lesson of the Day — category: character, theme: avatar

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Na'vi Language Lesson of the Day is ready. You can ask me to speak in character, share a line, or deliver wisdom from Pandora. Say speak to hear something na'vi, or help for options.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from Pandora.")
      .getResponse();
  }
};

const SpeakIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SpeakIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Speaking from the heart of Pandora: every moment in this na'vi journey matters. The choices you make define who you are.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from Pandora.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Na'vi Language Lesson of the Day channels characters and voices from Pandora. Say speak or give me a line for na'vi dialogue.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from Pandora.")
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
    const speakOutput = "Until we meet again. Stay true to Pandora.";
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
    const speakOutput = "Try saying speak, or ask me to say something from Pandora.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from Pandora.")
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
    const speakOutput = `I heard ${intentName}, but Na'vi Language Lesson of the Day works best with its main commands right now. Na'vi Language Lesson of the Day channels characters and voices from Pandora. Say speak or give me a line for na'vi dialogue.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from Pandora.")
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
      .reprompt("Say speak or ask me something from Pandora.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    SpeakIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

```
