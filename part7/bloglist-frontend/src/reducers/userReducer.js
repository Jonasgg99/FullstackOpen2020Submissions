import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationChange } from './notificationReducer'

export const login = (user) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user)
      dispatch({
        type:'INITUSER',
        data: loggedUser
      })
    } catch {
      dispatch(notificationChange('Wrong username or password', 5, 'error'))
    }
  }
}

export const initUser = (user) => {
    return {
      type:'INITUSER',
      data: user
    }
}

export const logout = () => {
  return {
    type:'REMOVEUSER'
  }
}

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'INITUSER':
      blogService.setToken(action.data.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(action.data)
      );
      return action.data
    case 'REMOVEUSER':
      window.localStorage.clear()
      return null
    default:
      return state
  }
}

export default userReducer