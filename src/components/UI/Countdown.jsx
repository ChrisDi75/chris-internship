import React, { useEffect, useState } from 'react'

function Countdown( { expiryDate }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        timeLeft();
    },[])

    function timeLeft() {
        const millisElapsed = expiryDate - Date.now();
        const secondsElapsed = millisElapsed/ 1000;
        const minutesElapsed = secondsElapsed / 60;
        const hoursElapsed = minutesElapsed / 60;
        requestAnimationFrame(timeLeft);


        if(millisElapsed <= 0) {
            setTime("Expired!")
            return;
        }

        setTime(
            `${Math.floor(hoursElapsed)}h ${Math.floor(minutesElapsed % 60)}m ${Math.floor(secondsElapsed % 60)}s`
        )
    }

    

  return (
    <div className='de_countdown'>
        {time}
    </div>
  )
}

export default Countdown
