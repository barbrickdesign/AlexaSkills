// RootIB: RB-20260504022302-A1B2C3D4
'use strict';

const Alexa = require('ask-sdk-core');

// Magic Gift Identifier Encanto — category: identifier, theme: general

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Magic Gift Identifier Encanto is online. I can identify any general creature, entity, or type based on your description. Describe what you've encountered, or say identify something to begin.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

const IdentifyIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IdentifyIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Running identification scan for the your world. Based on typical characteristics, this appears to be a specimen with versatile traits. Please describe more details for a precise match.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Magic Gift Identifier Encanto identifies general entities based on descriptions. Say identify or describe what you've found, and I'll classify it.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
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
    const speakOutput = "Identification session closed. Stay observant out there.";
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
    const speakOutput = "I couldn't identify that. Try describing physical features or behavior patterns.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
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
    const speakOutput = `I heard ${intentName}, but Magic Gift Identifier Encanto works best with its main commands right now. Magic Gift Identifier Encanto identifies general entities based on descriptions. Say identify or describe what you've found, and I'll classify it.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Tell me what you want to identify, or say identify something.")
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
      .reprompt("Tell me what you want to identify, or say identify something.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    IdentifyIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    UnhandledIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
