export const styledDate = (date) => {
  var dateObj = new Date(date);
  var month = dateObj.getUTCMonth(); //months from 0-11
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
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear() % 100;
  var newstyledDate = day + " " + monthNames[month] + ", " + year;
  return newstyledDate;
};
