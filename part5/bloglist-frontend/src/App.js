import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token);
    }
  }, [])

  const handleLogin =  async(event) => {
    event.preventDefault();
    console.log('logging in');
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('success, ', user.username, 'authorized');
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotification({text:`Wrong username or password`, error:true})
      console.log('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const creationForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      Title:<input value={title} onChange={({target}) => setTitle(target.value)} />
      <br/>Author:<input value={author} onChange={({target}) => setAuthor(target.value)} />
      <br/>Url:<input value={url} onChange={({target}) => setUrl(target.value)} />
      <button type='submit'>Submit</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault();
    console.log('adding blog');

    const newBlog = { title, author, url }
    console.log(newBlog);

    blogService.create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response));
        console.log(response, ' added');
        setNotification({text:`a new blog "${response.title}" has been added.`, error:false})
      })
      .then(setTitle(''), setAuthor(''), setUrl(''))
      .then(setTimeout(() => {
        setNotification(null)
      },5000))
      .catch(error => {
        console.log(error);
      })
  }

  const Notification = ({ message }) => {
    const notificationStyle = {
      color: message.error? 'red' : 'green',
      fontWeight: 'bold',
      fontSize: 20,
      backgroundColor: 'gainsboro',
      border: message.error? '3px solid red' : '3px solid green',
      borderRadius: '5px',
      padding: '15px'
    }
    return (
      <div style={notificationStyle}>
        { message.text }
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification === null?
          <br/> : <Notification message = {notification} />}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username"
            onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="text" value={password} name="Password"
            onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.username} is logged in<button onClick={() => {
        setUser(null);
        window.localStorage.clear();
        }
      }>log out</button></div>
      <br/>
      {notification === null?
      <br/> : <Notification message = {notification} />}
      {creationForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App