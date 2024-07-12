export function formatDataMoney(number: string | undefined) {
    if (number === undefined) return;
    const parseNumber = parseInt(number);
  
    if (parseNumber >= 1000 && parseNumber < 10000) {
      return number.substring(0, 1) + "," + number.substring(1);
    } else if (parseNumber >= 10000) {
      return number.substring(0, 2) + "," + number.substring(2);
    } else {
      return number;
    }
  }