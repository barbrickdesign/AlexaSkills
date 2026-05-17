// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Outfit Suggestion Skill — category: utility, theme: lifestyle

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Outfit Suggestion Skill is ready. This stylish skill is here to assist you. Say help for options, or tell me what you need.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you need or say help for options.")
      .getResponse();
  }
};

const ActionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActionIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Outfit Suggestion Skill is here and stylish. How can I assist you today? I can help with a variety of tasks related to the lifestyle scene. Just let me know what you need.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you need or say help for options.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Outfit Suggestion Skill is a stylish Alexa skill. You can ask for help, start a task, or explore what this skill offers. Say go to begin.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you need or say help for options.")
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
    const speakOutput = "Goodbye! Come back anytime you need stylish assistance.";
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
    const speakOutput = "I didn't catch that. Say help for a list of what I can do.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you need or say help for options.")
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
    const speakOutput = `I heard ${intentName}, but Outfit Suggestion Skill works best with its main commands right now. Outfit Suggestion Skill is a stylish Alexa skill. You can ask for help, start a task, or explore what this skill offers. Say go to begin.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you need or say help for options.")
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
      .reprompt("Tell me what you need or say help for options.")
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
