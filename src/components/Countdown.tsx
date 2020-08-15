import React, { useState, useEffect } from 'react';

interface Props extends React.Props<never> {
  to: Date
  component: React.ComponentType
}

function secondsRemaining(to: Date): number {
  return Math.floor((to.getTime() - Date.now()) / 1000);
}

export default function Countdown({
  to,
  component: Component,
}: Props) {
  const [seconds, setSeconds] = useState(() => secondsRemaining(to));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(secondsRemaining(to))
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [to]);

  return (
    <Component>
      {seconds}
    </Component>
  );
}
