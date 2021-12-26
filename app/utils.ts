export function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


export const Palette = {
  "ParadisePink": "#ef476f",
  "OrangeYellowCrayola": "#ffd166",
  "CaribbeanGreen": "#06d6a0",
  "BlueNCS": "#118ab2",
  "MidnightGreenEagleGreen": "#073b4c",
};
