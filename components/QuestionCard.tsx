import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckIcon, XMarkIcon } from './common/Icons';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === question.answer;
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-slate-100 text-slate-700';
    }
    if (option === question.answer) {
      return 'bg-green-500 text-white transform scale-105';
    }
    if (option === selectedOption && option !== question.answer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white text-slate-700 opacity-60';
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl mx-auto animate-fade-in">
      <div className="mb-4">
        <p className="text-sm font-bold text-indigo-500">Question {questionNumber} of {totalQuestions}</p>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
          <div 
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-2xl font-bold text-slate-800 text-center mb-4">What is the sign for...</p>

      <div className="w-full aspect-video bg-slate-800 rounded-lg overflow-hidden shadow-inner mb-6">
        <video
          key={question.questionVideoUrl}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={question.questionVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg font-bold text-lg border-2 border-transparent transition-all duration-300 ease-in-out flex items-center justify-center gap-3 ${getButtonClass(option)}`}
          >
            {option}
            {isAnswered && option === question.answer && <CheckIcon className="w-6 h-6" />}
            {isAnswered && option === selectedOption && option !== question.answer && <XMarkIcon className="w-6 h-6" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
