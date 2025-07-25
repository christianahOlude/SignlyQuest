//
// import React, { useState, useEffect, useCallback } from 'react';
// import { User, Question } from '../types';
// import { questions } from '../data/questions.tsx';
// import QuestionCard from './QuestionCard';
// import ScoreScreen from './ScoreScreen';
// import { PlayIcon } from './common/Icons';
//
// interface GameProps {
//   user: User;
// }
//
// type GameStatus = 'not_started' | 'playing' | 'finished';
//
// const shuffleArray = <T,>(array: T[]): T[] => {
//   return [...array].sort(() => Math.random() - 0.5);
// };
//
// const Game: React.FC<GameProps> = ({ user }) => {
//   const [status, setStatus] = useState<GameStatus>('not_started');
//   const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState({ correct: 0, incorrect: 0 });
//
//   /*useEffect(() => {
//     if (status === 'playing') {
//       setShuffledQuestions(shuffleArray(questions));
//       setCurrentQuestionIndex(0);
//       setScore({ correct: 0, incorrect: 0 });
//     }
//   }, [status]);*/
//   useEffect(() => {
//     if (status === 'playing') {
//       const loadQuestions = async () => {
//         try {
//           const fetchedQuestions = await questions();
//           setShuffledQuestions(shuffleArray(fetchedQuestions));
//         } catch (error) {
//           console.error('Error loading questions:', error);
//         }
//       };
//
//       loadQuestions();
//       setCurrentQuestionIndex(0);
//       setScore({ correct: 0, incorrect: 0 });
//     }
//   }, [status]);
//
//   const handleAnswer = useCallback((isCorrect: boolean) => {
//     if (isCorrect) {
//       setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
//     } else {
//       setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
//     }
//
//     setTimeout(() => {
//       if (currentQuestionIndex < shuffledQuestions.length - 1) {
//         setCurrentQuestionIndex(prev => prev + 1);
//       } else {
//         setStatus('finished');
//       }
//     }, 1500); // Wait for feedback animation before showing next question
//   }, [currentQuestionIndex, shuffledQuestions.length]);
//
//   const startGame = () => {
//     setStatus('playing');
//   };
//
//   const restartGame = () => {
//     setStatus('not_started');
//   };
//
//   if (status === 'finished') {
//     return (
//       <ScoreScreen
//         score={score}
//         totalQuestions={shuffledQuestions.length}
//         onRestart={restartGame}
//       />
//     );
//   }
//
//   if (status === 'playing' && shuffledQuestions.length > 0) {
//     return (
//        <QuestionCard
//         question={shuffledQuestions[currentQuestionIndex]}
//         onAnswer={handleAnswer}
//         questionNumber={currentQuestionIndex + 1}
//         totalQuestions={shuffledQuestions.length}
//       />
//     );
//   }
//
//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-fade-in">
//       <h2 className="text-3xl font-bold text-slate-800">Ready to Play, {user.name}?</h2>
//       <p className="text-slate-600 mt-2 mb-8">Let's test your sign language knowledge!</p>
//       <button
//         onClick={startGame}
//         className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold text-lg py-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
//       >
//         <PlayIcon className="w-6 h-6" />
//         Start Game
//       </button>
//     </div>
//   );
// };
//
// export default Game;

import React, { useState, useEffect, useCallback } from 'react';
import { User, Question } from '../types';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import ScoreScreen from './ScoreScreen';
import { PlayIcon } from './common/Icons';

interface GameProps {
  user: User;
}

type GameStatus = 'not_started' | 'loading' | 'playing' | 'finished';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Game: React.FC<GameProps> = ({ user }) => {
  const [status, setStatus] = useState<GameStatus>('not_started');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'playing') {
      const loadQuestions = async () => {
        try {
          // setStatus('loading');
          const fetchedQuestions = await questions();
          console.log(fetchedQuestions);
          setShuffledQuestions(shuffleArray(fetchedQuestions));
          setCurrentQuestionIndex(0);
          setScore({ correct: 0, incorrect: 0 });
          // setStatus('playing');
        } catch (err) {
          setError('Failed to load questions. Please try again.');
          setStatus('not_started');
        }
      };

      loadQuestions();
    }
  }, [status]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStatus('finished');
      }
    }, 1500);
  }, [currentQuestionIndex, shuffledQuestions.length]);

  const startGame = () => {
    setStatus('playing');
    setError(null);
  };

  const restartGame = () => {
    setStatus('not_started');
    setError(null);
  };

  if (status === 'loading') {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
          <p className="text-slate-600">Loading questions...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
          <p className="text-red-600">{error}</p>
          <button
              onClick={startGame}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
    );
  }

  if (status === 'finished') {
    return (
        <ScoreScreen
            score={score}
            totalQuestions={shuffledQuestions.length}
            onRestart={restartGame}
        />
    );
  }

  if (status === 'playing' && shuffledQuestions.length > 0) {
    return (
        <QuestionCard
            question={shuffledQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={shuffledQuestions.length}
        />
    );
  }

  return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold text-slate-800">Ready to Play, {user.name}?</h2>
        <p className="text-slate-600 mt-2 mb-8">Let's test your sign language knowledge!</p>
        <button
            onClick={startGame}
            className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold text-lg py-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          <PlayIcon className="w-6 h-6" />
          Start Game
        </button>
      </div>
  );
};

export default Game;
