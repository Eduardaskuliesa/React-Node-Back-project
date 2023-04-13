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
import DrawerComponent from './drawer';
import theme from '../../theme/theme';

function Navbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
