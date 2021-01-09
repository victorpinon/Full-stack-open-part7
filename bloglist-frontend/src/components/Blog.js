import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField, toInput } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  useParams, Redirect
} from 'react-router-dom'

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const comment = useField('text')

  if (!blog) {
    return (
      <Redirect to="/" />
    )
  }

  const canDelete = blog.user.username === user.username

  const handleLike = async () => {
    const blogToLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, blogToLike)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment.value))
    comment.reset()
  }

  return (
    <div className="blog">
      <div>
        <Typography variant="h3" color="inherit" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
        <Typography variant="body1" color="inherit" gutterBottom>
          {blog.url}
        </Typography>
        <Typography variant="body1" color="inherit" gutterBottom>
          <IconButton color="primary" onClick={handleLike}>
            <ThumbUpAltIcon />
          </IconButton>
          {blog.likes}
        </Typography>
        <Typography variant="body1" color="inherit" gutterBottom>
          added by {blog.user.name}
        </Typography>
        <br />
        <Typography variant="h5" color="inherit" gutterBottom>
          Comments
        </Typography>
        <List>
          {blog.comments.map(comment =>
            <ListItem key={comment}>
              <ListItemText>
                {comment}
              </ListItemText>
            </ListItem>
          )}
        </List>
        <br />
        <form onSubmit={handleComment} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            {...toInput(comment)}/>
          <Button type="submit">Add comment</Button>
        </form>
        <br />
        {canDelete && <Button color="secondary" onClick={removeBlog}>remove</Button>}
      </div>
    </div>
  )
}

export default Blog
