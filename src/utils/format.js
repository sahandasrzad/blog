// dateUtils.js
export const formatToLocaleDate = (date) => {
  const dateParam = new Date(date);

  if (isNaN(dateParam.getTime())) {
      return null; 
  }
  return dateParam.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
  });
};

// Example usage
// const myDate = new Date();
// console.log(formatToLocaleDate(myDate)); // Output will be in the Persian locale
