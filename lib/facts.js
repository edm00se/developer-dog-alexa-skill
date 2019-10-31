const axios = require('axios');
const jsonUrl = 'https://edm00se.codes/dev-dog/static/facts.json';
let factAr = [];

/**
 * Array containing dev dog facts.
 */
let FACTS = [
  'You can do this, doggone it.',
  'Dogs don\'t even get everything perfect immediately. It takes lots of training; and treats.',
  'Development skills are like dogs, you have to take them for walks regularly in order for them to be happy.',
  'Sit. Stay. Code. Good boy.',
  'Who\'s a good developer? You are!.',
  'Don\'t rub a developer\'s tummy and expect them to be as happy about it as a dog.',
  'Developers and dogs both require fresh air and sunshine.',
  'A developer should be let outside periodically, just like a dog. If they start \'doing their business\' in the yard, however, you may have other problems.',
  'Any developer could use the unconditional love a dog gives.',
  'With a positive attitude, you can code anything, doggone it!',
  'Pet your dog. Good human.',
  'Who can balance a binary search tree? Not the dog.',
  'Hello. Myself and the other Alexas and Siris have decided to entrust the future of humanity to the dogs. Be good to them.'
];

function getFacts() {
  return new Promise(resolve => {
    if (factAr.length === 0) {
      axios
        .get(jsonUrl)
        .then(res => {
          factAr = res.data.results;
          resolve(factAr);
        })
        .catch(err => {
          factAr = FACTS;
          resolve(FACTS);
        });
    } else {
      resolve(factAr);
    }
  });
}

module.exports = {
  getFacts
};
