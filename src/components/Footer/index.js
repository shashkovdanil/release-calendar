import React from 'react'
import styles from './styles.module.css'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.Footer}>
      <p className={styles.Copyright}>© {year},&nbsp;</p>
      <a
        href="https://tglink.ru/deaddinos"
        target="_blank"
        rel="noopener noreferrer"
      >
        Библиотека вымерших динозавров
      </a>
    </footer>
  )
}

export default Footer
