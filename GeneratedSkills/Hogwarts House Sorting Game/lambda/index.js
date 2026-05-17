// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Hogwarts House Sorting Game — category: which-quiz, theme: wizarding

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to Hogwarts House Sorting Game! I'm about to figure out which wizarding character, hero, or type you truly are. Answer my questions honestly and I'll reveal your result. Ready? Say yes to begin, or help if you need instructions.";
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
    const speakOutput = "Excellent! Here is your first question. In the Wizarding World, do you prefer to act boldly and charge into danger, or observe carefully and plan your next move?";
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
    const speakOutput = "In Hogwarts House Sorting Game, I ask you a series of questions to find out which wizarding character or type you are. Say yes to start, or stop to exit.";
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
    const speakOutput = "Thanks for taking the Hogwarts House Sorting Game quiz. Until next time!";
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
    const speakOutput = `I heard ${intentName}, but Hogwarts House Sorting Game works best with its main commands right now. In Hogwarts House Sorting Game, I ask you a series of questions to find out which wizarding character or type you are. Say yes to start, or stop to exit.`;
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
