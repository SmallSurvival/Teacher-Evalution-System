import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import Courses from '../Pages/Courses'
import { useEffect } from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Links color="inherit" href="http://www.biit.edu.pk/">
        BIIT
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignIn() {
  const [aridnum, setAridnum] = useState("");
  const [password, setPassword] = useState("");
  const [get, setGet] = useState('');
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function login() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json'
    }
    let get = { aridnum, password }
    axios.post(`http://192.168.1.7/WebLogin/api/Login/StudentLogin`, {
      Reg_No: get.aridnum,
      s_password: get.password
    })
      .then((response) => {

        localStorage.setItem('Courses', response.data.Reg_No);
        setGet(response.data);
        // console.log(Object.keys(response.data).length);
        history.push('/courses');
      }, (error) => {
        console.log(get);
        console.log(error);
      });

  }
  useEffect(() => {
    if (get !== '') {
      console.log("undefined run", get);
    }


  }, [get]);

  return (
    <>
      {Object.keys(get).length > 0 &&
        <Courses />
      }
      {Object.keys(get).length > 0 &&
        console.log("data if login return is", get)}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <img
                style={{ width: '42px', }}
                src='/images/download.jpeg'
                alt="img"
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setAridnum(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={login}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
