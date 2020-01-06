import React from 'react'

function Day({ release }) {
  return (
    <div
      className="release"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
      }}
    >
      <div className="info">
        <p>{release.name}</p>
        <p className="extra">{release.info}</p>
      </div>
    </div>
  )
}

export default Day
