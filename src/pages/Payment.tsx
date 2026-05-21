import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
} from '@mui/material';

interface PaymentProps {
  handlePayment: () => void;
}

const Payment: React.FC<PaymentProps> = ({ handlePayment }) => {
  const navigate = useNavigate();

  const onPay = () => {
    handlePayment();
    navigate('/');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Secure Payment
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="cardName"
              label="Name on Card"
              name="cardName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="cardNumber"
              label="Card Number"
              name="cardNumber"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="expDate"
              label="Expiry Date (MM/YY)"
              name="expDate"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 4, py: 2 }}
          onClick={onPay}
        >
          Pay Now
        </Button>
      </Box>
    </Paper>
  );
};

export default Payment;
