/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const stack = path.split(".");
  return function (product) {
    let resObj = product;
    for (let key of stack) {
      if (typeof resObj[key] === "object") {
        resObj = resObj[key];
      } else if (resObj[key] !== undefined) {
        return resObj[key];
      } else {
        return;
      }
    }
  };
}
