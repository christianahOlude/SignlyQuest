// import { Question } from '../types';
//
// export const questions: Question[] = [
//     async function fetchQuestions() {
//         try {
//             const response = await fetch('http://localhost:5000/api/questions');
//             const questions = await response.json();
//             displayQuestions(questions);
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//         }
//     }
//
// // Function to display questions
//     function displayQuestions(questions) {
//         const questionsContainer = document.getElementById('questions-container');
//         questions.forEach(question => {
//             const questionElement = document.createElement('div');
//             questionElement.innerHTML = `
//             <h3>${question.question}</h3>
//             <ul>
//                 ${question.options.map(option => `<li>${option}</li>`).join('')}
//             </ul>
//         `;
//             questionsContainer.appendChild(questionElement);
//         });
//     }
//     fetchQuestions();
// ];

export const fetchQuestions = () => {
    try {
        const response = await axios.get('http://localhost:3000/api/questions');
    }catch (e) {

    }
}
