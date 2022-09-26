/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/

let bmi = (weightKg, heightM) => weightKg / heightM ** 2;

let markBmi = bmi(78, 1.69);
let johnBmi = bmi(92, 1.95);

let markHigherBmi = bmi(78, 1.69) > bmi(92, 1.95);

let consoleString = markHigherBmi
  ? `Mark's BMI (${markBmi}) is higher than John's (${johnBmi})!`
  : `John's BMI (${johnBmi}) is higher than Mark's (${markBmi})!`;

console.log(consoleString);
