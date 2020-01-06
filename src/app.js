import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './pages/home'
import fixUrl from './utils/fix-url'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact children={<Redirect to={fixUrl('', '', '')} />} />
        <Route
          path="/:type/:year/:month"
          children={props => <Home {...props} />}
        />
      </Switch>
    </Router>
  )
}

export default App
