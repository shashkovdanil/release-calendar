import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import useCorrectURL from '../hooks/use-correct-url'

function Films({ location }) {
  const parsedUrl = useCorrectURL(location)

  return (
    <>
      <Helmet>
        <title>
          {`Релизы фильмов | ${parsedUrl.rusMonth} ${parsedUrl.year}`}
        </title>
      </Helmet>
      <Layout {...parsedUrl} />
    </>
  )
}

export default Films
