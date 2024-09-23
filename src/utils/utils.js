// utils.js - debounce function
export function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);  // Use arrow function to retain correct `this` context
    };
  }
  