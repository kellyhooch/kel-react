import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';
import { User, UserPlus } from 'lucide-react';

interface InitialScreenProps {
  setIsRecurring: (isRecurring: boolean) => void;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ setIsRecurring }) => {
  const navigate = useNavigate();

  const handleInitialChoice = (recurring: boolean) => {
    setIsRecurring(recurring);
    if (recurring) {
      navigate('/catalog');
    } else {
      navigate('/questionnaire');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#333' }}>
        Welcome!
      </Typography>
      <Typography variant="h5" component="p" color="textSecondary" sx={{ mb: 5, fontFamily: 'Poppins' }}>
        Are you a new or recurring customer?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<UserPlus />}
          onClick={() => handleInitialChoice(false)}
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
          New
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<User />}
          onClick={() => handleInitialChoice(true)}
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
          Recurring
        </Button>
      </Box>
    </Container>
  );
};

export default InitialScreen;
