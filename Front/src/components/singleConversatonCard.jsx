/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography, Button, IconButton, Icon,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';

function SingleConversatonCard({ item }) {
  const nav = useNavigate();

  const { username } = useSelector((state) => state.auth);

  const filterNam = () => item.participants.filter((x) => x !== username);

  const [deleted, setDeleted] = React.useState(false);

  const deleteConv = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    };
    fetch(`http://localhost:5002/deleteConversation/${item._id}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDeleted((prevState) => prevState = data.success);
      });
  };

  const handleClick = () => {
    deleteConv();
    this.forceUpdate();
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 4,
      }}
    >
      <Box sx={{
        maxWidth: 400,
        minWidth: 200,
        border: 'solid',
        padding: 1,

      }}
      >
        <Typography variant="h4">
          Converastion with
          {' '}
          {filterNam()[0]}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">
            You have:
            {' '}
            {item.messages.length}
            <EmailIcon />
          </Typography>
          <IconButton
            onClick={() => nav(`/chat/${item._id}`)}
            variant="contained"
            sx={{
              '& svg': {
                fontSize: 50,
              },
              ml: 4,
            }}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="contained"
            sx={{
              '& svg': {
                fontSize: 50,
              },
            }}
            color="error"
            onClick={handleClick}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Stack>

  );
}

export default SingleConversatonCard;
