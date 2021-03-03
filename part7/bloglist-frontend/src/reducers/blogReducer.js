import blogService from '../services/blogs'
import { notificationChange } from './notificationReducer'
import { useDispatch as dispatch } from 'react-redux'

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT',
      data:blogs
    })
  }
}

export const updateBlog = (id, data) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, data)
    dispatch({
      type:'UPDATE',
      data:newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type:'REMOVE',
      data:blog.id
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log(newBlog);
    dispatch(notificationChange(`Added ${newBlog.title} by ${newBlog.author}`,5))
    dispatch({
      type:'ADDNEW',
      data:newBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.data
    case 'UPDATE':
      const id = action.data.id
      const changedBlog = action.data
      return state.map(n =>
        n.id !== id ? n : changedBlog)
    case 'REMOVE':
      return state.filter(n => n.id !== action.data)
    case 'ADDNEW':
      return [...state, action.data]
    default:
      return state
  }
}

export default blogReducer