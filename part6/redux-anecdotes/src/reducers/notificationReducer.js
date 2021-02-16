export const notificationChange = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
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