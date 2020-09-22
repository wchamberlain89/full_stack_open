import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import login from '../services/login'
import { setNotification } from '../redux/reducers/notification'
import { setUser } from '../redux/reducers/userReducer'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

function LoginForm() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing('25%', 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const initialFormstate = {
    username: '',
    password: ''
  }
  const [formState, setFormState] = React.useState(initialFormstate)

  const onInputChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value })
    console.log(formState)
  }

  const onLogin = async ({ username, password }) => {
    try {
      const response = await login({ username, password })
      dispatch(setNotification('Successfully Logged In'))
      dispatch(setUser(response))
    } catch (error) {
      setFormState(initialFormstate)
      console.log(error)
    } finally {
      history.push('/')
    }
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        Sign in
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          onLogin(formState)
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={onInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onInputChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'Don\'t have an account? Sign Up'}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LoginForm