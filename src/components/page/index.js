import React from 'react'
import Head from 'next/head'

function Page({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie-edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
        <meta name="keywords" content="" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  )
}

export default Page
