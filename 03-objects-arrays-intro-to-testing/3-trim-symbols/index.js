/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let res = "";
  let curSize;

  for (let i = 0; i < string.length; i++) {
    if (string[i] !== string[i - 1]) {
      curSize = 0;
    }

    if (curSize >= size) {
      continue;
    }

    res += string[i];
    curSize++;
  }

  return res;
}
