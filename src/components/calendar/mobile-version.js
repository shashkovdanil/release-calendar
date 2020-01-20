import React from 'react'
import cx from 'classnames'
import styles from './styles.module.css'

function MobileVersion({ releases }) {
  return (
    <ul className={styles.MobileCalendar}>
      {releases
        .sort((a, b) => a.release_day - b.release_day)
        .map(r => (
          <li className={styles.DayItem} key={`day_${r.id}`}>
            <div className={cx(styles.Date, styles.hasRelease)}>
              {r.release_day}
            </div>
            <div className={styles.Releases}>
              <div
                className={styles.Release}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${r.cover})`,
                }}
              >
                <div className={styles.Info}>
                  <p>{r.name}</p>
                  <p className={styles.Extra}>{r.info}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default MobileVersion
