import React from 'react'
import Header from '../header'
import Calendar from '../calendar'
import Footer from '../footer'

import './global.css'

function Layout(props) {
  return (
    <>
      <Header {...props} />
      <Calendar {...props} />
      <Footer />
    </>
  )
}

export default Layout
