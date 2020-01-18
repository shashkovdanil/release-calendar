import React from 'react'
import Header from '../Header'
import Calendar from '../Calendar'
import Footer from '../Footer'

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
