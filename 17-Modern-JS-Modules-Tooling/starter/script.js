// Importing module
// import { addToCart, totalPrice as price } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';
console.log('Importing module');

ShoppingCart.addToCart('bread', 5);
ShoppingCart.cart.push({ product: 'pizza', quantity: 1 });
console.log(ShoppingCart.cart);

// Top-level await is blocking, and works only in modules
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

getLastPost().then(post => console.log(post));

// const lastPost = await getLastPost();
// console.log(lastPost);

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'bread', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = cloneDeep(state);
console.log(stateClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
  }
}

console.log('nullish' ?? null);

console.log(ShoppingCart.cart.filter(el => el.quantity >= 2));

Promise.resolve('PromiseTest').then(x => console.log(x));

console.log('Importing core-js');
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Polyfilling async functions
