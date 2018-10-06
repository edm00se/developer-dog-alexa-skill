'use strict';
const Alexa = require('ask-sdk-core');

const pFACTS = require('./facts');
const ALEXA_SKILL_ID = undefined;

// start: handler declarations
// core functionality for fact skill
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent')
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetFact');
  },
  handle(handlerInput) {
    return new Promise((resolve) => {
      pFACTS.getFacts()
        .then(facts => {
          const factIndex = Math.floor(Math.random() * facts.length);
          const randomFact = facts[factIndex];
          const cardTitle = 'Happiness is next to dogginess';
    
          resolve(handlerInput.responseBuilder
            .speak(randomFact)
            .withSimpleCard(cardTitle, randomFact)
            .getResponse());
        }).catch(err => {
          console.error(err);
          resolve(handlerInput.responseBuilder
            .speak('Something went horribly wrong. Hug the puppies!')
            .getResponse());
        });
    });
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak('You can say tell me a fact, or, you can say exit...')
      .reprompt('What can I help you with?')
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('I\'m sorry but Developer Dog doesn\'t understand that request. You can say tell me a fact, or, you can say exit...')
      .reprompt('What can I help you with?')
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent'
        || request.intent.name === 'AMAZON.NavigateHomeIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Goodbye!')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    return handlerInput.responseBuilder
      .speak('Sorry, but an error occurred. Squirrel!')
      .reprompt('What can I help you with?')
      .getResponse();
  },
};
// end: handlers

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  // .withSkillId(ALEXA_SKILL_ID)
  .lambda();
