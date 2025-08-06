import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';


interface ChallengeMode {
  onExit: () => void;
}

const ChallengeMode: React.FC<ChallengeMode> = ({ onExit }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPlayedToday, setHasPlayedToday] = useState<boolean>(false);

  useEffect(() => {
    checkDailyChallenge();
  }, []);

  const checkDailyChallenge = async (): Promise<void> => {
    const lastPlayed = localStorage.getItem('lastChallengeDate');
    const today = new Date().toDateString();

    if (lastPlayed === today) {
      setHasPlayedToday(true);
      const savedStreak = localStorage.getItem('challengeStreak');
      if (savedStreak) {
        setStreak(parseInt(savedStreak));
      }
      setIsLoading(false);
      return;
    }

    try {
      console.log('Fetching questions...');
      const questionsData = await questions();
      console.log('Questions received:', questionsData);

      if (!questionsData || questionsData.length === 0) {
        throw new Error('No questions received from the API');
      }

      // Get one random question for the daily challenge
      const randomQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
      console.log('Selected question:', randomQuestion);

      if (!randomQuestion || !randomQuestion._id) {
        throw new Error('Invalid question format received');
      }

      setQuestion(randomQuestion);
      setIsLoading(false);
    } catch (err) {
      console.error('Error in checkDailyChallenge:', err);
      setError('Failed to load challenge question. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean): void => {
    if (!hasPlayedToday) {
      const newStreak = isCorrect ? streak + 1 : 0; // Reset streak on wrong answer
      setStreak(newStreak);
      
      // Save the results
      localStorage.setItem('lastChallengeDate', new Date().toDateString());
      localStorage.setItem('challengeStreak', newStreak.toString());
      setHasPlayedToday(true);
    }
  };

  console.log('Current state:', { isLoading, error, hasPlayedToday, question });

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
        <p className="text-slate-600">Loading daily challenge...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onExit}
          className="mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  if (hasPlayedToday) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Challenge Completed!</h2>
        <p className="text-xl text-indigo-600 font-bold mb-4">Current Streak: {streak}</p>
        <button
          onClick={onExit}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
        <p className="text-red-600">No question available. Please try again later.</p>
        <button
          onClick={onExit}
          className="mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg z-10">
        <span className="text-indigo-600 font-bold">Streak: {streak}</span>
      </div>
      <QuestionCard
        question={question}
        onAnswer={handleAnswer}
        questionNumber={1}
        totalQuestions={1}
      />
    </div>
  );
};

export default ChallengeMode;