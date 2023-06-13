import React from 'react'
import { useState, useEffect } from 'react'

import styles from '../styles/Home4.module.css'

const Timer = () => {
    const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const eventDate = new Date(process.env.START_TIME).getTime();
    const intervalId = setInterval(() => {
      const currentDate = new Date().getTime();
      const remainingTime = eventDate - currentDate;
      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>

        <h1 className={styles.h1}>Coming Soon</h1>
            <div className={styles.countdown_container}>
                <div className={styles.countdown_ele}>
                    
                    <div><p className={styles.big_text} id="days">{days} :</p></div>
                    <span className={styles.labels}>Days</span>
                </div>
                <div className={styles.countdown_ele}>
                    <p className={styles.big_text} id="hours">{hours} :</p>
                    <span className={styles.labels}>hours</span>
                </div>
                <div className={styles.countdown_ele}>
                    <p className={styles.big_text} id="mins">{minutes} :</p>
                    <span className={styles.labels}>mins</span>
                </div>
                <div className={styles.countdown_ele}>
                    <p className={styles.big_text} id="seconds">{seconds}</p>
                    <span className={styles.labels}>seconds</span>
                </div>
            </div>
    </>
  )
}

export default Timer