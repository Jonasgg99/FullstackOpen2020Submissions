import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer';
import { notificationChange } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [notification, setNotification] = useState(null);//

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin =  async(event) => {
    event.preventDefault();
    console.log('logging in');
    try {
      const user = await loginService.login({
        username, password,
      });
      console.log('success, ', user.username, 'authorized');
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(notificationChange('Wrong username or password', 5));
    }
  };

  const Notification = () => {
    const { message, type } = useSelector(state => state.notification)
    if (!message) return <br/>
    const notificationStyle = {
      color: type=='error'? 'red' : 'green',
      fontWeight: 'bold',
      fontSize: 20,
      backgroundColor: 'gainsboro',
      border: type=='error'? '3px solid red' : '3px solid green',
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
        <form onSubmit={handleLogin}>
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
    <div>
      <h2>blogs</h2>
      <div>{user.username} is logged in<button onClick={() => {
        setUser(null);
        setUsername('')
        setPassword('')
        window.localStorage.clear();
      }
      }>log out</button></div>
      <Notification />
      <Togglable buttonLabel='New blog' >
        <BlogForm />
      </Togglable>
      <div id='bloglist'>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}</div>
    </div>
  );
};

export default App;