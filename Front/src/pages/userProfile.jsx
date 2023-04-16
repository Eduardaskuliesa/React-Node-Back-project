import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';

function UserProfile() {
  const { username } = useSelector((state) => state.auth);
  return (
    <Stack marginTop={3}>
      <Typography>{username}</Typography>
    </Stack>
  );
}

export default UserProfile;
