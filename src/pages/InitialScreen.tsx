import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

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
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Are you a new or recurring customer?
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => handleInitialChoice(false)}>New</Button>
        <Button variant="contained" onClick={() => handleInitialChoice(true)}>Recurring</Button>
      </Box>
    </Box>
  );
};

export default InitialScreen;
