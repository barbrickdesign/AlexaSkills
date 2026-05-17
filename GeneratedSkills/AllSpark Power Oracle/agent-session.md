RootIB: RB-20260511150354-C5D3E1F7

TASK: Generate complete, functional Alexa skill code for this GeneratedSkills entry before deployment.

INPUT:
- Skill name: AllSpark Power Oracle
- Invocation: allspark power oracle
- Category: oracle
- Description: Receive robotic prophecies and guidance from the oracle of Cybertron. Ask your questions and discover what the forces of Cybertron reveal about your path.
- Lambda handler path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/AllSpark Power Oracle/lambda/index.js
- Interaction model path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/AllSpark Power Oracle/skill-package/interactionModels/custom/en-US.json

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

// AllSpark Power Oracle — category: oracle, theme: transformers

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "The AllSpark Power Oracle awakens. The robotic forces of Cybertron are ready to speak. Ask your question, seek a prophecy, or say reveal to receive guidance.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask your question or say reveal for a prophecy.")
      .getResponse();
  }
};

const RevealIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RevealIntent';
  },
  handle(handlerInput) {
    const speakOutput = "The oracle speaks from the heart of Cybertron: paths converge in unexpected ways for those who remain robotic in spirit. Trust your instincts and move forward with purpose.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask your question or say reveal for a prophecy.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "AllSpark Power Oracle delivers robotic prophecies and guidance from Cybertron. Say reveal or ask a question for your answer.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask your question or say reveal for a prophecy.")
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
    const speakOutput = "The oracle rests. Return when you seek guidance again.";
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
    const speakOutput = "The oracle requires a clearer question. Ask again.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask your question or say reveal for a prophecy.")
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
    const speakOutput = `I heard ${intentName}, but AllSpark Power Oracle works best with its main commands right now. AllSpark Power Oracle delivers robotic prophecies and guidance from Cybertron. Say reveal or ask a question for your answer.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask your question or say reveal for a prophecy.")
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
      .reprompt("Ask your question or say reveal for a prophecy.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    RevealIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

```
