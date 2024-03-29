
import React, {useState, useEffect, useRef}  from 'react';

export default function Timer ({minutes = 0, seconds = 0, finished}) {
    const [timer, setTimer] = useState("");
    const [count, setCount] = useState(0);
    const totalSeconds = (minutes * 60) + seconds;
    const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
    const prevTime = useRef(totalSeconds);
    

    const getSeconds = (secondsLeft) => {
        if(secondsLeft === 0)
        {
            return ":00";
        } else if( secondsLeft < 10){
            return ":0"+secondsLeft;
        }
        return ":"+secondsLeft;
    }
    const updateTimer = () => {
        const secondsLeft = timeRemaining % 60;
        // console.log("seconds left "+ secondsLeft)
        const hasMinutes = totalSeconds >= 60 ;
        // console.log("has minutes "+ hasMinutes)
        const actualMinute = hasMinutes ? ((timeRemaining - secondsLeft) / 60).toFixed(0) : 0;
        // console.log("actual minute "+ actualMinute)
        const actualSeconds = getSeconds(secondsLeft);
        // console.log("actual seconds "+ actualSeconds)
        setTimer(actualMinute+actualSeconds);
    };

    const countDown = (remainingTime) => {
        setTimeRemaining(remainingTime - 1);
        setCount(count + 1);
    }

    useEffect(() => {
        if(timer === ""){
            updateTimer();
            setTimeout(() => countDown(totalSeconds),1000);
        }else if( timeRemaining != prevTime.current && timeRemaining >= 0 ){
            updateTimer();
            setTimeout(() => countDown(timeRemaining),1000);
           
        }else{
            // console.log("count:"+ count);
            // console.log("total seconds:"+ totalSeconds);
            // console.log("time remaining:"+ timeRemaining);
            // console.log(timeRemaining == (totalSeconds - count));
            // console.log('foo');
        }
        prevTime.current = timeRemaining

    },[timer, timeRemaining, count])
    

 return (
    <h2>
        {timer}
    </h2>
 );
}; 