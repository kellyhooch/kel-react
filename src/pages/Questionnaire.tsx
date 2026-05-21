import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Add a small delay to allow the state to update before navigating
    setTimeout(() => navigate('/workflow'), 0);
  }

  return (
    <div className="initial-screen">
      <h2>Let's find the right product for you.</h2>
      <p>What is your primary skin concern?</p>
      <button onClick={() => handleQuestionnaireAnswer('dry')}>Dry, red, itchy, or inflamed skin</button>
      <button onClick={() => handleQuestionnaireAnswer('oily')}>Red, itchy, and weepy skin</button>
    </div>
  );
};

export default Questionnaire;
