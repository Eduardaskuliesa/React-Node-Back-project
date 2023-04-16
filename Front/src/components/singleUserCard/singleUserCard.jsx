/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Box } from '@mui/system';
import { Avatar } from '@mui/material';

function SingleUserCard({
  username,
}) {
  return (
    <Stack>
      <Avatar sx={{
        bgcolor: 'black',
        width: 56,
        height: 56,
      }}
      />
      <Box>{username}</Box>
    </Stack>
  );
}

export default SingleUserCard;
