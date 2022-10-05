'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

/**
 * Adds purchase to budget if value of purchase is smaller than limit for user
 * @param {number} purchaseValue
 * @param {string} description
 * @param {string} user
 * @returns {object[]}
 */
const addPurchase = function (
  budget,
  limits,
  purchaseValue,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  const userLimit = limits[cleanUser] ?? 0;

  return purchaseValue <= userLimit
    ? [...budget, { value: -purchaseValue, description, user }]
    : budget;
};

const newExpenses = [
  { purchaseValue: 10, description: 'Pizza 🍕' },
  { purchaseValue: 100, description: 'Going to movies 🍿', user: 'Matilda' },
  { purchaseValue: 200, description: 'Stuff', user: 'Jay' },
];

let newBudget = newExpenses.reduce(
  (currentBudget, item) =>
    addPurchase(
      currentBudget,
      spendingLimits,
      item.purchaseValue,
      item.description,
      item?.user
    ),
  budget
);

console.log(newBudget);

/**
 * Returns a copy of budget with a flag assigned to all purchase that are over
 * limit
 * @param {object[]} budget
 * @returns {object[]}
 */
const flagBigExpenses = function (budget) {
  return budget.map(item => {
    const userLimit = spendingLimits[item.user] ?? 0;
    return item.value < -userLimit ? { ...item, flag: 'limit' } : item;
  });
};

console.log(flagBigExpenses(newBudget));

/**
 * Prints category emojis of purchases larger than bigPurchaseLimit as single
 * string.
 *
 * @param {number} bigExpenseLimit
 * @param {object[]} budget
 */
const printBigExpenseCategories = function (bigExpenseLimit, budget) {
  const output = budget
    .filter(item => item.value <= -bigExpenseLimit)
    .map(item => item.description.slice(-2)) // Get category emoji (2 chars)
    .join(' / ');

  console.log(output);
};
printBigExpenseCategories(100, budget);
