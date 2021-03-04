import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const userCount = blogs.map(n => n.user.id).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); 

  const userOf = (userid) => {
    const userBlog = blogs.find(n => n.user.id === userid)
    if (!userBlog) return null
    return userBlog.user.name
  }
  
  const userids = [...userCount.keys()]
  return (
    <div>
      <h1>
        Users
      </h1>
      <div>
        <h3>Blogs created</h3>
        <table><tbody>
        {userids.map(id => {
          return (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{userOf(id)}</Link></td>
              <td>{userCount.get(id)}</td>
            </tr> 
          )
        })}
        </tbody></table>
      </div>
    </div>
  )
}

export default Users