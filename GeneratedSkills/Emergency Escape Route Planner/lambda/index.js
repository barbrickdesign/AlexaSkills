// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Emergency Escape Route Planner — category: guide, theme: planet of the apes

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Emergency Escape Route Planner is your expert evolved-ape guide for the Ape Nation. Ask for tips, guidance, or say give me advice for your first recommendation.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
      .getResponse();
  }
};

const AdviceIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdviceIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Here's your evolved-ape guide tip for the Ape Nation: Success in the Ape Nation comes from preparation, adaptability, and understanding the key principles that govern this environment. Focus on foundational skills first, then build toward mastery through consistent practice.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Emergency Escape Route Planner provides evolved-ape guidance and expert advice for navigating the Ape Nation. Say give me advice or give me a tip to get started.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
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
    const speakOutput = "Good luck out there. Remember your evolved-ape guide training!";
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
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
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
    const speakOutput = `I heard ${intentName}, but Emergency Escape Route Planner works best with its main commands right now. Emergency Escape Route Planner provides evolved-ape guidance and expert advice for navigating the Ape Nation. Say give me advice or give me a tip to get started.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
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
      .reprompt("Say give me advice or ask for tips about the Ape Nation.")
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
