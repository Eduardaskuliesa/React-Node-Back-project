import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useMediaQuery,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import DrawerComponent from './drawer';
import theme from '../../theme/theme';

function Navbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { username } = useSelector((state) => state.auth);

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',

      }}
      >
        <Typography variant="h4">
          New FaceBook
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <Box sx={{ display: 'flex', gap: theme.spacing(3) }}>
            {username ? ''
              : (
                <>
                  <Button color="inherit" component={Link} to="/">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}

            {username ? (
              <>
                <Button color="inherit" component={Link} to="/profile">
                  {username}
                </Button>
                <Button color="inherit" component={Link} to="/allUsers">
                  All Users
                </Button>
                <Button color="inherit" component={Link}>
                  All Conversations
                </Button>
              </>

            )

              : '' }
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
