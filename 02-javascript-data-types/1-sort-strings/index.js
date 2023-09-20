/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  const letterCodes =
  "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯяAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
  .split("");

  if (param === "desc") {
    letterCodes.reverse();
  }

  newArr.sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        return letterCodes.indexOf(a[i]) - letterCodes.indexOf(b[i]);
      }
    }
  });

  return newArr;
}

// sortStrings(['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'], 'asc'); // ['Абрикос', 'абрикос', 'Ёжик', 'ёжик', 'Яблоко', 'яблоко']
// sortStrings(['apple', 'Apple', 'banana', 'Banana', 'orange', 'Orange']);
// sortStrings([
//   "Детский велосипед Lexus Trike Racer Trike",
//   "ТВ тюнер D-COLOR  DC1301HD",
//   "Соска (пустышка) NUK 10729357",
//   "Powerbank аккумулятор Hiper SP20000",
//   "Соска (пустышка) Philips SCF182/12",

// ]);
