        
let currentMode = 'term-first';
let currentCategory = 'all';
let currentDifficulty = 'all';
let currentFrequency = 'all';
let currentCard = null;
let previousCard = null;
let filteredCards = [];
let viewedCards = new Set();
let cardHistory = [];
        
function getFilteredCards() {
    return flashcards.filter(card => {
      const matchCategory = currentCategory === "all" || card.category === currentCategory;
      const matchDifficulty = currentDifficulty === "all" || card.difficulty === currentDifficulty;
      const matchUsage = currentFrequency === "all" || card.usageFrequency === currentFrequency;
      return matchCategory && matchDifficulty && matchUsage;
    });
}
function getRandomCard() {
    filteredCards = getFilteredCards();
    if (filteredCards.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    return filteredCards[randomIndex];
}
function displayCard(card) {
    if (!card) return;
    if (currentCard && currentCard !== card) {
        previousCard = currentCard;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
    }
    localStorage.setItem('lastCard', card.term);
    currentCard = card;
    const flashcardElement = document.getElementById('flashcard');
    const isTermFirst = currentMode === 'term-first';
    
    // Reset flip state
    flashcardElement.classList.remove('flipped');
    
    // Set content based on mode
    const frontContent = isTermFirst ? card.term : card.definition;
    const backContent = isTermFirst ? card.definition : card.term;
    const frontClass = isTermFirst ? 'flashcard-term' : 'flashcard-definition';
    const backClass = isTermFirst ? 'flashcard-definition' : 'flashcard-term';
    
    document.getElementById('front-content').innerHTML = `<div class="${frontClass}">${frontContent}</div>`;
    document.getElementById('back-content').innerHTML = `<div class="${backClass}">${backContent}</div>`;
    document.getElementById('front-category').textContent = card.category;
    document.getElementById('back-category').textContent = card.category;
    document.getElementById('front-difficulty').textContent = card.difficulty;
    document.getElementById('back-difficulty').textContent = card.difficulty;
    document.getElementById('front-frequency').textContent = card.usageFrequency;
    document.getElementById('back-frequency').textContent = card.usageFrequency;
    
    // Add to viewed cards
    viewedCards.add(card.term);
    cardHistory.push(card.term);
    
    updateStats();
}
function flipCard() {
    const flashcardElement = document.getElementById('flashcard');
    flashcardElement.classList.add('flip-animation');
    flashcardElement.classList.toggle('flipped');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        flashcardElement.classList.remove('flip-animation');
    }, 600);
}
function nextCard() {
    const newCard = getRandomCard();
    if (newCard) {
        displayCard(newCard);
    }
}
function nextCardWithAnimation() {
    const cardEl = document.getElementById('flashcard');
    // Animate current card out
    cardEl.classList.add('card-slide-out');
    // Wait for animation to finish before replacing content
    setTimeout(() => {
        // Load new card
        const newCard = getRandomCard();
        if (newCard) {
            displayCard(newCard);
        }
    
        // Remove old animation class and trigger slide-in
        cardEl.classList.remove('card-slide-out');
        cardEl.classList.add('card-slide-in');
    
        // Clean up slide-in class after it finishes
        setTimeout(() => {
            cardEl.classList.remove('card-slide-in');
        }, 400);
    }, 400);
}
// Distraction-free mode functions
function enterDistractionFreeMode() {
    document.getElementById('distraction-free-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Copy current card to distraction-free mode
    if (currentCard) {
        displayDistractionFreeCard(currentCard);
    }
}
function exitDistractionFreeMode() {
    document.getElementById('distraction-free-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function displayDistractionFreeCard(card) {
    if (!card) return;
    // Store current card as previous before switching
    if (currentCard && currentCard !== card) {
        previousCard = currentCard;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
    }
    localStorage.setItem('lastCard', card.term);
    const isTermFirst = currentMode === 'term-first';
    const frontContent = isTermFirst ? card.term : card.definition;
    const backContent = isTermFirst ? card.definition : card.term;
    const frontClass = isTermFirst ? 'flashcard-term' : 'flashcard-definition';
    const backClass = isTermFirst ? 'flashcard-definition' : 'flashcard-term';
    
    // Reset flip state
    document.getElementById('df-flashcard').classList.remove('flipped');
    
    document.getElementById('df-front-content').innerHTML = `<div class="${frontClass}">${frontContent}</div>`;
    document.getElementById('df-back-content').innerHTML = `<div class="${backClass}">${backContent}</div>`;
    document.getElementById('df-front-category').textContent = card.category;
    document.getElementById('df-back-category').textContent = card.category;
}
// New function to go to previous card
function previousCardFunction() {
    if (previousCard) {
        // Temporarily store current as next previous
        const temp = currentCard;
        displayCard(previousCard);
        previousCard = temp;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
    }
}
// New function to go to previous card with animation
function previousCardWithAnimation() {
    if (!previousCard) return;
    const cardEl = document.getElementById('flashcard');
    // Animate current card out (slide to right)
    cardEl.classList.add('card-slide-out');
    setTimeout(() => {
        // Load previous card
        const temp = currentCard;
        displayCard(previousCard);
        previousCard = temp;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
        // Remove old animation class and trigger slide-in
        cardEl.classList.remove('card-slide-out');
        cardEl.classList.add('card-slide-in');
        // Clean up slide-in class after it finishes
        setTimeout(() => {
            cardEl.classList.remove('card-slide-in');
        }, 400);
    }, 400);
}
// New function for distraction-free mode previous card
function previousDistractionFreeCard() {
    if (previousCard) {
        // Temporarily store current as next previous
        const temp = currentCard;
        currentCard = previousCard;
        displayDistractionFreeCard(previousCard);
        previousCard = temp;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
        // Also update the main card for when user exits focus mode
        displayCard(currentCard);
    }
}
// New function for distraction-free mode previous card with animation
function previousDistractionFreeCardWithAnimation() {
    if (!previousCard) return;
    const cardEl = document.getElementById('df-flashcard');
    // Animate current card out
    cardEl.classList.add('card-slide-out');
    setTimeout(() => {
        // Load previous card
        const temp = currentCard;
        currentCard = previousCard;
        displayDistractionFreeCard(previousCard);
        previousCard = temp;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
        // Also update the main card for when user exits focus mode
        displayCard(currentCard);
        // Remove old animation class and trigger slide-in
        cardEl.classList.remove('card-slide-out');
        cardEl.classList.add('card-slide-in');
        // Clean up slide-in class after it finishes
        setTimeout(() => {
            cardEl.classList.remove('card-slide-in');
        }, 400);
    }, 400);
}
function flipDistractionFreeCard() {
    const flashcardElement = document.getElementById('df-flashcard');
    flashcardElement.classList.add('flip-animation');
    flashcardElement.classList.toggle('flipped');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        flashcardElement.classList.remove('flip-animation');
    }, 600);
}
function nextDistractionFreeCard() {
    const newCard = getRandomCard();
    if (newCard) {
        currentCard = newCard;
        displayDistractionFreeCard(newCard);
        
        // Also update the main card for when user exits focus mode
        displayCard(newCard);
    }
}
function nextDistractionFreeCardWithAnimation() {
    const cardEl = document.getElementById('df-flashcard');
    // Animate current card out
    cardEl.classList.add('card-slide-out');
    // Wait for animation to finish before replacing content
    setTimeout(() => {
        // Load new card
        const newCard = getRandomCard();
        if (newCard) {
            displayDistractionFreeCard(newCard);
            // Also update the main card for when user exits focus mode
            displayCard(newCard);
        }
    
        // Remove old animation class and trigger slide-in
        cardEl.classList.remove('card-slide-out');
        cardEl.classList.add('card-slide-in');
    
        // Clean up slide-in class after it finishes
        setTimeout(() => {
            cardEl.classList.remove('card-slide-in');
        }, 400);
    }, 400);
}
function setTheme(theme, event) {
    // Update data-theme attribute on the <body>
    document.body.setAttribute('data-theme', theme);
    
    // Remove active class from all theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    event.target.classList.add('active');

    // Redisplay current card with new theme
    if (currentCard) {
        displayCard(currentCard);
    }
}
function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Redisplay current card with new mode
    if (currentCard) {
        displayCard(currentCard);
    }
}

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Reset viewed cards for new category
    viewedCards.clear();
    cardHistory = [];
    
    // Load first card from new category
    const newCard = getRandomCard();
    if (newCard) {
        displayCard(newCard);
    }
    
    updateStats();
}

function filterDifficulty(difficulty) {
    currentDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Reset viewed cards for new category
    viewedCards.clear();
    cardHistory = [];
    
    // Load first card from new category
    const newCard = getRandomCard();
    if (newCard) {
        displayCard(newCard);
    }
    
    updateStats();
}

function filterFrequency(frequency) {
    currentFrequency = frequency;
    document.querySelectorAll('.frequency-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Reset viewed cards for new category
    viewedCards.clear();
    cardHistory = [];
    
    // Load first card from new category
    const newCard = getRandomCard();
    if (newCard) {
        displayCard(newCard);
    }
    
    updateStats();
}
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('open');
}
function updateStats() {
    const categoryTotal = getFilteredCards().length;
    const viewedCount = viewedCards.size;
    const progress = categoryTotal > 0 ? (viewedCount / categoryTotal) * 100 : 0;
    
    document.getElementById('current-category-display').textContent = 
        currentCategory === 'all' ? 'All Categories' : currentCategory;
    document.getElementById('current-difficulty-display').textContent = 
        currentDifficulty === 'all' ? 'All Difficulties' : currentDifficulty;
    document.getElementById('current-frequency-display').textContent = 
        currentFrequency === 'all' ? 'All Frequencies' : currentFrequency;
    document.getElementById('category-total').textContent = categoryTotal;
    document.getElementById('viewed-count').textContent = viewedCount;
    document.getElementById('current-card-number').textContent = cardHistory.length;
    document.getElementById('progress-fill').style.width = Math.min(progress, 100) + '%';
}
// Add click event to card for flipping
document.getElementById('flashcard').addEventListener('click', flipCard);

// Add click event to distraction-free card for flipping
document.getElementById('df-flashcard').addEventListener('click',flipDistractionFreeCard);
// Keyboard shortcuts for distraction-free mode
document.addEventListener('keydown', function(e) {
    const dfOverlay = document.getElementById('distraction-free-overlay');
    if (dfOverlay.style.display === 'flex') {
        if (e.key === 'Escape') {
            exitDistractionFreeMode();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            flipDistractionFreeCard();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
            nextDistractionFreeCard();
        } else if (e.key === 'ArrowLeft') {
            previousDistractionFreeCardWithAnimation();
        }
    }
});

document.addEventListener('click', (e) => {
    const panel = document.getElementById('settings-panel');
    const toggleButton = e.target.closest('button[onclick="toggleSettings()"]');
    if (!panel.contains(e.target) && !toggleButton && panel.classList.contains('open')) {
        panel.classList.remove('open');
    }
});

// Enhanced keyboard shortcuts for normal mode
document.addEventListener('keydown', e => {
    const dfOverlay = document.getElementById('distraction-free-overlay');
    if (dfOverlay.style.display !== 'flex') {
        if (e.key === 'ArrowRight') nextCard();
        else if (e.key === 'ArrowLeft') previousCardWithAnimation();
        else if (e.key === ' ') flipCard();
    }
});

// On load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
});

function setTheme(theme, event) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save to localStorage

    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    if (currentCard) displayCard(currentCard);
}

// Click navigation in distraction-free mode
document.getElementById('distraction-free-overlay').addEventListener('click', function(e) {
    const flashcard = document.getElementById('df-flashcard');
    const controls = document.querySelector('.distraction-free-controls');
    if (flashcard.contains(e.target) || controls.contains(e.target)) return;

    const x = e.clientX;
    const screenWidth = window.innerWidth;

    if (x < screenWidth / 2) {
        previousDistractionFreeCardWithAnimation();
    } else {
        nextDistractionFreeCardWithAnimation();
    }
});

function init() {
    // Load previous card from localStorage
    const savedPreviousCard = localStorage.getItem('previousCard');
    if (savedPreviousCard) {
        try {
            previousCard = JSON.parse(savedPreviousCard);
        } catch (e) {
            console.log('Error parsing previous card from localStorage');
        }
    }
    const savedTerm = localStorage.getItem('lastCard');
    if (savedTerm) {
        const savedCard = flashcards.find(card => card.term === savedTerm);
        if (savedCard) displayCard(savedCard);
    } else {
        const firstCard = getRandomCard();
        if (firstCard) {
            displayCard(firstCard);
        }
    }
}

init();