import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { months } from '../../constants/months'
import styles from './styles.module.css'

function generateHref(type, month, year) {
  return `/${type}/${month.eng}-${year}`
}

function Header({ type, month, year }) {
  const currentMonth = month.rus

  const findMonth = conditionFunc => months.find(conditionFunc)

  const nextMonth =
    month.jsNumber === 11
      ? 'январь'
      : findMonth(m => m.jsNumber === month.jsNumber + 1).rus
  const nextYear = nextMonth === 'январь' ? year + 1 : year

  const prevMonth =
    month.jsNumber === 0
      ? 'декабрь'
      : findMonth(m => m.jsNumber === month.jsNumber - 1).rus
  const prevYear = prevMonth === 'декабрь' ? year - 1 : year

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <img src="/images/logo.png" alt="" />
      </div>
      <div className={styles.Date}>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            type,
            findMonth(m => m.rus === prevMonth),
            prevYear,
          )}
        >
          <a
            className={cx(styles.Link, styles.isDate, {
              [styles.isDisable]: prevYear < 2020,
            })}
          >
            ← <span>{prevMonth}</span>
          </a>
        </Link>
        <h1>
          {currentMonth} <span className={styles.Year}>{year}</span>
        </h1>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            type,
            findMonth(m => m.rus === nextMonth),
            nextYear,
          )}
        >
          <a
            className={cx(styles.Link, styles.isDate, {
              [styles.isDisable]: prevYear > 2030,
            })}
          >
            <span>{nextMonth}</span> →
          </a>
        </Link>
      </div>
      <div>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            'films',
            findMonth(m => m.jsNumber === month.jsNumber),
            year,
          )}
        >
          <a
            className={cx(styles.Link, styles.isType, {
              [styles.isActive]: type === 'films',
            })}
          >
            Фильмы
          </a>
        </Link>
        <span className={styles.TypeSeparator}>|</span>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            'games',
            findMonth(m => m.jsNumber === month.jsNumber),
            year,
          )}
        >
          <a
            className={cx(styles.Link, styles.isType, {
              [styles.isActive]: type === 'games',
            })}
          >
            Игры
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
