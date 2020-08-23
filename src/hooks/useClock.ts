import React,{useEffect, useState} from 'react'

function secondsElapsed(from: Date): number {
    return Math.abs(Math.floor((from.getTime() - Date.now()) / 1000));
}

export default function useClock(from: Date, intervalTime: number=500): number {
      
  const [seconds, setSeconds] = useState(() => secondsElapsed(from));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(secondsElapsed(from))
    }, intervalTime);

    return () => {
      setSeconds(0)  
      clearInterval(interval)
    }
  }, [from,intervalTime]);

  return seconds

}