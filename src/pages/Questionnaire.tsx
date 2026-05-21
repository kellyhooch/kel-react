import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { Sun, Droplet } from 'lucide-react';

interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

interface QuestionnaireProps {
  setCurrentItem: (item: Item | null) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ setCurrentItem }) => {
  const navigate = useNavigate();
  const catalog = [
    { id: 1, name: 'Soothing Gel', description: 'For dry, red, itchy, flakey, inflamed, and sunburnt skin', price: '35.80', image: '/soothing-gel.png' },
    { id: 2, name: 'Drying Cream', description: 'For red, itchy, oozing / weepy skin', price: '27.80', image: '/drying-cream.png' },
  ];

  const handleQuestionnaireAnswer = (answer: 'dry' | 'oily') => {
    if (answer === 'dry') {
      setCurrentItem(catalog.find(item => item.id === 1) || null);
    } else {
      setCurrentItem(catalog.find(item => item.id === 2) || null);
    }
    setTimeout(() => navigate('/workflow'), 0);
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#333' }}>
        Let&apos;s find the right product for you.
      </Typography>
      <Typography variant="h5" component="p" color="textSecondary" sx={{ mb: 5, fontFamily: 'Poppins' }}>
        What is your primary skin concern?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Sun />}
          onClick={() => handleQuestionnaireAnswer('dry')}
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '50px',
            padding: '15px 30px',
            boxShadow: '0 5px 15px rgba(255, 105, 180, 0.4)',
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 25px rgba(255, 105, 180, 0.6)',
            }
          }}
        >
          Dry, red, itchy, or inflamed skin
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Droplet />}
          onClick={() => handleQuestionnaireAnswer('oily')}
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '50px',
            padding: '15px 30px',
            boxShadow: '0 5px 15px rgba(245, 0, 87, 0.4)',
            '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 25px rgba(245, 0, 87, 0.6)',
            }
          }}
        >
          Red, itchy, and weepy skin
        </Button>
      </Box>
    </Container>
  );
};

export default Questionnaire;
