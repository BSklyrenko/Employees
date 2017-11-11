export default function departments(state, action) {
  const currentState = state || []
  switch (action.type) {
    case 'GET_DEPARTMENTS_SUCCESS':
      return action.payload

    default:
      return currentState
  }
}
