// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Agent Smith Quote Machine — category: character, theme: matrix

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Agent Smith Quote Machine is ready. You can ask me to speak in character, share a line, or deliver wisdom from the Matrix. Say speak to hear something simulated, or help for options.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from the Matrix.")
      .getResponse();
  }
};

const SpeakIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SpeakIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Speaking from the heart of the Matrix: every moment in this simulated journey matters. The choices you make define who you are.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from the Matrix.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Agent Smith Quote Machine channels characters and voices from the Matrix. Say speak or give me a line for simulated dialogue.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from the Matrix.")
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
    const speakOutput = "Until we meet again. Stay true to the Matrix.";
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
    const speakOutput = "Try saying speak, or ask me to say something from the Matrix.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from the Matrix.")
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
    const speakOutput = `I heard ${intentName}, but Agent Smith Quote Machine works best with its main commands right now. Agent Smith Quote Machine channels characters and voices from the Matrix. Say speak or give me a line for simulated dialogue.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say speak or ask me something from the Matrix.")
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
      .reprompt("Say speak or ask me something from the Matrix.")
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
