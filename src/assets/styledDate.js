const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const getDay = (date) => {
  var dateObj = new Date(date);
  return dateObj.getUTCDate();
};
export const styledDate = (date) => {
  var dateObj = new Date(date);
  var month = dateObj.getUTCMonth(); //months from 0-11

  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear() % 100;
  var newstyledDate = day + " " + monthNames[month] + ", " + year;
  return newstyledDate;
};

export const getMonth = (date) => {
  var dateObj = new Date(date);
  var month = dateObj.getUTCMonth(); //months from 0-11
  return monthNames[month];
};
export const getYear = (date) => {
  var dateObj = new Date(date);
  return dateObj.getUTCFullYear();
};
