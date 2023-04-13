/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import registerSchema from '../../validation-schemas/register-validation-scheme';

function RegisterPage() {
  const nameRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfrim = React.useRef();

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const formSubmitHandler = () => (
    auth()
  );

  React.useEffect(() => {
    if (success === true) {
      navigate('/');
    }
  }, [success]);

  // eslint-disable-next-line consistent-return
  function auth() {
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:5002/register', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setError((prevState) => prevState = data.error);
        setSuccess((prevState) => prevState = data.success);
      });
  }
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random/?city,night)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <Box sx={{
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
            Register Form
          </Typography>
          <Box noValidate onSubmit={handleSubmit(formSubmitHandler)} component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              name="username"
              fullWidth
              id="username"
              label="Username"
              {...register('username')}
              inputRef={nameRef}
              helperText={errors.username?.message}

            />
            {error === ''
              ? ''
              : <Typography>{error}</Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              {...register('password')}
              inputRef={passwordRef}
              helperText={errors.password?.message}
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confrim Password"
              {...register('confirmPassword')}
              inputRef={passwordConfrim}
              helperText={errors.confirmPassword?.message}
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create account
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}

export default RegisterPage;
