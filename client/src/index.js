import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import ReactDOM from 'react-dom'
import store from 'store'
import 'style/index.css'
import App from 'containers/App'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
