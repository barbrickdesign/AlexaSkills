// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Infinity Stone Lore Guide — category: guide, theme: marvel

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Infinity Stone Lore Guide is your expert heroic guide for Marvel universe. Ask for tips, guidance, or say give me advice for your first recommendation.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
      .getResponse();
  }
};

const AdviceIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdviceIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Here's your heroic guide tip for Marvel universe: Success in Marvel universe comes from preparation, adaptability, and understanding the key principles that govern this environment. Focus on foundational skills first, then build toward mastery through consistent practice.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Infinity Stone Lore Guide provides heroic guidance and expert advice for navigating Marvel universe. Say give me advice or give me a tip to get started.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
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
    const speakOutput = "Good luck out there. Remember your heroic guide training!";
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
    const speakOutput = "Try saying give me advice or give me a tip.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
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
    const speakOutput = `I heard ${intentName}, but Infinity Stone Lore Guide works best with its main commands right now. Infinity Stone Lore Guide provides heroic guidance and expert advice for navigating Marvel universe. Say give me advice or give me a tip to get started.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
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
      .reprompt("Say give me advice or ask for tips about Marvel universe.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AdviceIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
