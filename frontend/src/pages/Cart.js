import { useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  TextField, Button, Paper, Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const checkout = async () => {
    if (!user) return navigate('/login');
    setError('');
    try {
      await api.post('/orders', { items });
      clearCart();
      setMessage('Order placed successfully.');
      setTimeout(() => navigate('/orders'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Your cart</Typography>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {items.length === 0 ? (
        <Typography color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((i) => (
                <TableRow key={i.product_id}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell align="right">${i.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={i.quantity}
                      onChange={(e) => updateQuantity(i.product_id, Number(e.target.value))}
                      inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
                    />
                  </TableCell>
                  <TableCell align="right">${(i.price * i.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removeItem(i.product_id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" size="large" onClick={checkout}>
              {user ? 'Place order' : 'Log in to check out'}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
