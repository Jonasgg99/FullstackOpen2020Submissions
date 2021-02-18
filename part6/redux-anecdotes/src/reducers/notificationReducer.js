
export const notificationChange = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, duration*1000 )
  }
}

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      
      return action.message
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer