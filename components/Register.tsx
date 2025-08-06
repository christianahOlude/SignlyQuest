
import React, { useState } from 'react';
import { HandWaveIcon } from './common/Icons';

interface RegisterProps {
  onRegister: (name: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRegister(name.trim());
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-fade-in-up">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-4xl font-black text-slate-800 mr-3">Welcome to Signly Quest!</h2>
        <HandWaveIcon className="w-12 h-12 text-yellow-400" />
      </div>
      <p className="text-slate-600 mb-8">Let's get started on your sign language adventure. What should we call you?</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          aria-label="Your Name"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full mt-6 bg-indigo-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          Start Learning
        </button>
      </form>
    </div>
  );
};

export default Register;
