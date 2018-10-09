/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
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

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
   'Globally, the average cost of a slave is $90',
  'According to some estimates, approximately 80% of trafficking involves sexual exploitation, and 19% involves labor exploitation.',
  'There are approximately 20 to 30 million slaves in the world today.',
  'According to the U.S. State Department, 600,000 to 800,000 people are trafficked across international borders every year, of which 80% are female and half are children.',
  'The average age a teen enters the sex trade in the U.S. is 12 to 14-year-old. Many victims are runaway girls who were sexually abused as children.',
  'California harbors 3 of the FBI’s 13 highest child sex trafficking areas on the nation: Los Angeles, San Francisco and San Diego.',
  'The National Human Trafficking Hotline receives more calls from Texas than any other state in the US. 15% of those calls are from the Dallas-Fort Worth area.',
  'Human trafficking is the third largest international crime industry (behind illegal drugs and arms trafficking). It reportedly generates a profit of $32 billion every year. Of that number, $15.5 billion is made in industrialized countries.',
  'Lack of knowledge of whereabouts and/or do not know what city he/she is in.',
  'a trafficked person usually Appears malnourished',
  'a trafficked person usually has a pimp/manager nearby',
  'a trafficked person usually has a large debt',
  'a sign of a trafficked person includes low steem, self-blame, low confidence, etc',
  'a trafficked person usually has no possessions.',
  'a sign of a trafficked person includes Claims of just visiting and inability to clarify where he/she is staying/address',
  'a sign of a trafficked person is a lack of financial documents, records, etc',
  'a sign of a trafficked person is that they are not allowed or able to speak for themselves (a third party may insist on being present and/or translating)',
  'a sign of a trafficked person Exhibits unusually fearful or anxious behavior after bringing up law enforcement.',
  'A sign of a trafficked person Is being fearful, anxious, depressed, submissive, tense, or nervous/paranoid',
  'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
  'The International Labour Organization estimates that women and girls represent the largest share of forced labor victims with 11.4 million trafficked victims (55%) compared to 9.5 million (45%) men.',
  'A human trafficker can earn 20 times what he or she paid for a girl. Provided the girl was not physically brutalized to the point of ruining her beauty, the pimp could sell her again for a greater price because he had trained her and broken her spirit, which saves future buyers the hassle. A 2003 study in the Netherlands found that, on average, a single sex slave earned her pimp at least $250,000 a year.',
  'According to a 2009 Washington Times article, the Taliban buys children as young as seven years old to act as suicide bombers. The price for child suicide bombers is between $7,000-$14,000.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
