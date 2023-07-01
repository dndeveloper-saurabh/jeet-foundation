export const getClassName = (grade) => {
  const splitted = grade.split("_");

  return (
    splitted[0].charAt(0).toUpperCase() +
    splitted[0].slice(1) +
    " " +
    splitted[1]
  );
};

const colors = [
  '#F0F8FF',
  '#FAEBD7',
  '#00FFFF',
  '#7FFFD4',
  '#F5F5DC',
  '#5F9EA0',
  '#DC143C',
  '#9ACD32',
  '#228B22',
  '#4682B4',
  '#6495ED',
  '#4169E1',
  '#7B68EE',
  '#FFFACD',
  '#DA70D6',
  '#F4A460',
  '#B0C4DE',
  '#808080'
];

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomAvatar = (name) => {
  return (
    <div
      className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" style={{background: colors[randomIntFromInterval(0, 18)]}}>
      <span className="font-medium dark:text-gray-300 uppercase">{name[0]}</span>
    </div>
  )
}

export function humanizeTime(seconds) {
  let obj = {
    h: 0,
    m: 0,
    s: 0
  }
  let minutesDec = seconds / 60;
  let hoursDec = minutesDec / 60;

  // Check if it has minutes
  if(minutesDec < 1) {
    obj.s = seconds;
  } else {
    obj.s = seconds % 60;
  }

  // Check if it has hours
  if(hoursDec < 1) {
    obj.m = Math.floor(seconds / 60);
  } else {
    obj.h = Math.floor(seconds / 3600);
    let leftSeconds = seconds % 3600;
    let leftMinutes = leftSeconds / 60;
    if(leftMinutes < 1) {
      obj.m = 0;
      obj.s = seconds % 60;
    } else {
      obj.m = Math.floor(leftMinutes);
      obj.s = seconds % 60;
    }
  }
  console.log(formatHumanizeHas(obj));
  return formatHumanizeHas(obj);
}

function formatHumanizeHas(obj) {
  let str = ''
  if(obj.h > 0) {
    str += obj.h + 'h ';
  }
  if(obj.m > 0) {
    str += obj.m + 'm ';
  }
  if(obj.s > 0) {
    str += obj.s + 's ';
  }

  return str;
}