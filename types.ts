
export interface User {
  name: string;
}

export interface Question {
  id: string | number;
  questionVideoUrl: string;
  options: string[];
  answer: string;
}

