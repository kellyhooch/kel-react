import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Comment {
  id: number;
  productId: number;
  text: string;
  username: string;
}

interface WorkflowProps {
  addToCart: (item: Item) => void;
  saveForLater: () => void;
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
  postAnonymously: boolean;
  setPostAnonymously: (postAnonymously: boolean) => void;
}

const Workflow: React.FC<WorkflowProps> = ({ addToCart, saveForLater, comments, newComment, setNewComment, handleAddComment, postAnonymously, setPostAnonymously }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentItem = location.state?.item as Item | null;

  if (!currentItem) {
    return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h5">No item selected.</Typography>
            <Button variant="contained" onClick={() => navigate('/catalog')} sx={{ mt: 2 }}>
            Go to Catalog
            </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={4}>
        {/* Item Display */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="400"
              image={currentItem.image}
              alt={currentItem.name}
              sx={{ objectFit: 'contain', p: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {currentItem.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {currentItem.description}
              </Typography>
              <Typography variant="h5" color="text.primary">
                ${currentItem.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Options and Comments */}
        <Grid item xs={12} md={6}>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <Button variant="contained" startIcon={<ShoppingCart />} onClick={() => addToCart(currentItem)}>
              Add to Cart
            </Button>
            <Button variant="outlined" startIcon={<Heart />} onClick={saveForLater}>
              Save for Later
            </Button>
            <Button variant="outlined" startIcon={<Eye />} onClick={() => navigate('/catalog')}>
              View All Products
            </Button>
          </Box>

          {/* Comment Section */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Comments & Reviews
            </Typography>

            {/* Comment List */}
            <List sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
              {comments.filter(c => c.productId === currentItem.id).length > 0 ? (
                comments.filter(c => c.productId === currentItem.id).map((comment, index) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={comment.username}
                        secondary={comment.text}
                      />
                    </ListItem>
                    {index < comments.filter(c => c.productId === currentItem.id).length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))
              ) : (
                <Typography sx={{ p: 2 }}>Be the first to comment!</Typography>
              )}
            </List>
            <Divider />

            {/* Comment Form */}
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={postAnonymously}
                    onChange={(e) => setPostAnonymously(e.target.checked)}
                  />
                }
                label="Post as Anonymous"
                sx={{ mt: 1 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddComment}
                sx={{ mt: 1 }}
              >
                Submit Review
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Workflow;
