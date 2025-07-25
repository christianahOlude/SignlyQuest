
// @ts-ignore
import React from 'react';

interface ScoreScreenProps {
  score: {
    correct: number;
    incorrect: number;
  };
  totalQuestions: number;
  onRestart: () => void;
}

// @ts-ignore
const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score.correct / totalQuestions) * 100);
  // @ts-ignore
  const message =
    percentage === 100
      ? "Perfect Score! You're a natural!"
      : percentage >= 75
      ? "Great job! You're getting really good!"
      : percentage >= 50
      ? "Nice work! Keep practicing!"
      : "Good try! Every attempt is a step forward!";


    return (
        <></>
  );
};

export default ScoreScreen;
