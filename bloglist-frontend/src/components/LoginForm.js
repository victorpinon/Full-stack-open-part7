import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="standard-basic"
          label="Username"
          type="text"
          value={username}
          name="Username"
          style={{ width: '70%' }}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <br />
      <div>
        <TextField
          required
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          name="Password"
          style={{ width: '70%' }}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br /> <br />
      <Button
        id="login-button"
        type="submit"
        variant="contained"
        color="primary"
        size="large">
        Login
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm