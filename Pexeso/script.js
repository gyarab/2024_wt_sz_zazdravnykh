const images = [
  'images/protosig1.jpg',
  'images/protosig2.jpg',
  'images/protosig3.webp',
  'images/protosig4.jpg',
  'images/protosig5.jpg',
  'images/protosig6.jpg',
  'images/protosig7.jpg',
  'images/protosig8.jpg',
  'images/protosig1.jpg',
  'images/protosig2.jpg',
  'images/protosig3.webp',
  'images/protosig4.jpg',
  'images/protosig5.jpg',
  'images/protosig6.jpg',
  'images/protosig7.jpg',
  'images/protosig8.jpg',
  ];
  
  let gameState = {
    board: [],
    firstCard: null,
    secondCard: null,
    score: 0,
  };
  
  const gameBoard = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const resetButton = document.getElementById('reset-button');
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function initializeGame() {
    gameState.board = shuffle([...images]);
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.score = 0;
    scoreDisplay.textContent = gameState.score;
  
    renderBoard();
  }
  
  function renderBoard() {
    gameBoard.innerHTML = '';
    gameState.board = shuffle([...images]); // Перемешиваем изображения
  
    gameState.board.forEach((imagePath, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
  
      // Добавляем невидимое изображение
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = 'Card Image';
      img.classList.add('hidden'); // Скрываем изображение
      card.appendChild(img);
  
      card.addEventListener('click', () => handleCardClick(card, index, img));
      gameBoard.appendChild(card);
    });
  }
  
  function handleCardClick(card, index, img) {
    if (gameState.firstCard && gameState.secondCard) return; // Игнорируем, если 2 карты уже выбраны
  
    if (!gameState.firstCard) {
      gameState.firstCard = { card, index };
      img.classList.remove('hidden'); // Показываем изображение
    } else if (!gameState.secondCard && index !== gameState.firstCard.index) {
      gameState.secondCard = { card, index };
      img.classList.remove('hidden'); // Показываем изображение
  
      checkForMatch(); // Проверяем, совпадают ли карты
    }
  }
  
  function flipCard(card, index) {
    const cardContent = card.querySelector('.card-content');
    cardContent.textContent = gameState.board[index];
    card.classList.add('flipped');
  }
  
  function checkForMatch() {
    const { firstCard, secondCard } = gameState;
  
    const firstImage = firstCard.card.querySelector('img').src;
    const secondImage = secondCard.card.querySelector('img').src;
  
    if (firstImage === secondImage) {
      // Карты совпали
      firstCard.card.classList.add('matched');
      secondCard.card.classList.add('matched');
      gameState.score++;
      scoreDisplay.textContent = gameState.score;
  
      resetTurn();
    } else {
      // Карты не совпали
      setTimeout(() => {
        firstCard.card.querySelector('img').classList.add('hidden');
        secondCard.card.querySelector('img').classList.add('hidden');
        resetTurn();
      }, 1000);
    }
  }
  
  function resetTurn() {
    gameState.firstCard = null;
    gameState.secondCard = null;
  }
  
  function resetCard(card) {
    const cardContent = card.querySelector('.card-content');
    cardContent.textContent = '';
    card.classList.remove('flipped');
  }
  
  resetButton.addEventListener('click', initializeGame);
  
  // Start the game
  initializeGame();
  