/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import {
  Avatar, Button, Box, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';

import { Link } from 'react-router-dom';
import { ContentWrapper } from './styled';

function SingleUserCart(props) {
  return (
    <Stack sx={{ boxShadow: 3, position: 'relative' }}>
      <ContentWrapper>
        <Typography variant="h3">{props.username}</Typography>
        <Avatar
          sx={{
            width: 150,
            height: 150,
            mt: 2,
          }}
          src={props.photo}
        />
        <Link to={`/getUser/${props._id}`}>
          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
          >
            Profile

          </Button>
        </Link>
      </ContentWrapper>
    </Stack>
  );
}

export default SingleUserCart;
