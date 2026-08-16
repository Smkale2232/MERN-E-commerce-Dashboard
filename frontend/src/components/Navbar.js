import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <StorefrontIcon />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
        >
          E-Commerce Dashboard
        </Typography>

        {user?.role === 'admin' && (
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        )}

        {user && (
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
        )}

        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">{user.name}</Typography>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Button color="inherit" variant="outlined" size="small" component={Link} to="/login">
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
