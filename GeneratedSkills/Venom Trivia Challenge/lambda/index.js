// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Venom Trivia Challenge — category: trivia, theme: marvel

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to Venom Trivia Challenge! Test your knowledge of Marvel universe across heroic trivia challenges. Say start trivia to begin, or help for instructions.";
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
    const speakOutput = "Great! Here's your first heroic trivia question from Marvel universe: In the lore of Marvel universe, what is often considered the most powerful symbol of strength and courage? Take your best guess!";
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
    const speakOutput = "Venom Trivia Challenge tests your knowledge of Marvel universe. Say start trivia to get heroic questions and track your score.";
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
    const speakOutput = "Thanks for playing Venom Trivia Challenge. Keep exploring Marvel universe!";
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
    const speakOutput = `I heard ${intentName}, but Venom Trivia Challenge works best with its main commands right now. Venom Trivia Challenge tests your knowledge of Marvel universe. Say start trivia to get heroic questions and track your score.`;
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
