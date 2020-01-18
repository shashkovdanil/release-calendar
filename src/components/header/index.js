import React from 'react'
import { Link } from 'gatsby'
import { styled } from 'linaria/react'
import cx from 'classnames'
import { months } from '../../utils/handle-url'

const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(40, 27, 36, 0.95);
  margin-bottom: 80px;
  padding: 8px 16px;
  width: 100%;
  left: 0;
  z-index: 10;

  .title {
    margin: 0 24px;
    font-weight: 700;
    font-size: 40px;
    line-height: 56px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #fff;

    .year {
      font-weight: normal;
      letter-spacing: normal;
    }
  }

  .date {
    display: flex;
    align-items: center;
  }

  .date-link {
    &.is-disable {
      pointer-events: none;
      opacity: 0;
    }
  }

  .link {
    position: relative;
    color: #fff;
    opacity: 0.7;
    font-size: 18px;
    line-height: 20px;
    text-decoration: none;
    text-transform: capitalize;
    transition: 0.2s ease;
    white-space: nowrap;

    &:hover {
      opacity: 1;
    }

    &.is-active {
      color: #a6b12e;
      opacity: 1;
    }
  }

  .type-link {
    margin-right: 24px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .title {
      font-size: 20px;
    }

    .date {
      width: 100%;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .date-link {
      font-size: 24px;
      padding: 10px;

      span {
        display: none;
      }
    }
  }
`

function Header({ type, month, year }) {
  const currentMonth = months.find(m => m.jsNumber === month)?.rus

  const nextMonth =
    month === 11 ? 'январь' : months.find(m => m.jsNumber === month + 1)?.rus
  const nextYear = nextMonth === 'январь' ? year + 1 : year

  const prevMonth =
    month === 0 ? 'декабрь' : months.find(m => m.jsNumber === month - 1)?.rus
  const prevYear = prevMonth === 'декабрь' ? year - 1 : year

  return (
    <StyledHeader className="header">
      <div className="date">
        <Link
          className={cx('link date-link prev', {
            'is-disable': prevYear < 2020,
          })}
          to={`/${type}/${
            months.find(m => m.rus === prevMonth)?.eng
          }-${prevYear}`}
        >
          ← <span>{prevMonth}</span>
        </Link>
        <h1 className="title">
          {currentMonth} <span className="year">{year}</span>
        </h1>
        <Link
          className="link date-link next"
          to={`/${type}/${
            months.find(m => m.rus === nextMonth)?.eng
          }-${nextYear}`}
        >
          <span>{nextMonth}</span> →
        </Link>
      </div>
      <div>
        <Link
          className={cx('link type-link', { 'is-active': type === 'films' })}
          to={`/films/${months.find(m => m.jsNumber === month)?.eng}-${year}`}
        >
          Фильмы
        </Link>
        <Link
          className={cx('link type-link', { 'is-active': type === 'games' })}
          to={`/games/${months.find(m => m.jsNumber === month)?.eng}-${year}`}
        >
          Игры
        </Link>
      </div>
    </StyledHeader>
  )
}

export default Header
