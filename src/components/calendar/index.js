import React, { useState } from 'react'
import { useFirebase } from 'gatsby-plugin-firebase'
import { styled } from 'linaria/react'
import { getDaysInMonth, startOfMonth, format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import cx from 'classnames'
import { range } from '../../utils/range'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

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

const StyledCalendar = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 16px;
  position: relative;
  margin-top: 200px;

  &::before {
    background-image: linear-gradient(
        180deg,
        rgba(40, 27, 36, 0) 0%,
        #281b24 100%
      ),
      ${props => props.cover};
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    content: '';
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    will-change: transform;
    z-index: -1;
  }

  .day-of-week {
    font-weight: normal;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 14px;
    line-height: 16px;
  }

  .day-item {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    min-width: 46px;
    height: 160px;
    overflow: hidden;
  }

  .date {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    user-select: none;
    cursor: default;
    z-index: 2;
  }

  .date.has-release {
    background-color: #dc6175;
  }

  .is-not-within-range {
    opacity: 0.25;
  }

  .releases {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .release {
    position: relative;
    background-position: center;
  }
`

function Calendar({ type, year, month }) {
  const [releases, setReleases] = useState([])
  const [cover, setCover] = useState('')

  useFirebase(firebase => {
    firebase
      .database()
      .ref(`/${type}/${year}/${month}`)
      .once('value')
      .then(snapshot => {
        console.log(123)
        const releases = snapshot.val()

        if (!releases) {
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

        setCover(releases.main)

        setReleases(releasesToArray())
      })
  }, [type, year, month])

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
      <StyledCalendar cover={`url(${cover})`}>
        <thead>
          <tr>
            {daysOfWeek.map(dayOfWeek => (
              <th className="day-of-week" key={dayOfWeek}>
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

                return (
                  <td
                    style={{
                      width:
                        dayReleases.length > 0
                          ? dayReleases
                              .map(release => +release.width)
                              .reduce((acc, curr) => acc + curr, 0) + 'px'
                          : 'inherit',
                    }}
                    className={cx('day-item', {
                      'is-not-within-range': day === undefined,
                    })}
                    key={`day_${index}`}
                  >
                    <div
                      className={cx('date', {
                        'has-release': dayReleases.length > 0,
                      })}
                    >
                      {day}
                    </div>
                    <div className="releases">
                      {dayReleases.map((release, index) => (
                        <div
                          key={`release_${index}`}
                          className="release"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
                            width: release.width + 'px',
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
      </StyledCalendar>
    </main>
  )
}

export default Calendar
