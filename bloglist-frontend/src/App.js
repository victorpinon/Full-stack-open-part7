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
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PageviewIcon from '@material-ui/icons/Pageview'
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

  if (user === null) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '10%', maxWidth: '30%' }}>
        <Typography variant="h2" gutterBottom>
          Log in to application
        </Typography>
        <Notification />
        <br />
        <LoginForm handleSubmit={handleLogin} />
      </Container>
    )
  }
  else {
    return (
      <Container>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" gutterBottom>
                {user.name} logged in
              </Typography>
              <IconButton color="inherit" aria-label="menu">
              </IconButton>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              <IconButton
                style={{ marginLeft: 'auto' }}
                edge="end"
                onClick={handleLogout}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br />
          <br />
          <Notification />
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
              <Typography variant="h2" gutterBottom>
                Create new blog
              </Typography>
              <Toggable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Toggable>
              <br />
              {blogs
                .sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
                .map(blog =>
                  <div key={blog.id}>
                    <Card>
                      <CardContent style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Typography variant="h6" gutterBottom>
                          {blog.title}
                        </Typography>
                        <IconButton component={Link} to={`/blogs/${blog.id}`}>
                          <PageviewIcon  />
                        </IconButton>
                      </CardContent>
                    </Card>
                    <br />
                  </div>
                )
              }
            </Route>
          </Switch>
        </Router>
      </Container>
    )
  }

}

export default App