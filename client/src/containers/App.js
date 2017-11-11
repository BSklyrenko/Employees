import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Departments, Employees } from 'components'
import actions from 'actions'
import 'style/layout.css'

class App extends Component {
  render() {
    return (
      <div className="layout">
        <nav className="layout__nav">
          <ul>
            <li className="layout__link"><NavLink to="/departments">Departments</NavLink></li>
            <li className="layout__link"><NavLink to="/employees">Employees</NavLink></li>
          </ul>
        </nav>
        <section className="layout__main">
          <Switch>
            <Route path="/departments" component={Departments} />
            <Route path="/employees" component={Employees} />
          </Switch>
        </section>
      </div>
    )
  }
}

export default withRouter(connect()(App))
