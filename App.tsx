
import React from 'react';
import { User } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Register from './components/Register';
import Game from './components/Game';

const App: React.FC = () => {
  const [user, setUser] = useLocalStorage<User | null>('sign-quest-user', null);

  const handleRegister = (name: string) => {
    setUser({ name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen w-full flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-indigo-600">Sign Quest</h1>
        {user && (
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Reset User
          </button>
        )}
      </header>
      
      <main className="w-full max-w-2xl">
        {user ? <Game user={user} /> : <Register onRegister={handleRegister} />}
      </main>
    </div>
  );
};

export default App;
