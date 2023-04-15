import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

function UserCart() {
  const { username } = useSelector((state) => state.auth);
  return (
    <Box>
      <Typography>{username}</Typography>
    </Box>
  );
}

export default UserCart;
