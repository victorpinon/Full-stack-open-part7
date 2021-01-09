import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form className={'formDiv'} onSubmit={addBlog} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="standard-basic"
          label="Title"
          value={title}
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-basic"
          label="Author"
          value={author}
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-basic"
          label="URL"
          value={url}
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <br />
      <Button id="create-button" type="submit" variant="contained" color="primary">create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm