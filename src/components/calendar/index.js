import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDaysInMonth, startOfMonth, format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import cx from 'classnames'
import range from '../../utils/range'
import { withFirebase } from '../firebase/context'
import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function Calendar({ firebase }) {
  const [releases, setReleases] = useState([])

  const { type, month, year } = useParams()

  useEffect(() => {
    firebase.releases(type, year, month).on('value', snapshot => {
      const releases = snapshot.val()
      if (releases !== null) setReleases(Object.values(snapshot.val()))
      else setReleases([])
    })
  }, [type, month, year, firebase])

  const date = new Date(`${year}-${+month + 1}-1`)

  const daysQty = getDaysInMonth(date)
  const daysArray = range(1, daysQty)
  const firstDay = format(startOfMonth(date), 'EEEEEE', { locale: ruLocale })
  const firstDayIndex = daysOfWeek.findIndex(i => i === firstDay)

  function chunkify(array, chunkSize) {
    const chunks = Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, i) => {
        const start = chunkSize * i

        const chunk = array.slice(start, start + chunkSize)

        if (chunk.length < chunkSize)
          return [...chunk, ...Array.from({ length: chunkSize - chunk.length })]

        return array.slice(start, start + chunkSize)
      },
    )

    return chunks
  }

  const weeks = chunkify(
    firstDayIndex === 0
      ? daysArray
      : [...Array.from({ length: firstDayIndex }), ...daysArray],
    7,
  )

  return (
    <main>
      <table className={styles.table}>
        <thead>
          <tr>
            {daysOfWeek.map(dayOfWeek => (
              <th className={styles['day-of-week']} key={dayOfWeek}>
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
                  release => release.release_day === day,
                )

                console.log(dayReleases)

                return (
                  <td
                    style={{
                      width:
                        dayReleases.length > 0
                          ? dayReleases
                              .map(release => release.width)
                              .reduce((a, b) => a + b, 0)
                          : 'inherit',
                    }}
                    className={cx(styles['day-item'], {
                      [styles['is-not-within-range']]: day === undefined,
                    })}
                    key={`day_${index}`}
                  >
                    <div
                      className={cx(styles.date, {
                        [styles['has-release']]: dayReleases.length > 0,
                      })}
                    >
                      {day}
                    </div>
                    <div className={styles.releases}>
                      {dayReleases.map((release, index) => (
                        <div
                          key={`release_${index}`}
                          className="release"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
                            width: release.width,
                          }}
                        >
                          <div className="info">
                            <p>{release.name}</p>
                            <p className="extra">{release.info}</p>
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
    </main>
  )

  // return (
  //   <main>
  //     <div>
  //       {weeks.map((week, index) => (
  //         <Week key={`week_${index}`} week={week} releases={releases} />
  //       ))}
  //     </div>
  //   </main>
  // )
}

export default withFirebase(Calendar)
