import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogFormRef = useRef()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotificationMessage = (message, type) => {
    dispatch(setNotification(message, type, 5))
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showNotificationMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    showNotificationMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
  }

  const updateBlog = async (blogId, blogToUpdate) => {
    // const updatedBlog = await blogService.update(blogId, blogToUpdate)
    // const newBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : {
    //   ...b,
    //   title: updatedBlog.title,
    //   author: updatedBlog.author,
    //   likes: updatedBlog.likes,
    //   url: updatedBlog.url
    // })
    // setBlogs(newBlogs)
  }

  const deleteBlog = async (blogId) => {
    // await blogService.remove(blogId)
    // const newBlogs = blogs.filter(b => b.id !== blogId)
    // setBlogs(newBlogs)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <Toggable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Toggable>
        {blogs
          .sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} canDelete={blog.user.username === user.username}/>
          )
        }
      </div>
    )
  }

}

export default App