import asyncActions from 'constants/asyncActions'

const getDepartments = _ => (
  { type: asyncActions.GET_DEPARTMENTS_REQUEST }
)

const getEmployees = _ => (
  { type: asyncActions.GET_EMPLOYEES_REQUEST }
)

const updateDepartment = (name, id) => (
  {
    type: asyncActions.UPDATE_DEPARTMENTS_REQUEST,
    payload: {
      name,
      id
    }
  }
)

const updateEmployee = (firstName, lastName, departmentId, id) => (
  {
    type: asyncActions.UPDATE_EMPLOYEES_REQUEST,
    payload: {
      firstName,
      lastName,
      departmentId,
      id
    }
  }
)

const addDepartment = name => (
  {
    type: asyncActions.ADD_DEPARTMENTS_REQUEST,
    payload: {
      name
    }
  }
)

const addEmployee = (firstName, lastName, departmentId) => (
  {
    type: asyncActions.ADD_EMPLOYEES_REQUEST,
    payload: {
      firstName,
      lastName,
      departmentId
    }
  }
)

export default {
  getDepartments,
  updateDepartment,
  addDepartment,
  getEmployees,
  updateEmployee,
  addEmployee
}
