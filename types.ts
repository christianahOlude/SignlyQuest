
export interface User {
  name: string;
}

export interface Question {
  _id: string;
  questionVideoUrl: string;
  options: Option[];
  answer: Option;
}

export interface Option {
  _id: string;
  text: string;
  isCorrect?: boolean;
}

