import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Link, IconButton, Badge, TextField, Box } from '@mui/material';
import { ShoppingCart, Heart } from 'lucide-react';
import InitialScreen from './pages/InitialScreen';
import Questionnaire from './pages/Questionnaire';
import Workflow from './pages/Workflow';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

// Define the structure of an item
interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

// Define the structure of a cart item
interface CartItem extends Item {
  quantity: number;
}

// Define the structure of a comment
interface Comment {
  id: number;
  productId: number;
  text: string;
  username: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
        primary: '#333'
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [postAnonymously, setPostAnonymously] = useState(false);

  const addToCart = (itemToAdd: Item) => {
    const existingItem = cart.find(item => item.id === itemToAdd.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const saveForLater = () => {
    if (currentItem) {
      if (!saved.find(item => item.id === currentItem.id)) {
        setSaved([...saved, currentItem]);
      }
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentItem) {
      const newCommentObj: Comment = {
        id: Date.now(),
        productId: currentItem.id,
        text: newComment,
        username: (postAnonymously || !username.trim()) ? 'Anonymous' : username,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handlePayment = () => {
    alert('Payment Successful!');
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
              <Link component={RouterLink} to="/" color="inherit" underline="none">
                The Little Trooper
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Enter your name"
                variant="outlined"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {username.trim() && <Typography variant="body1" sx={{color: theme.palette.text.primary}}>Hi, {username}!</Typography>}
              <IconButton component={RouterLink} to="/cart" color="inherit">
                <Badge badgeContent={cart.reduce((total, item) => total + item.quantity, 0)} color="secondary">
                  <ShoppingCart style={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={() => { /* Implement saved items screen later */ }}>
                <Badge badgeContent={saved.length} color="secondary">
                  <Heart style={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <main>
            <Routes>
              <Route path="/" element={<InitialScreen setIsRecurring={() => {}} />} />
              <Route path="/questionnaire" element={<Questionnaire setCurrentItem={setCurrentItem} />} />
              <Route path="/workflow" element={<Workflow addToCart={addToCart} saveForLater={saveForLater} comments={comments} newComment={newComment} setNewComment={setNewComment} handleAddComment={handleAddComment} postAnonymously={postAnonymously} setPostAnonymously={setPostAnonymously} />} />
              <Route path="/catalog" element={<Catalog setCurrentItem={setCurrentItem} addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} calculateTotal={calculateTotal} />} />
              <Route path="/payment" element={<Payment handlePayment={handlePayment} />} />
            </Routes>
          </main>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
