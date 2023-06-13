import React from 'react';
import styles from '../styles/Home4.module.css';

function SocialMediaFooter() {
  return (
    <div className={styles.signUpSocialMedia}>
          <div className={styles.signUpSocialComponent} onClick={() => window.open('https://www.facebook.com/microbusnitkkr/', '_blank')} >
            <div className={styles.signUpSocialIcon+' '+styles.signUpSocialFb}>
            </div>
            <h2>microbusnitkkr</h2>
          </div>
          <div className={styles.signUpSocialComponent} onClick={() => window.open('https://www.instagram.com/microbus_nitkkr/?hl=en', '_blank')}  >
            <div className={styles.signUpSocialIcon+' '+styles.signUpSocialInsta}>
            </div>
            <h2>microbus_nitkkr</h2>
          </div>
      </div>
  )
}

export default SocialMediaFooter