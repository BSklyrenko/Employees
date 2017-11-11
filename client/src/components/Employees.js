import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import uuid from 'uuid/v1'

class Employees extends Component {
  constructor() {
    super()
    this.state = { edit: [] }
    this.renderEmployee = this.renderEmployee.bind(this)
    this.makeEditable = this.makeEditable.bind(this)
    this.save = this.save.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.getEmployees())
    dispatch(actions.getDepartments())
  }

  makeEditable(id) {
    const { edit } = this.state
    this.setState({ edit: edit.slice().concat([id]) })
  }

  addEmployee() {
    const { dispatch } = this.props
    dispatch(actions.addEmployee(this.firstName.value, this.lastName.value, this.departmentId.value))
    this.firstName.value = ''
    this.lastName.value = ''
    this.departmentId.value = ''
  }

  save(id) {
    const { dispatch } = this.props
    const edit = this.state.edit.splice()
    dispatch(actions.updateEmployee(this[`firstName${id}`].value, this[`lastName${id}`].value, this[`departmentId${id}`].value, id))
    edit.splice(edit.indexOf(id), 1)
    this.setState({ edit })
  }

  renderEmployee(employee) {
    const { departments, departmentsHash } = this.props
    const { edit } = this.state
    const {
      firstName, lastName, departmentId, id
    } = employee
    const inEdit = edit.includes(id)
    const department = departmentsHash[departmentId] && departmentsHash[departmentId].name
    return (
      <tr key={uuid()} style={{ padding: '5px', border: '1px solid #EEE' }}>
        <td>{inEdit ? <input defaultValue={firstName} ref={node => { this[`firstName${id}`] = node }} /> : firstName}</td>
        <td>{inEdit ? <input defaultValue={lastName} ref={node => { this[`lastName${id}`] = node }} /> : lastName}</td>
        <td>{inEdit ? (
          <select defaultValue={departmentId} ref={node => { this[`departmentId${id}`] = node }}>
            {departments.map(item => <option key={uuid()} value={item.id}>{item.name}</option>)}
          </select>
        ) : department}
        </td>
        <td>{inEdit ? <button onClick={_ => { this.save(id) }}>Save</button> : <button onClick={_ => { this.makeEditable(id) }}>Edit</button>}</td>
      </tr>
    )
  }

  render() {
    const { employees, departments } = this.props
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td style={cellStyle}>First name</td>
              <td style={cellStyle}>Last name</td>
              <td style={cellStyle}>Department</td>
            </tr>
          </thead>
          <tbody>
            {employees.map(this.renderEmployee)}
            <tr>
              <td><input ref={node => { this.firstName = node }} /></td>
              <td><input ref={node => { this.lastName = node }} /></td>
              <td>
                <select ref={node => { this.departmentId = node }}>
                  {departments.map(item => <option key={uuid()} value={item.id}>{item.name}</option>)}
                </select>
              </td>
              <td><button onClick={this.addEmployee}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { employees, departments } = state
  const departmentsHash = {}
  departments.forEach(item => {
    departmentsHash[item.id] = item
  })
  return {
    employees,
    departmentsHash,
    departments
  }
}

export default connect(mapStateToProps)(Employees)

const cellStyle = {
  paddingRight: '10px'
}
