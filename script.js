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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const sortableList = document.getElementById('sortable-list');
const shuffledOrder = shuffleArray([...sqlOrder]);

shuffledOrder.forEach(item => {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  listItem.draggable = true;
  listItem.addEventListener('dragstart', () => listItem.classList.add('grabbing'));
  listItem.addEventListener('dragend', () => listItem.classList.remove('grabbing'));
  sortableList.appendChild(listItem);
});

sortableList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector('.grabbing');
  const afterElement = getDragAfterElement(sortableList, e.clientY);
  if (afterElement == null) {
      sortableList.appendChild(draggingItem);
  } else {
      sortableList.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.grabbing)')];
  return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
      } else {
          return closest;
      }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkOrder() {
  const listItems = [...sortableList.querySelectorAll('li')];
  for (let i = 0; i < sqlOrder.length; i++) {
      if (listItems[i].textContent !== sqlOrder[i]) {
          alert("Incorrect order! Try again.");
          return;
      }
  }
  alert("Correct order! Well done.");
}

// Add these lines at the top of your existing JavaScript file
const correctOrderList = document.getElementById('correct-order');

sqlOrder.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    correctOrderList.appendChild(listItem);
});

function toggleCorrectOrder() {
    correctOrderList.classList.toggle('hidden');
}
