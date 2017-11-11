export default function employees(state, action) {
  const currentState = state || []
  switch (action.type) {
    case 'GET_EMPLOYEES_SUCCESS':
      return action.payload

    default:
      return currentState
  }
}
