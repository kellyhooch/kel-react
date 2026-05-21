import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CatalogProps {
  setCurrentItem: (item: Item) => void;
  addToCart: (item: Item) => void;
}

const Catalog: React.FC<CatalogProps> = ({ setCurrentItem, addToCart }) => {
  const navigate = useNavigate();
  const catalog = [
    { id: 1, name: 'Soothing Gel', description: 'For dry, red, itchy, flakey, inflamed, and sunburnt skin', price: '35.80', image: '/soothing-gel.png' },
    { id: 2, name: 'Drying Cream', description: 'For red, itchy, oozing / weepy skin', price: '27.80', image: '/drying-cream.png' },
  ];

  const handleViewDetails = (item: Item) => {
    setCurrentItem(item);
    navigate('/workflow');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Product Catalog
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {catalog.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} elevation={3}>
              <CardMedia
                component="img"
                height="250"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'contain', p:2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  ${item.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                <Button size="small" variant="outlined" onClick={() => handleViewDetails(item)}>
                  View Details
                </Button>
                <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); addToCart(item); }}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Catalog;
