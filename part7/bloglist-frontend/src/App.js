import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Users from './components/Users'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer';
import { initUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      dispatch(initUser(JSON.parse(loggedUserJSON)))
    }
  }, [dispatch])

  const Notification = () => {
    const { message, type } = useSelector(state => state.notification)
    if (!message) return <br/>
    const notificationStyle = {
      color: type==='error'? 'red' : 'green',
      fontWeight: 'bold',
      fontSize: 20,
      backgroundColor: 'gainsboro',
      border: type==='error'? '3px solid red' : '3px solid green',
      borderRadius: '5px',
      padding: '15px'
    };
    return (
      <div className="error" style={notificationStyle}>
        { message }
      </div>
    );
  };

  blogs.sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
          <Notification />
        <form onSubmit={(event) => {
          event.preventDefault()
          dispatch(login({username, password}))
        }}>
          <div>
            username
            <input id="username" type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input id="password" type="text" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button id="loginButton" type="submit">Log in</button>
        </form>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <div>{user.username} is logged in<button onClick={() => {
          dispatch(logout())
        }
        }>log out</button></div>
        <Notification />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Togglable buttonLabel='New blog' >
              <BlogForm />
            </Togglable>
            <div id='bloglist'>{blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;