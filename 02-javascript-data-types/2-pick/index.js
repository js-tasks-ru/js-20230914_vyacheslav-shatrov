/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

  const newObj = {};
  const selected = [...fields];
  selected.forEach((el) => {
    if (obj.hasOwnProperty(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};
