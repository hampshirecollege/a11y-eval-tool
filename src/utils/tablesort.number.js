import Tablesort from 'tablesort';

const cleanNumber = (i) => i.replace(/[^\-?0-9.]/g, '');

const compareNumber = (a, b) => {
  let x = a;
  let y = b;

  x = parseFloat(x);
  y = parseFloat(y);

  x = isNaN(x) ? 0 : x;
  y = isNaN(y) ? 0 : y;

  return x - y;
};

Tablesort.extend('number',
  (item) => item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/),
  (a, b) => {
    let x = a;
    let y = b;

    x = cleanNumber(x);
    y = cleanNumber(y);

    return compareNumber(y, x);
  }
);

export default Tablesort;
