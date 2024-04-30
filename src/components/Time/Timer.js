
import React, {useState, useEffect}  from 'react';
import { usePrevious } from '../../hooks/state';
import { AccessTime } from '@mui/icons-material';
import Box from '@material-ui/core/Box';

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

    const runTimer = (time) => {
        updateTimer();
        setTimeout(() => countDown(time),1000);
    }

    useEffect(() => {
        if(timer === "" && loaded){
            runTimer(totalSeconds);
        }else if( timeRemaining != prevTime && timeRemaining >= 0  && loaded){
            runTimer(timeRemaining);
           
        }
        
        if(timeRemaining < 0){
            finished(true);
        }

    },[timer, timeRemaining, count, loaded])
    

 return (
    <Box sx={{display:'flex', alignItems: 'center', gridGap: '0.5em'}}>
        <AccessTime/>
        <h2>
            {timer.length === 0 ? "0:00" : timer}
        </h2>
    </Box>
 );
}; 