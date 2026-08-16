import { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, CardActions, Typography, Button, TextField,
  MenuItem, Chip, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../services/api';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    const timeout = setTimeout(() => {
      api.get('/products', { params }).then((res) => setProducts(res.data));
    }, 250);
    return () => clearTimeout(timeout);
  }, [search, category]);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Products</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 240 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{p.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {p.description}
                </Typography>
                <Typography variant="h6" color="primary">${p.price.toFixed(2)}</Typography>
                <Chip
                  size="small"
                  sx={{ mt: 1 }}
                  label={p.stock_quantity > 0 ? `${p.stock_quantity} in stock` : 'Out of stock'}
                  color={p.stock_quantity > 0 ? 'default' : 'error'}
                />
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={p.stock_quantity <= 0}
                  onClick={() => addItem(p)}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {products.length === 0 && (
          <Typography sx={{ p: 4 }} color="text.secondary">No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
