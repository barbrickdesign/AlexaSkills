// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Career Generator Barbie Edition — category: utility, theme: barbie

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Career Generator Barbie Edition is ready. This Barbie-world skill is here to assist you. Say help for options, or tell me what you need.";
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
    const speakOutput = "Career Generator Barbie Edition is here and Barbie-world. How can I assist you today? I can help with a variety of tasks related to Barbieland. Just let me know what you need.";
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
    const speakOutput = "Career Generator Barbie Edition is a Barbie-world Alexa skill. You can ask for help, start a task, or explore what this skill offers. Say go to begin.";
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
    const speakOutput = "Goodbye! Come back anytime you need Barbie-world assistance.";
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
    const speakOutput = `I heard ${intentName}, but Career Generator Barbie Edition works best with its main commands right now. Career Generator Barbie Edition is a Barbie-world Alexa skill. You can ask for help, start a task, or explore what this skill offers. Say go to begin.`;
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
