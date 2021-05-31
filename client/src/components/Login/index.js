import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import XRegExp from 'xregexp';
import Style from './style';

function Login(props) {
  const classes = Style();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = () => {
    const re = new XRegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    return re.test(String(email).toLowerCase());
  };

  const handleForm = (e) => {
    e.preventDefault();
    const data = { email, password };
    if (!email || !validateEmail(email)) {
      return setMessage('You must Enter your email first!');
    }
    if (!password) {
      return setMessage('You must enter passowrd!');
    }

    axios
      .post('/api/login', data)
      .then((result) => {
        if (result.status === 200) {
          props.history.push({
            pathname: '/home',
          });
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <Box component="div" p={0} width={1}>
      <Grid container item sx={12} justify="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.title}
          >
            Welcome Back
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <form onSubmit={handleForm} className={classes.loginForm}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TextField
                  onChange={({ target }) => setEmail(target.value)}
                  id="email"
                  name="email"
                  value={email}
                  label="Email"
                  type="text"
                  className={classes.inputBox}
                  autoFocus={true}
                  margin={'dense'}
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={({ target }) => setPassword(target.value)}
                  id="password"
                  name="password"
                  value={password}
                  label="Password"
                  type="password"
                  className={classes.inputBox}
                  margin={'dense'}
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <FormControl>
                <FormHelperText
                  id="error-text"
                  className={classes.errorMessage}
                >
                  {message.charAt(0).toUpperCase() + message.slice(1)}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Button className={classes.loginBtn} type="submit" fullWidth>
              Sign in
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
