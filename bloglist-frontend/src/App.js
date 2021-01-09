import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const showNotificationMessage = (message, type) => {
    dispatch(setNotification(message, type, 5))
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } catch (exception) {
      showNotificationMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUser(user))
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    showNotificationMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
  }

  const updateBlog = async (id, blogToUpdate) => {
    dispatch(likeBlog(id, blogToUpdate))
  }

  const deleteBlog = async (blogId) => {
    dispatch(removeBlog(blogId))
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