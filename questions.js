const sqlOrder = [
  "FROM", 
  "JOIN",
  "WHERE",
  "GROUP BY",
  "HAVING",
  "SELECT",
  "DISTINCT",
  "ORDER BY",
  "LIMIT / OFFSET"
];

const questionsContainer = document.getElementById('questions-container');
const totalQuestions = 5; // You can change this to your preferred number of questions

const generatedQuestions = new Set();

function generateQuestion() {
  let index1, index2;

  do {
      index1 = Math.floor(Math.random() * sqlOrder.length);
      index2 = Math.floor(Math.random() * sqlOrder.length);
  } while (index1 === index2 || generatedQuestions.has(`${index1}-${index2}`));

  generatedQuestions.add(`${index1}-${index2}`);

  const questionDiv = document.createElement('div');
  questionDiv.className = 'questions';

  const questionLabel = document.createElement('label');
  questionLabel.className = 'question';
  questionLabel.textContent = `${sqlOrder[index1]} > ${sqlOrder[index2]}?`;

  const answerGroup = document.createElement('div');
  answerGroup.className = 'answer-group';

  const trueInput = document.createElement('input');
  trueInput.type = 'radio';
  trueInput.name = `question-${index1}-${index2}`;
  trueInput.value = 'true';
  trueInput.className = 'answer';

  const falseInput = document.createElement('input');
  falseInput.type = 'radio';
  falseInput.name = `question-${index1}-${index2}`;
  falseInput.value = 'false';
  falseInput.className = 'answer';

  answerGroup.appendChild(document.createTextNode('True'));
  answerGroup.appendChild(trueInput);
  answerGroup.appendChild(document.createTextNode('False'));
  answerGroup.appendChild(falseInput);

  questionDiv.appendChild(questionLabel);
  questionDiv.appendChild(answerGroup);

  questionDiv.dataset.correctAnswer = index1 < index2 ? 'true' : 'false';

  return questionDiv;
}

for (let i = 0; i < totalQuestions; i++) {
  questionsContainer.appendChild(generateQuestion());
}

function checkAnswers() {
  const questions = document.querySelectorAll('.questions');
  let correctCount = 0;

  questions.forEach(question => {
      const selectedAnswer = question.querySelector('input.answer:checked');
      if (selectedAnswer && selectedAnswer.value === question.dataset.correctAnswer) {
          correctCount++;
      }
  });

  alert(`You got ${correctCount} out of ${totalQuestions} correct!`);
}
