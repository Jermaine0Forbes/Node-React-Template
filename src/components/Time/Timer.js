
import React, {useState, useEffect}  from 'react';
import { usePrevious } from '../../hooks/state';

export default function Timer ({minutes = 0, seconds = 0, loaded = false, finished}) {
    const [timer, setTimer] = useState("");
    const [count, setCount] = useState(0);
    const totalSeconds = (minutes * 60) + seconds;
    const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
    const prevTime = usePrevious(timeRemaining);
    

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
        const hasMinutes = totalSeconds >= 60 ;
        const actualMinute = hasMinutes ? ((timeRemaining - secondsLeft) / 60).toFixed(0) : 0;
        const actualSeconds = getSeconds(secondsLeft);
        setTimer(actualMinute+actualSeconds);
    };

    const countDown = (remainingTime) => {
        setTimeRemaining(remainingTime - 1);
        setCount(count + 1);
    }

    useEffect(() => {
        if(timer === "" && loaded){
            updateTimer();
            setTimeout(() => countDown(totalSeconds),1000);
        }else if( timeRemaining != prevTime && timeRemaining >= 0  && loaded){
            updateTimer();
            setTimeout(() => countDown(timeRemaining),1000);
           
        }
        
        if(timeRemaining < 0){
            finished(true);
        }

    },[timer, timeRemaining, count, loaded])
    

 return (
    <h2>
        {timer}
    </h2>
 );
}; 