import React from 'react';
import Timer from '../../components/CountDownTimer/CountDownTimer';
import styles from './choices.module.css';

const Choices = () =>{
    const timeToLive = () =>{
        let today = new Date();
        let endTime = new Date(2021, 10, 8, 10, 0, 0, 0);
        console.log('endTime', endTime);
        let diffInMilliSecs = Date.parse(endTime) - today.getTime();

        let days = Math.floor(diffInMilliSecs/(1000*60*60*24));
        let hours = Math.floor((diffInMilliSecs/(1000*60*60))%24);
        let minutes = Math.floor((diffInMilliSecs/(1000*60))%60);
        let seconds = Math.floor((diffInMilliSecs/(1000))%60);
        
        let timeToLive = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds:seconds
        }
        console.log(timeToLive);
        return timeToLive;
    }
    return(
       
            <div onClick={timeToLive} class={styles.timer}>
                    Stay Tuned Event Will Be&nbsp;
                    <Timer hoursMinSecs={timeToLive()}></Timer>
                </div>
        
    );
}

export default Choices;