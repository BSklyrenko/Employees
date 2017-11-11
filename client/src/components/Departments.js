import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import uuid from 'uuid/v1'

class Departments extends Component {
  constructor() {
    super()
    this.state = { edit: [] }
    this.renderDepartment = this.renderDepartment.bind(this)
    this.makeEditable = this.makeEditable.bind(this)
    this.saveDepartment = this.saveDepartment.bind(this)
    this.addDepartment = this.addDepartment.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.getDepartments())
  }

  makeEditable(id) {
    const { edit } = this.state
    this.setState({ edit: edit.slice().concat([id]) })
  }

  saveDepartment(id) {
    const { dispatch } = this.props
    const edit = this.state.edit.splice()
    const name = this[id].value
    dispatch(actions.updateDepartment(name, id))
    edit.splice(edit.indexOf(id), 1)
    this.setState({ edit })
  }

  addDepartment() {
    const { dispatch } = this.props
    dispatch(actions.addDepartment(this.newDepartment.value))
    this.newDepartment.value = ''
  }

  renderDepartment(department) {
    const { edit } = this.state
    const { name, id } = department
    const inEdit = edit.includes(id)
    return (
      <div key={uuid()}>

        <span style={{ marginRight: '10px' }}>
          {
            inEdit ? (
              <input defaultValue={name} ref={node => { this[id] = node }} />
            ) : name
          }
        </span>
        {
          inEdit ? <button onClick={_ => { this.saveDepartment(id) }}>Save</button> :
          <button onClick={_ => { this.makeEditable(id) }}>Edit</button>
        }
      </div>
    )
  }

  render() {
    const { departments } = this.props
    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          {departments.map(this.renderDepartment)}
        </div>
        <input ref={node => { this.newDepartment = node }} />
        <button onClick={this.addDepartment}>Add</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { departments } = state

  return {
    departments
  }
}

export default connect(mapStateToProps)(Departments)
