/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  const locales = ['ru-RU-u-kf-upper', 'en-US-u-kf-upper'];

  if (param === 'asc') {
    newArr.sort((x, y) => x.localeCompare(y, locales));
  } else if (param === 'desc') {
    newArr.sort((x, y) => y.localeCompare(x, locales));
  }

  return newArr;
}

