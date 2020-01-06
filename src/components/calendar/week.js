import React from 'react'
import Day from './day'

function Week({ week, releases }) {
  return (
    <div className="week">
      {week.map(day => {
        const dayReleases = releases.filter(
          release => release.release_day === day,
        )

        return (
          <div
            className="day"
            style={{
              minWidth: dayReleases.length > 0 ? dayReleases.length * 160 : 46,
              flex:
                dayReleases.length > 0
                  ? dayReleases
                      .map(release => release.flex)
                      .reduce((a, b) => a + b, 0)
                  : 1,
            }}
          >
            <span className="day-num">{day}</span>
            {dayReleases.map((release, index) => (
              <Day key={`day_${index}`} release={release} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Week
