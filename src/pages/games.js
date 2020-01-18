import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import useCorrectURL from '../hooks/use-correct-url'

function Games({ location }) {
  const parsedUrl = useCorrectURL(location)

  return (
    <>
      <Helmet>
        <title>
          {`Релизы игр | ${parsedUrl.rusMonth} ${parsedUrl.year}`}
        </title>
      </Helmet>
      <Layout {...parsedUrl} />
    </>
  )
}

export default Games
