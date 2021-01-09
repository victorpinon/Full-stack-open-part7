import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import PageviewIcon from '@material-ui/icons/Pageview'
import {
  Link
} from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)

  if(!users) {
    return null
  }

  return(
    <div>
      <Typography variant="h3" color="inherit" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '5%' }}></TableCell>
              <TableCell></TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.id}>
                <TableCell>
                  <IconButton component={Link} to={`/users/${user.id}`}>
                    <PageviewIcon  />
                  </IconButton>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </ Table>
      </ TableContainer>
    </div>
  )
}


export default Users