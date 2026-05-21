import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X } from 'lucide-react';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  updateQuantity: (itemId: number, newQuantity: number) => void;
  removeFromCart: (itemId: number) => void;
  calculateTotal: () => string;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart, calculateTotal }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 900, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button variant="contained" onClick={() => navigate('/catalog')} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <React.Fragment>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ py: 2 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          src={item.image}
                          alt={item.name}
                          sx={{ width: 80, height: 80, mr: 2 }}
                        />
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{ variant: 'h6' }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Typography variant="body1">${item.price}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small">
                          <Minus />
                        </IconButton>
                        <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small">
                          <Plus />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                        <X />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" component="div" gutterBottom>
              Total: ${calculateTotal()}
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/payment')} sx={{ mr: 2 }}>
              Proceed to Checkout
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/catalog')}>
              Continue Shopping
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default Cart;
