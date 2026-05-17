// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Lord Business Daily Instructions — category: daily-quote, theme: lego

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Lord Business Daily Instructions is here with today's brick-built inspiration from the LEGO universe. Say give me a quote for your daily message, or help for options.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a quote or today's quote for your daily message.")
      .getResponse();
  }
};

const QuoteIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuoteIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Today's brick-built message from the LEGO universe: \"Strength is not measured by how much you can bear alone, but by how wisely you choose when to stand firm and when to reach out.\" Let that guide you today.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a quote or today's quote for your daily message.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Lord Business Daily Instructions delivers a fresh brick-built quote from the LEGO universe each session. Say give me a quote to receive today's message.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a quote or today's quote for your daily message.")
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
    const speakOutput = "Carry today's wisdom with you. Goodbye from the LEGO universe.";
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
    const speakOutput = "Try saying give me a quote for your daily inspiration.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a quote or today's quote for your daily message.")
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
    const speakOutput = `I heard ${intentName}, but Lord Business Daily Instructions works best with its main commands right now. Lord Business Daily Instructions delivers a fresh brick-built quote from the LEGO universe each session. Say give me a quote to receive today's message.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me a quote or today's quote for your daily message.")
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
      .reprompt("Say give me a quote or today's quote for your daily message.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    QuoteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
