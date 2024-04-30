import { useEffect, useState } from "react"

export const useTimer = () => {

    const [intervalId,setIntervalId] = useState('');
    const [timerDiff,setTimerDiff] = useState(0);

    useEffect(() => {
        return () => {
            clearTimer();
        }
    },[]);

    const setTimer = (time) => {

        let x = setInterval(() => {
            let currentDate = new Date();
            let diff = time - currentDate.getTime();
            if(diff <= 0) {
                clearInterval(x);
                setTimerDiff(0);
            } else {
                setTimerDiff(diff);
            }
        });
        setIntervalId(x);
    }

    const clearTimer = () => {
        clearInterval(intervalId);
        setTimerDiff(0);
    }

    return [timerDiff,setTimerDiff,setTimer,clearTimer,intervalId]
}