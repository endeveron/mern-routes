export const dateToString = (date, mode, divider) => {

  const getDateStr = () => {
    const day = date.getDate();
    const month = date.getMonth();
    const dayStr = ('0' + day).slice(-2);
    const monthStr = ('0' + (month + 1)).slice(-2);
    return dayStr + divider + monthStr;
  }

  const getTimeStr = () => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursStr = ('0' + hours).slice(-2);
    const minutesStr = ('0' + minutes).slice(-2);
    return hoursStr + divider + minutesStr;
  }

  const getDayStr = () => {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
  }

  switch (mode) {
    case 'date': return getDateStr();
    case 'time': return getTimeStr();
    case 'day': return getDayStr();
    default: throw new Error('invalid mode');
  }
};

export const dateToKeyValuePair = (inputName, date) => ({
  target: {
    name: inputName,
    value: date._d
  }
});