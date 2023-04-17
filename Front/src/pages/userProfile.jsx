/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {
  Typography,
  Button, TextField, Avatar, IconButton,
} from '@mui/material';
import passChangeScheme from '../validation-schemas/pass-change-validations-scheme';
import { updateUsername, updatePassword, updatePhoto } from '../features/authSlice';

function UserProfile() {
  const [error, setError] = React.useState();
  const {
    username, isError, message, secret, photo,
  } = useSelector((state) => state.auth);
  const disp = useDispatch();
  const [diplayedImage, setDisplayedImage] = React.useState(photo);
  const [imgUrl, setImgUrl] = React.useState('');

  React.useEffect(() => {
    if (isError || message) {
      setError(message);
    }
  }, [isError, message]);

  const nameRef = React.useRef();
  const passRef = React.useRef();

  const submitHandlerLogin = (e) => {
    e.preventDefault();
    const data = { username: nameRef.current.value, secret: secret.toString() };
    disp(updateUsername(data));
  };

  const submitHandlerPass = (e) => {
    const data = { password: passRef.current.value, secret: secret.toString() };
    disp(updatePassword(data));
  };

  const submitHandlerPhoto = (e) => {
    e.preventDefault();
    const data = { photo: imgUrl, secret: secret.toString() };
    disp(updatePhoto(data));
    setDisplayedImage(imgUrl);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passChangeScheme),
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop={4}
    >
      <Box
        border="solid"
        minWidth={345}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4">{username}</Typography>
        <Box flexDirection="column" display="flex" component="form" onSubmit={(submitHandlerLogin)}>
          <TextField
            margin="normal"
            type="text"
            label="Change username"
            inputRef={nameRef}
          />
          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
            type="submit"
          >
            Change username

          </Button>
          {error === ''
            ? ''
            : <Typography>{error}</Typography>}
        </Box>
        <Box flexDirection="column" display="flex" component="form" onSubmit={handleSubmit(submitHandlerPass)}>
          <TextField
            margin="normal"
            type="password"
            label="Change password"
            inputRef={passRef}
            {...register('password')}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            type="password"
            label="Confirm password"
            {...register('confirmPassword')}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
            type="submit"
          >
            Change password

          </Button>
        </Box>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          minWidth={250}
          onSubmit={(submitHandlerPhoto)}
        >
          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Avatar
              sx={{
                width: 150,
                height: 150,
                mt: 2,
              }}
              src={diplayedImage}
            />
            <IconButton
              size="large"
              sx={{
                '& svg': {
                  fontSize: 50,
                },
              }}
              color="primary"
              type="submit"
            >
              <CloudDownloadIcon />
            </IconButton>
          </Box>
          <TextField
            margin="normal"
            type="text"
            label="Photo url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />

        </Box>
      </Box>
    </Box>

  );
}

export default UserProfile;
