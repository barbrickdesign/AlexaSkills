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
