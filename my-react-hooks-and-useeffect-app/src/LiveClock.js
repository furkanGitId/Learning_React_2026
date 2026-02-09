import React, { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h3>{time.toLocaleTimeString("en-IN", { hour12: true })}</h3>
    </div>
  );
}

export default LiveClock;
