function calculator(string) {
  //создаем массивы допустимых значений на входе
  const possibleDecimals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const possibleRomeNumbers = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
  ];

  const possibleOperators = ['+', '-', '/', '*'];

  const arrOfArg = string.split(' '); //разбиваем параметр по пробелу
  //находим операнды и оператор

  const leftParam = arrOfArg[0];
  const operator = arrOfArg[1];
  const rightParam = arrOfArg[2];

  if (arrOfArg.length > 3) {
    throw 'Операндов слишком много';
  }

  if (arrOfArg.length < 3) {
    throw 'Операндов слишком мало';
  }

  if (!possibleOperators.includes(operator)) {
    throw 'Не допустимый оператор';
  }

  //массивы для преобразования римских цифр в десятичные и обратно

  const font_ar = [1, 4, 5, 9, 10, 40, 50, 90, 100];
  const font_rom = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C'];

  //преобразуем десятичные в римские
  const to_roman = (text) => {
    if (!text) return '';
    let rezult = '';
    let n = font_ar.length - 1;
    while (text > 0) {
      if (text >= font_ar[n]) {
        rezult += font_rom[n];
        text -= font_ar[n];
      } else {
        n--;
      }
    }

    return rezult;
  };

  //преобразуем десятичные в римские
  const to_arab = (text) => {
    text = text.toUpperCase();
    let rezult = 0;
    let posit = 0;
    let n = font_ar.length - 1;
    while (n >= 0 && posit < text.length) {
      if (text.substr(posit, font_rom[n].length) == font_rom[n]) {
        rezult += font_ar[n];
        posit += font_rom[n].length;
      } else n--;
    }
    return rezult;
  };

  const calc = (lParam, oper, rParam) => {
    lParam = parseInt(lParam);
    rParam = parseInt(rParam);
    switch (oper) {
      case '+':
        return lParam + rParam;
      case '*':
        return lParam * rParam;
      case '/':
        if (rParam === 0) {
          throw 'на ноль делить нельзя';
        } else {
          return String(parseInt(lParam / rParam));
        }

      case '-':
        return lParam - rParam;
      default:
        throw 'нет ни одного оператора';
    }
  };

  if (
    possibleDecimals.includes(leftParam) &&
    possibleDecimals.includes(rightParam)
  ) {
    let result = parseInt(calc(leftParam, operator, rightParam));
    return String(result);
  } else if (
    possibleRomeNumbers.includes(leftParam.toUpperCase()) &&
    possibleRomeNumbers.includes(rightParam.toUpperCase())
  ) {
    let leftDecimal = to_arab(leftParam);
    let rightDecimal = to_arab(rightParam);

    let decimalResult = parseInt(calc(leftDecimal, operator, rightDecimal));
    if (decimalResult < 1) {
      return '';
    } else {
      let result = to_roman(decimalResult);
      return result;
    }
  } else {
    throw 'Один из операндов не допустим';
  }
}

// console.log(calculator('10 - 1'));
// console.log(calculator('5 - 4'));
// console.log(calculator('4 - 4'));

// console.log(calculator('10 / 1'));
// console.log(calculator('6 / 2'));
// console.log(calculator('5 / 4'));

module.exports = calculator;
