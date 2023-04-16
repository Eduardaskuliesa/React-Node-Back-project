/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { login, reset } from '../features/authSlice';
import loginScheme from '../validation-schemas/login-validations-scheme';

function LoginPage() {
  const [user, setUser] = React.useState('');
  const [password, setPwd] = React.useState('');
  const [error, setError] = React.useState('');

  const disp = useDispatch();
  const navigate = useNavigate();

  const {
    username, token, isSuccess, isError, message,
  } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isSuccess) {
      navigate('/allUsers');
    } if (isError) {
      setError(message);
    }
  }, [isSuccess, isError, message]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      username: user,
      password,
    };
    disp(login(userData));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random/?city,night)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login in
          </Typography>
          <Box component="form" onSubmit={(formSubmitHandler)} noValidate sx={{ mt: 1 }}>
            <TextField
              label="Username"
              name="username"
              required
              fullWidth
              margin="normal"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              id="password"
              autoComplete="current-password"
            />
            {error === ''
              ? ''
              : <Typography>{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="http://localhost:5173/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
