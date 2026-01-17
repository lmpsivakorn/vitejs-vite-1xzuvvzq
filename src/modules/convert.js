const toLocaleString = (date = null) => {
  if (! date) return '-';

  if (date && date.seconds) {
    return new Date(date.seconds * 1000).toLocaleString();
  }
  if (date && date.getTime) {
    return date.toLocaleString();
  }

  return '-';
};

const toNumberComma = (input = null) => {
  if (! input) {
    return '-';
  }

  if (typeof input == 'string') {
    input = parseInt(input.replace(/,/g, ''));
  }
  
  return input.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const toNumberCommaDecimal = (input) => {
  if (! input) {
    return '-';
  }

  if (typeof input == 'string') {
    input = parseInt(input.replace(/,/g, ''));
  }

  return input.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const toYYYYMMDD = (date = null) => {
  if (! date) {
    date = new Date();
  } else {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const toYYYYMMDDHHMMSS = (date = null) => {
  if (! date) {
    date = new Date();
  } else {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const convertModule = {
  toLocaleString,
  toNumberComma,
  toNumberCommaDecimal,
  toYYYYMMDD,
  toYYYYMMDDHHMMSS,
};

export default convertModule;
