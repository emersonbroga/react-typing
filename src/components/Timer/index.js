import React, { useState, useEffect } from 'react';

import { secondsToTime } from '../../helpers/datetime';

const Timer = ({ duration, isRunning, getValue = (v) => v }) => {
  const [startDate, setStartDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      setStartDate(new Date());
      interval = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
    } else {
      setStartDate(null);
      setCurrentDate(null);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!startDate || !currentDate) return;

    const currentTime = currentDate.getTime();
    const startTime = startDate.getTime();
    const time = Number.parseInt((currentTime - startTime) / 1000, 10);
    getValue(duration - time);
    setTime(time);
  }, [startDate, currentDate, duration, getValue]);

  if (!startDate || !currentDate) return <div className="timer">{secondsToTime(duration)}</div>;

  return <div className="timer">{secondsToTime(duration - time)}</div>;
};

export default Timer;
