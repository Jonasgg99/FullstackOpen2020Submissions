import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const User = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs.filter(n=> n.user.id===id))

  const userOf = (userid) => {
    const userBlog = blogs.find(n => n.user.id === userid)
    if (!userBlog) return null
    return userBlog.user.name
  }

  return (
    <div>
      <h2>{userOf(id)}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map(blog => {
          return (
            <li key={blog.id}>
              {blog.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default User
