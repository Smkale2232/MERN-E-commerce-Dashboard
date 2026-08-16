import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Divider } from '@mui/material';
import api from '../services/api';

const statusColor = { pending: 'warning', paid: 'info', shipped: 'primary', delivered: 'success', cancelled: 'error' };

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then((res) => setOrders(res.data));
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Your orders</Typography>

      {orders.length === 0 && <Typography color="text.secondary">No orders yet.</Typography>}

      {orders.map((o) => (
        <Paper key={o.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Order #{o.id}</Typography>
            <Chip size="small" label={o.status} color={statusColor[o.status] || 'default'} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {new Date(o.created_at).toLocaleString()}
          </Typography>
          <Divider sx={{ my: 1 }} />
          {o.items.map((i, idx) => (
            <Typography variant="body2" key={idx}>
              {i.quantity} × {i.name} — ${(i.price * i.quantity).toFixed(2)}
            </Typography>
          ))}
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Total: ${o.total_amount.toFixed(2)}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
