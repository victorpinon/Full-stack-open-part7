import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  useParams, Redirect
} from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id

  if (!users) {
    return (
      <Redirect to="/" />
    )
  }

  const user = users.find(u => u.id === id)

  if (!user) {
    return (
      <Redirect to="/" />
    )
  }

  return(
    <div>
      <Typography variant="h3" color="inherit" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" color="inherit" gutterBottom>
        Added blogs
      </Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemText>
              {blog.title}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )
}


export default User