import React, { useState } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  IconButton,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <Button color="inherit" component={Link} to="/">Login</Button>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{
          color: 'white',
          fontSize: '2.5rem',
        }}
        />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
