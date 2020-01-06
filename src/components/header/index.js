import React from 'react'
import { useParams, Link } from 'react-router-dom'
import getMonthName from '../../utils/get-month-name'
import styles from './styles.module.css'

function Header() {
  const { type, month, year } = useParams()
  const monthName = getMonthName(+month)

  const nextMonth = +month === 11 ? 0 : +month + 1
  const nextYear = +nextMonth === 0 ? +year + 1 : year

  const prevMonth = +month === 0 ? 11 : +month - 1
  const prevYear = +prevMonth === 11 ? +year - 1 : year

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>
          {monthName} <span className={styles.year}>{year}</span>
        </h1>
        <p className={styles['releases-type']}>
          Новые {type === 'games' ? 'игры' : 'фильмы'}
        </p>
      </div>
      <Link
        to={{
          pathname: `/${type}/${prevYear}/${prevMonth}`,
        }}
      >
        Prev
      </Link>
      <Link
        to={{
          pathname: `/${type}/${nextYear}/${nextMonth}`,
        }}
      >
        Next
      </Link>
      <Link to={location => `${location.pathname.replace('films', 'games')}`}>
        Games
      </Link>
      <Link to={location => `${location.pathname.replace('games', 'films')}`}>
        Films
      </Link>
    </header>
  )
}

export default Header
