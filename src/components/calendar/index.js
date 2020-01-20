import React, { useState, useRef } from 'react'
import { getDaysInMonth, startOfMonth, format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import cx from 'classnames'
import Dotdotdot from 'react-dotdotdot'
import MobileVersion from './mobile-version'
import { useFirebase, useWindowSize } from '../../hooks'
import { chunkify, range } from '../../lib'
import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function Calendar({ type, year, month }) {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [cover, setCover] = useState('')

  const tableRef = useRef()

  const { width } = useWindowSize()

  useFirebase(
    firebase => {
      firebase
        .database()
        .ref(`/${type}/${year}/${month}`)
        .once('value')
        .then(snapshot => {
          const releases = snapshot.val()

          if (!releases) {
            setLoading(false)
            setReleases([])
            setCover('')
            return
          }

          const releasesToArray = () =>
            Object.entries(releases)
              .map(([key, value]) => ({
                ...value,
                id: key,
              }))
              .filter(r => r.id !== 'main')
          setLoading(false)
          setCover(releases.main)
          setReleases(releasesToArray())
        })
    },
    [type, year, month],
  )

  const date = new Date(`${year}-${+month + 1}-1`)
  const daysQty = getDaysInMonth(date)
  const daysArray = range(1, daysQty)
  const firstDay = format(startOfMonth(date), 'EEEEEE', { locale: ruLocale })
  const firstDayIndex = daysOfWeek.findIndex(i => i === firstDay)

  const weeks = chunkify(
    firstDayIndex === 0
      ? daysArray
      : [...Array.from({ length: firstDayIndex }), ...daysArray],
    7,
  )

  return (
    <main>
      <div className={styles.Cover}>
        <div className={styles.Gradient}>
          <img src={cover} alt="" />
        </div>
      </div>
      {!loading && releases.length === 0 ? (
        <div>не заполнено</div>
      ) : (
        <>
          <table ref={tableRef} className={styles.DesktopCalendar}>
            <thead>
              <tr>
                {daysOfWeek.map(dayOfWeek => (
                  <th className={styles.DayOfWeek} key={dayOfWeek}>
                    {dayOfWeek}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) => (
                <tr key={`week_${index}`}>
                  {week.map((day, index) => {
                    const dayReleases = releases.filter(
                      release => +release.release_day === day,
                    )

                    function getTableItemWidth() {
                      if (dayReleases.length > 0) {
                        const pxWidth = dayReleases
                          .map(release => +release.width)
                          .reduce((acc, curr) => acc + curr, 0)

                        const percentageWidth = `${(pxWidth / width) * 100}%`

                        return percentageWidth
                      }

                      return 'inherit'
                    }

                    const tdWidth = getTableItemWidth()

                    return (
                      <td
                        style={{
                          width: tdWidth,
                        }}
                        className={cx(styles.DayItem, {
                          [styles.isNotWithinRange]: day === undefined,
                          [styles.someReleases]: dayReleases.length > 1,
                        })}
                        key={`day_${index}`}
                      >
                        <div
                          className={cx(styles.Date, {
                            [styles.hasRelease]: dayReleases.length > 0,
                          })}
                        >
                          {day}
                        </div>
                        <div className={styles.Releases}>
                          {dayReleases.map((release, index) => (
                            <div
                              key={`release_${index}`}
                              className={styles.Release}
                              style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
                              }}
                            >
                              <div className={styles.Info}>
                                <Dotdotdot clamp={1}>
                                  <p>{release.name}</p>
                                </Dotdotdot>
                                <Dotdotdot clamp={1}>
                                  <p className={styles.Extra}>{release.info}</p>
                                </Dotdotdot>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <MobileVersion releases={releases} />
        </>
      )}
    </main>
  )
}

export default Calendar
