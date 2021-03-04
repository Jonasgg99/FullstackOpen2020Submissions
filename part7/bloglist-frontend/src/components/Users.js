import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.blogs.map(n => n.user.username))
  /*const test = useSelector(state => state.blogs.map(n => n.user))
  const bla = test.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
  const blad = [...bla.entries()]
  console.log([...bla.keys()]);*/

  const usersMap = users.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  const usersCount = [...usersMap.entries()]
  
  return (
    <div>
      <h1>
        Users
      </h1>
      <div>
        <h3>Blogs created</h3>
        <table><tbody>
        {usersCount.map(n => {
          return (
            <tr key={n[0]}>
              <td>
                <Link to={`/users/${n[0]}`}>{n[0]}</Link></td>
              <td>{n[1]}</td>
            </tr> 
          )
        })}
        </tbody></table>
      </div>
    </div>
  )
}

export default Users