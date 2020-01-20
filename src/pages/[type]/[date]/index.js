import React from 'react'
import Head from 'next/head'
import { Header, Calendar, Footer } from '../../../components'
import { checkAndCorrectURL, redirect, parseCorrectURL } from '../../../lib'

function MainPage({ parsedURL }) {
  const { year, month, type } = parsedURL

  return (
    <>
      <Head>
        <title>
          Релизы {type === 'games' ? 'игр' : 'фильмов'} | {month.rus} {year}
        </title>
      </Head>
      <Header type={type} month={month} year={year} />
      <Calendar type={type} month={month.jsNumber} year={year} />
      <Footer />
    </>
  )
}

MainPage.getInitialProps = ctx => {
  const { url, isCorrect } = checkAndCorrectURL(ctx.asPath)

  if (!isCorrect) redirect(ctx, url)

  return { parsedURL: parseCorrectURL(url) }
}

export default MainPage
