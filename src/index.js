import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import Firebase, { FirebaseContext } from './components/firebase'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
