export const secondsToTime = (total) => {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = Math.round(total % 60);

  const data = hours ? [hours, minutes, seconds] : [minutes, seconds];

  return data.map((v) => `0${v}`.slice(-2)).join(':');
};
