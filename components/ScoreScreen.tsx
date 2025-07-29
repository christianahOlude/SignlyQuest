import React from 'react';

interface ScoreScreenProps {
  score: {
    correct: number;
    incorrect: number;
  };
  totalQuestions: number;
  onRestart: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score.correct / totalQuestions) * 100);
  const message =
    percentage === 100
      ? "Perfect Score! You're a natural!"
      : percentage >= 75
      ? "Great job! You're getting really good!"
      : percentage >= 50
      ? "Nice work! Keep practicing!"
      : "Good try! Every attempt is a step forward!";

  return (
      <>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-fade-in-up">
          <h2 className="text-4xl font-black text-slate-800 mb-4">Your Score</h2>
          <div className="text-6xl font-bold text-indigo-600 mb-4">
            {score.correct} / {totalQuestions}
          </div>
          <p className="text-slate-600 mb-6">{message}</p>
          <button
              onClick={onRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Restart Quiz
          </button>
        </div>
      </>
  )
};

export default ScoreScreen;
