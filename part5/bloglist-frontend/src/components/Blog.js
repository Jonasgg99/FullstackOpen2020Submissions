import React, {useState} from 'react'

const Blog = ({ blog, update, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault();
    update(blog.id, { likes: blog.likes+1 });
  }

  const remove = (event) => {
    event.preventDefault();
    console.log('removing ', blog.title);
    removeBlog(blog)
  }

  const [visible, setVisibility] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }
  return (
    <div style={blogStyle}>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
          {blog.url}
          <br/>{blog.likes}
          <button onClick={addLike}>like</button>
          <br/>{blog.user.name}
          <button onClick={toggleVisibility}>hide</button>
          <br/>
          <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
