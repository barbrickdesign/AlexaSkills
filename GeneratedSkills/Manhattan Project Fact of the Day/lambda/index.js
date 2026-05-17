// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Manhattan Project Fact of the Day — category: fact-of-day, theme: military history

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Manhattan Project Fact of the Day is ready with today's tactical fact from the battlefield. Say give me a fact for your daily discovery, or help for options.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a fact for today's discovery.")
      .getResponse();
  }
};

const FactIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FactIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Today's tactical fact from the battlefield: The unique conditions found in the battlefield have produced some of the most remarkable phenomena ever documented. Researchers continue to uncover new details about how the battlefield operates and evolves.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a fact for today's discovery.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Manhattan Project Fact of the Day delivers a fresh tactical fact from the battlefield each day. Say give me a fact to hear today's discovery.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a fact for today's discovery.")
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
    const speakOutput = "Come back tomorrow for another fact. Goodbye!";
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
    const speakOutput = "Try saying give me a fact for today's discovery.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a fact for today's discovery.")
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
    const speakOutput = `I heard ${intentName}, but Manhattan Project Fact of the Day works best with its main commands right now. Manhattan Project Fact of the Day delivers a fresh tactical fact from the battlefield each day. Say give me a fact to hear today's discovery.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a fact for today's discovery.")
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
      .reprompt("Say give me a fact for today's discovery.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FactIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
