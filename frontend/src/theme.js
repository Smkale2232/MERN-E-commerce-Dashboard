import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2A6F6F', dark: '#1E4F4F', light: '#4C8F8F' },
    secondary: { main: '#E0973C' },
    background: { default: '#F6F7F6', paper: '#FFFFFF' },
    text: { primary: '#1C2624', secondary: '#5B6A67' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: '#1E4F4F' } },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

export default theme;
