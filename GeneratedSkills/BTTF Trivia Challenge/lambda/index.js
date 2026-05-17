// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// BTTF Trivia Challenge — category: trivia, theme: time travel

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to BTTF Trivia Challenge! Test your knowledge of the timestream across temporal trivia challenges. Say start trivia to begin, or help for instructions.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start trivia to begin, or help for instructions.")
      .getResponse();
  }
};

const StartTriviaIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartTriviaIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Great! Here's your first temporal trivia question from the timestream: In the lore of the timestream, what is often considered the most powerful symbol of strength and courage? Take your best guess!";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start trivia to begin, or help for instructions.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "BTTF Trivia Challenge tests your knowledge of the timestream. Say start trivia to get temporal questions and track your score.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start trivia to begin, or help for instructions.")
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
    const speakOutput = "Thanks for playing BTTF Trivia Challenge. Keep exploring the timestream!";
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
    const speakOutput = "I didn't catch your answer. Try saying start trivia or help.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start trivia to begin, or help for instructions.")
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
    const speakOutput = `I heard ${intentName}, but BTTF Trivia Challenge works best with its main commands right now. BTTF Trivia Challenge tests your knowledge of the timestream. Say start trivia to get temporal questions and track your score.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start trivia to begin, or help for instructions.")
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
      .reprompt("Say start trivia to begin, or help for instructions.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartTriviaIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
