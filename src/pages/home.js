import React from 'react'
import { Redirect } from 'react-router-dom'
import { Header, Calendar, Footer } from '../components'
import isValidUrl from '../utils/is-valid-url'
import fixUrl from '../utils/fix-url'

function Home({ location }) {
  const [type, year, month] = location.pathname.split('/').filter(Boolean)

  if (!isValidUrl(type, month, year))
    return <Redirect to={fixUrl(type, month, year)} />

  return (
    <div>
      <Header />
      <Calendar />
      <Footer />
    </div>
  )
}

export default Home
