// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Red Pill or Blue Pill Daily Decision — category: oracle, theme: matrix

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "The Red Pill or Blue Pill Daily Decision awakens. The simulated forces of the Matrix are ready to speak. Ask your question, seek a prophecy, or say reveal to receive guidance.";
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
    const speakOutput = "The oracle speaks from the heart of the Matrix: paths converge in unexpected ways for those who remain simulated in spirit. Trust your instincts and move forward with purpose.";
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
    const speakOutput = "Red Pill or Blue Pill Daily Decision delivers simulated prophecies and guidance from the Matrix. Say reveal or ask a question for your answer.";
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
    const speakOutput = `I heard ${intentName}, but Red Pill or Blue Pill Daily Decision works best with its main commands right now. Red Pill or Blue Pill Daily Decision delivers simulated prophecies and guidance from the Matrix. Say reveal or ask a question for your answer.`;
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
