import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import asyncActions from 'constants/asyncActions'
import config from 'config'

function* getDepartments(action) {
  const request = _ => fetch(`${config.apiHost}/departments`).then(res => res.json())
  const result = yield call(request)
  yield put({ type : asyncActions.GET_DEPARTMENTS_SUCCESS, payload : result })
}

function* getEmployees(action) {
  const request = _ => fetch(`${config.apiHost}/employees`).then(res => res.json())
  const result = yield call(request)
  yield put({ type : asyncActions.GET_EMPLOYEES_SUCCESS, payload : result })
}

function* updateDepartment(action) {
  const { name, id } = action.payload
  const request = _ => fetch(`${config.apiHost}/departments/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ name })
  }).then(res => res.json())
  yield call(request)
  yield call(request)
  yield put({ type : asyncActions.GET_DEPARTMENTS_REQUEST })
}

function* addDepartment(action) {
  const { name } = action.payload
  const request = _ => fetch(`${config.apiHost}/departments`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name })
  }).then(res => res.json())
  yield call(request)
  yield put({ type : asyncActions.GET_DEPARTMENTS_REQUEST })
}

function* updateEmployee(action) {
  const {
    firstName, lastName, departmentId, id
  } = action.payload
  const request = _ => fetch(`${config.apiHost}/employees/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ firstName, lastName, departmentId })
  }).then(res => res.json())
  yield call(request)
  yield call(request)
  yield put({ type : asyncActions.GET_EMPLOYEES_REQUEST })
}

function* addEmployee(action) {
  const { firstName, lastName, departmentId } = action.payload
  const request = _ => fetch(`${config.apiHost}/employees`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, departmentId })
  }).then(res => res.json())
  yield call(request)
  yield put({ type : asyncActions.GET_EMPLOYEES_REQUEST })
}

export default function* root() {
  yield [
    takeLatest(asyncActions.GET_DEPARTMENTS_REQUEST, getDepartments),
    takeLatest(asyncActions.UPDATE_DEPARTMENTS_REQUEST, updateDepartment),
    takeLatest(asyncActions.ADD_DEPARTMENTS_REQUEST, addDepartment),
    takeLatest(asyncActions.GET_EMPLOYEES_REQUEST, getEmployees),
    takeLatest(asyncActions.UPDATE_EMPLOYEES_REQUEST, updateEmployee),
    takeLatest(asyncActions.ADD_EMPLOYEES_REQUEST, addEmployee)
  ]
}
