/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

// Simple R2-style beep sets + translations
const BEEP_SETS = [
  {
    beeps: "Bwoo-dee-woop!",
    translation: "R2 says: everything looks good. Systems are nominal."
  },
  {
    beeps: "Wreee-dit dit dit!",
    translation: "R2 says: he's ready for the next mission."
  },
  {
    beeps: "Bwoo-woo-wooo!",
    translation: "R2 says: he’s excited and slightly suspicious of this plan."
  },
  {
    beeps: "Dwoo-dit dit, bwoo!",
    translation: "R2 says: he’ll handle the technical side if you handle the humans."
  },
  {
    beeps: "Woop-dit-dit-woop!",
    translation: "R2 says: he just ran a quick scan and everything checks out."
  }
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Bwoo-dee-woop! R2 is online. You can say things like: 'give me a status report', 'run diagnostics', or 'beep for me'. What do you want R2 to do?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("What do you want R2 to do?")
      .getResponse();
  }
};

const BeepIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BeepIntent';
  },
  handle(handlerInput) {
    const set = randomFrom(BEEP_SETS);
    const speakOutput = `${set.beeps} ${set.translation}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("You can ask for a status report or diagnostics.")
      .getResponse();
  }
};

const StatusIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StatusIntent';
  },
  handle(handlerInput) {
    // Placeholder: later you can call your backend here (AgentR2, mesh, etc.)
    const speakOutput = "Bwoo-dit-woop! R2 reports: systems stable, attitude optimistic, and mission readiness at one hundred percent.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("You can say: run diagnostics, or beep for me.")
      .getResponse();
  }
};

const DiagnosticsIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DiagnosticsIntent';
  },
  handle(handlerInput) {
    // Placeholder: later you can wire this to /agentr2/status or similar
    const speakOutput = "Wreee-dit dit dit! R2 runs a quick diagnostic. Power levels are strong, communication channels are clear, and no critical faults are detected.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("You can ask: what's the mission, or translate that.")
      .getResponse();
  }
};

const MissionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MissionIntent';
  },
  handle(handlerInput) {
    const speakOutput = "Bwoo-woo-wooo! R2 says: today's mission is to stay alert, keep the systems running, and help you whenever you call. No Imperial entanglements detected... yet.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("You can say: give me a status report, or run diagnostics.")
      .getResponse();
  }
};

const TranslateIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TranslateIntent';
  },
  handle(handlerInput) {
    const set = randomFrom(BEEP_SETS);
    const speakOutput = `${set.beeps} ${set.translation}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("You can ask R2 for a mission update or a status report.")
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = "You’re talking to R2. You can say things like: beep for me, give me a status report, run diagnostics, or what's the mission.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("What do you want R2 to do?")
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
    const speakOutput = "Bwoo-dit. R2 is powering down. May the Force be with you.";
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
    const speakOutput = "Wreee-woop? R2 didn't quite understand that. Try saying: beep for me, or give me a status report.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Try saying: run diagnostics, or what's the mission.")
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Cleanup logic if needed
    return handlerInput.responseBuilder.getResponse();
  }
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}. R2 is still learning this one.`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = "Woop-woop. Something went wrong. Try again, maybe with a simpler request.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Try saying: beep for me, or give me a status report.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    BeepIntentHandler,
    StatusIntentHandler,
    DiagnosticsIntentHandler,
    MissionIntentHandler,
    TranslateIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
