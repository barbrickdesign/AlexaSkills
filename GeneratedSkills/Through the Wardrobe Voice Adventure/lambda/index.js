// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Through the Wardrobe Voice Adventure — category: game, theme: fantasy realms

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to Through the Wardrobe Voice Adventure! Enter the epic world of fantasy realm and take on the challenge. Say start game to begin, or help for instructions.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start game to begin, or help for instructions.")
      .getResponse();
  }
};

const StartGameIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent';
  },
  handle(handlerInput) {
    const speakOutput = "The epic challenge begins! You find yourself in fantasy realm at a critical crossroads. Every decision matters. Your first challenge: you encounter an obstacle ahead. Do you go around it, push through, or find a creative solution? Choose wisely.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start game to begin, or help for instructions.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Through the Wardrobe Voice Adventure is an interactive epic experience set in fantasy realm. Say start game to begin, and follow the prompts to navigate the adventure.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start game to begin, or help for instructions.")
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
    const speakOutput = "Game paused. Return to fantasy realm whenever you're ready. Goodbye!";
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
    const speakOutput = "I didn't catch that. Say start game to begin the epic challenge.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start game to begin, or help for instructions.")
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
    const speakOutput = `I heard ${intentName}, but Through the Wardrobe Voice Adventure works best with its main commands right now. Through the Wardrobe Voice Adventure is an interactive epic experience set in fantasy realm. Say start game to begin, and follow the prompts to navigate the adventure.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say start game to begin, or help for instructions.")
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
      .reprompt("Say start game to begin, or help for instructions.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartGameIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
