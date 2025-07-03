import { useEffect, useRef, useState } from 'react';

export const useCountdown = (initialTime: { weeks?: number; days?: number; hours: number; minutes: number; seconds: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft((prev) => {
        const newTime = { ...prev };

        if (newTime.weeks === 0 && newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
          setIsFinished(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }

        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else {
          newTime.seconds = 59;
          if (newTime.minutes > 0) {
            newTime.minutes -= 1;
          } else {
            newTime.minutes = 59;
            if (newTime.hours > 0) {
              newTime.hours -= 1;
            } else if (newTime.days && newTime.days > 0) {
              newTime.days -= 1;
              newTime.hours = 23;
            } else if (newTime.weeks && newTime.weeks > 0) {
              newTime.weeks -= 1;
              newTime.days = 6;
              newTime.hours = 23;
            } else {
              newTime.seconds = 0;
              newTime.minutes = 0;
              newTime.hours = 0;
              newTime.days = 0;
              newTime.weeks = 0;
              setIsFinished(true);
              if (timerRef.current) clearInterval(timerRef.current);
            }
          }
        }

        return newTime;
      });
    };

    timerRef.current = setInterval(calculateTimeLeft, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  const formatTimeLeft = () => {
    if (isFinished) return 'Deal expired!';
    const parts = [];
    if (timeLeft.weeks) parts.push(`${timeLeft.weeks}w`);
    if (timeLeft.days) parts.push(`${timeLeft.days}d`);
    if (timeLeft.hours) parts.push(`${formatTime(timeLeft.hours)}h`);
    parts.push(`${formatTime(timeLeft.minutes)}m`);
    parts.push(`${formatTime(timeLeft.seconds)}s`);
    return parts.join(' ');
  };

  return { timeLeft, isFinished, formatTimeLeft };
};
