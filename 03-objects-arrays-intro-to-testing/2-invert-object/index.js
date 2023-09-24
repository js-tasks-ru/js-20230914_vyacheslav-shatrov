/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (typeof obj === "undefined") {
    return;
  }
  const inverted = [];
  Object.entries(obj).forEach((entry) => {
    inverted.push(([entry[0], entry[1]] = [entry[1], entry[0]]));
  });

  return Object.fromEntries(inverted);
}

