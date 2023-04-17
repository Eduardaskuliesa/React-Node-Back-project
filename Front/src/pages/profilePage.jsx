/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Button } from '@mui/material';
import { getProfile, reset } from '../features/allUsers';

function PofilePage() {
  const { id } = useParams();
  const disp = useDispatch();
  const { profile } = useSelector((state) => state.data);
  const { secret, username, isSuccess } = useSelector((state) => state.auth);
  const [success, setSuccess] = React.useState(false);
  const [isloaded, setisLoaded] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    disp(getProfile(id));
    if (success === true) {
      navigate('/conversations');
    }
    if (username) {
      setisLoaded(true);
    }
    return () => disp(reset());
  }, [success, isSuccess]);

  const createConvo = () => {
    const data = {
      secret,
      from: username,
      to: profile.user.username,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:5002/newConversation', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccess((prevState) => prevState = data.success);
      });
  };
  console.log(success);
  return (

    <>
      {isloaded
        ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <Stack sx={{
              boxShadow: 3,
              position: 'relative',
              minWidth: 345,
              justifyContent: 'center',
              alignItems: 'center',
              mt: 20,
            }}
            >
              <Typography variant="h3">{profile.user.username}</Typography>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mt: 2,
                }}
                src={profile.user.photo}
              />
              <Button
                onClick={createConvo}
                variant="contained"
              >
                Start Conversation

              </Button>
            </Stack>
          </Box>
        )
        : '' }
    </>

  );
}

export default PofilePage;
