RootIB: RB-20260511160643-7A815B3D

TASK: Generate complete, functional Alexa skill code for this GeneratedSkills entry before deployment.

INPUT:
- Skill name: Which DC Hero or Villain Are You
- Invocation: which dc hero or villain are you
- Category: which-quiz
- Description: Find out which dc character or type you truly are with this legendary personality quiz. Answer a series of questions and discover your result from DC universe.
- Lambda handler path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/Which DC Hero or Villain Are You/lambda/index.js
- Interaction model path: /home/runner/work/barbrickdesign.github.io/barbrickdesign.github.io/GeneratedSkills/Which DC Hero or Villain Are You/skill-package/interactionModels/custom/en-US.json

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

// Which DC Hero or Villain Are You — category: which-quiz, theme: dc

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to Which DC Hero or Villain Are You! I'm about to figure out which dc character, hero, or type you truly are. Answer my questions honestly and I'll reveal your result. Ready? Say yes to begin, or help if you need instructions.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to start the quiz, or help for instructions.")
      .getResponse();
  }
};

const StartQuizIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartQuizIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Excellent! Here is your first question. In the DC universe, do you prefer to act boldly and charge into danger, or observe carefully and plan your next move?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to start the quiz, or help for instructions.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "In Which DC Hero or Villain Are You, I ask you a series of questions to find out which dc character or type you are. Say yes to start, or stop to exit.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to start the quiz, or help for instructions.")
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
    const speakOutput = "Thanks for taking the Which DC Hero or Villain Are You quiz. Until next time!";
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
    const speakOutput = "I didn't quite catch that. Try saying yes to begin the quiz.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to start the quiz, or help for instructions.")
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
    const speakOutput = `I heard ${intentName}, but Which DC Hero or Villain Are You works best with its main commands right now. In Which DC Hero or Villain Are You, I ask you a series of questions to find out which dc character or type you are. Say yes to start, or stop to exit.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say yes to start the quiz, or help for instructions.")
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
      .reprompt("Say yes to start the quiz, or help for instructions.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartQuizIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

```
