import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/usersReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(getUsers())
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <Router>
          <Switch>
            <Route path="/users/:id">
              <User users={users} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs/:id'>
              <Blog  blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
            </Route>
            <Route path="/">
              <h2>create new</h2>
              <Toggable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Toggable>
              {blogs
                .sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
                .map(blog =>
                  <div style={blogStyle} key={blog.id}>
                    <Link  to={`/blogs/${blog.id}`}>{blog.title}</Link><br/>
                  </div>
                )
              }
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App