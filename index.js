'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined; // OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

let pFACTS = require('./facts');

const handlers = {
  LaunchRequest: function () {
    this.emit('GetFact');
  },
  GetNewFactIntent: function () {
    this.emit('GetFact');
  },
  GetFact: function () {
    pFACTS.then(facts => {
      // Get a random space fact from the space facts list
      let factIndex = Math.floor(Math.random() * facts.length);
      let cardTitle = 'Happiness is next to dogginess';
      let randomFact = facts[factIndex];

      // Create speech output
      let speechOutput = randomFact;

      this.emit(':tellWithCard', speechOutput, cardTitle, randomFact);
    });
  },
  'AMAZON.HelpIntent': function () {
    let speechOutput =
      'You can say tell me a space fact, or, you can say exit... What can I help you with?';
    let reprompt = 'What can I help you with?';
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Goodbye!');
  }
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
