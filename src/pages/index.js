import React from 'react'
import { Redirect } from '@reach/router'

function Index() {
  return <Redirect noThrow to="/films" />
}

export default Index
