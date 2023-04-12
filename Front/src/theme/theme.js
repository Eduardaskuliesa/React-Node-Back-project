import { createTheme } from '@mui/material';

const theme = createTheme({
  zIndex: {
    appBar: 1250,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

});

export default theme;
