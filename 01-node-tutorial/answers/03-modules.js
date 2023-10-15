const names = require("./04-names.js");
const utils = require("./05-utils.js");
const alternative = require("./06-alternative-flavor.js");

console.log(`module 4 :  ${names.name1}, ${names.name2} \n`);
console.log(`module 5 : ${utils.printval(alternative.person1.name)} \n`);
console.log(
  `module 6 :  ${alternative.person1.name}, ${alternative.person2.name} \n`
);
const grenade = require("./07-mind-grenade.js");
