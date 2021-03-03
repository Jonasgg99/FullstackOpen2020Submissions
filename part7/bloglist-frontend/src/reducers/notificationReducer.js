
export const notificationChange = (message, duration, type) => {
  return async dispatch => {
    const notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, duration*1000 )
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {message, type, timeoutId: notificationTimeout}
    })
  }
}

const notificationReducer = (state = {message:null}, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) clearTimeout(state.timeoutId)
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return {message:null}
    default:
      return state
  }
}

export default notificationReducer