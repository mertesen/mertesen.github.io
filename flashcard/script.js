        
let currentMode = 'term-first';
let selectedCategories = ['all'];
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
      const matchCategory = selectedCategories.includes('all') || selectedCategories.includes(card.category);
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

/* --- UI UPDATES & DEEP DIVE --- */

function displayCard(card) {
    if (!card) return;
    
    // [Existing Logic Preservation]
    if (currentCard && currentCard !== card) {
        previousCard = currentCard;
        localStorage.setItem('previousCard', JSON.stringify(previousCard));
    }
    localStorage.setItem('lastCard', card.term);
    currentCard = card;
    
    // Update Flashcard UI
    const flashcardElement = document.getElementById('flashcard');
    const isTermFirst = currentMode === 'term-first';
    
    flashcardElement.classList.remove('flipped');
    // Determine Content
    const frontText = isTermFirst ? card.term : card.definition;
    const backText = isTermFirst ? card.definition : card.term;
    
    // 1. Setup Front Content
    let frontHTML = '';
    if (isTermFirst) {
        frontHTML = `<div class="flashcard-term">${frontText}</div>`;
    } else {
        // Smart sizing for Definition on front
        const len = frontText.length;
        let sizeClass = '';
        if (len > 250) sizeClass = 'very-long-text';
        else if (len > 120) sizeClass = 'long-text';
        
        frontHTML = `<div class="flashcard-definition ${sizeClass}">${frontText}</div>`;
    }

    // 2. Setup Back Content
    let backHTML = '';
    if (isTermFirst) {
        // Smart sizing for Definition on back
        const len = backText.length;
        let sizeClass = '';
        if (len > 250) sizeClass = 'very-long-text';
        else if (len > 120) sizeClass = 'long-text';
        
        backHTML = `<div class="flashcard-definition ${sizeClass}">${backText}</div>`;
    } else {
        // Term is on back - Make it huge
        backHTML = `<div class="flashcard-term mode-def-first">${backText}</div>`;
    }
    
    // Render
    document.getElementById('front-content').innerHTML = frontHTML;
    document.getElementById('back-content').innerHTML = backHTML;
    // Set Tags
    document.getElementById('front-category').textContent = card.category;
    document.getElementById('back-category').textContent = card.category;

    // --- NEW: GENERATE DEEP DIVE BUTTONS ---
    const ddContainer = document.getElementById('deep-dive-links');
    if (ddContainer) {
        const query = encodeURIComponent(card.term + " software engineering");
        const ytQuery = encodeURIComponent(card.term + " explained");
        
        ddContainer.innerHTML = `
            <a href="https://www.google.com/search?q=${query}" target="_blank" class="dd-btn" onclick="event.stopPropagation()">
                🔍 Google
            </a>
            <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" class="dd-btn" onclick="event.stopPropagation()">
                📺 YouTube
            </a>
             <a href="https://stackoverflow.com/search?q=${query}" target="_blank" class="dd-btn" onclick="event.stopPropagation()">
                💻 StackOverflow
            </a>
        `;
    }
    
    updateStats();
}

function flipCard() {
    const flashcardElement = document.getElementById('flashcard');
    
    // Only flip if not clicking a link
    flashcardElement.classList.add('flip-animation');
    flashcardElement.classList.toggle('flipped');
    
    setTimeout(() => {
        flashcardElement.classList.remove('flip-animation');
    }, 600);

    // Toggle Navigation Controls
    const isFlipped = flashcardElement.classList.contains('flipped');
    const standardNav = document.getElementById('standard-nav');
    const leitnerNav = document.getElementById('leitner-nav');

    if (isFlipped) {
        // Show "Got it / Forgot it"
        standardNav.style.display = 'none';
        leitnerNav.style.display = 'flex';
        leitnerNav.style.justifyContent = 'center';
    } else {
        resetNav();
    }
}

// Overwrite nextCard to use Smart System
function nextCard() {
    const newCard = getSmartCard(); // Uses Leitner weights now
    if (newCard) {
        displayCard(newCard);
        resetNav(); // Reset buttons to "Flip" state
    }
}

function nextCardWithAnimation() {
    const cardEl = document.getElementById('flashcard');
    cardEl.classList.add('card-slide-out');
    setTimeout(() => {
        nextCard(); // Calls our new smart nextCard
        cardEl.classList.remove('card-slide-out');
        cardEl.classList.add('card-slide-in');
        setTimeout(() => {
            cardEl.classList.remove('card-slide-in');
        }, 400);
    }, 400);
}

// Handle Rating (Got it / Forgot it)
function handleLeitnerRating(knewIt) {
    if (!currentCard) return;

    const progress = getLeitnerProgress();
    const currentBox = progress[currentCard.term] || 0;

    if (knewIt) {
        // Move up a box
        progress[currentCard.term] = currentBox + 1;
    } else {
        // Reset to Box 0
        progress[currentCard.term] = 0;
    }

    saveLeitnerProgress(progress);

    logActivity();
    
    // Move to next card automatically
    nextCardWithAnimation();
}

function resetNav() {
    document.getElementById('standard-nav').style.display = 'flex';
    document.getElementById('leitner-nav').style.display = 'none';
}

/* --- DATA EXPORT / IMPORT FEATURES --- */

function exportProgress() {
    // 1. Get data from LocalStorage
    const progress = localStorage.getItem('leitnerProgress');
    
    if (!progress || progress === '{}') {
        alert('No progress data found to export yet! Start studying first.');
        return;
    }

    // 2. Create a Blob (file-like object)
    const dataStr = JSON.stringify(JSON.parse(progress), null, 2); // Pretty print
    const blob = new Blob([dataStr], { type: "application/json" });
    
    // 3. Create a temporary link and trigger download
    const url = URL.createObjectURL(blob);
    const exportLink = document.createElement('a');
    exportLink.href = url;
    exportLink.download = `flashcard_progress_${new Date().toISOString().slice(0,10)}.json`;
    
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
    
    // 4. Clean up
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function triggerImport() {
    // Trigger the hidden file input
    document.getElementById('import-file').click();
}

function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            // 1. Parse the file
            const content = e.target.result;
            const parsedData = JSON.parse(content);
            
            // 2. Basic Validation (Check if it looks like a progress object)
            if (typeof parsedData !== 'object') {
                throw new Error('Invalid JSON format');
            }

            // 3. Save to LocalStorage
            localStorage.setItem('leitnerProgress', JSON.stringify(parsedData));
            
            // 4. Feedback & Refresh
            alert('✅ Progress loaded successfully!');
            
            // Reset the file input so you can load the same file again if needed
            event.target.value = ''; 
            
            // Refresh the stats immediately
            updateStats();
            
        } catch (error) {
            alert('❌ Error loading file: Invalid JSON or corrupt data.');
            console.error(error);
        }
    };
    
    reader.readAsText(file);
}

/* --- ACTIVITY LOGGING & HEATMAP --- */

function getActivityHistory() {
    const saved = localStorage.getItem('activityHistory');
    return saved ? JSON.parse(saved) : {};
}

function saveActivityHistory(history) {
    localStorage.setItem('activityHistory', JSON.stringify(history));
}

function logActivity() {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);
    const history = getActivityHistory();

    // Increment count for today
    history[today] = (history[today] || 0) + 1;
    
    saveActivityHistory(history);
    renderHeatmap(); // Re-render the heatmap instantly
}


function renderHeatmap() {
    const heatmapContainer = document.getElementById('activity-heatmap');
    if (!heatmapContainer) return;

    const history = getActivityHistory();
    const days = 365;
    const today = new Date();
    
    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';
    
    // Calculate and render cells for the last 365 days
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().slice(0, 10);
        const count = history[dateString] || 0;
        
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        cell.setAttribute('title', `${dateString}: ${count} reviews`);
        
        // Determine color level (0 to 4)
        let level = 0;
        if (count > 0 && count <= 5) level = 1;
        else if (count > 5 && count <= 15) level = 2;
        else if (count > 15 && count <= 30) level = 3;
        else if (count > 30) level = 4;
        
        cell.classList.add(`level-${level}`);
        grid.appendChild(cell);
    }

    heatmapContainer.innerHTML = ''; // Clear the container
    heatmapContainer.appendChild(grid);
}


// Distraction-free mode functions
function enterDistractionFreeMode() {
    document.getElementById('distraction-free-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Copy current card to distraction-free mode
    if (currentCard) {
        displayDistractionFreeCard(currentCard);
    }

    applyModeChangeAnimation();
}
function exitDistractionFreeMode() {
    document.getElementById('distraction-free-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';

    applyModeChangeAnimation();

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
function applyModeChangeAnimation() {
    const container = document.getElementById("flashcard-container");
    container.classList.remove("mode-change");
    void container.offsetWidth; // reflow (animation reset)
    container.classList.add("mode-change");
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
    // If we were in quiz mode and switching out, reset UI
    if (currentMode === 'quiz' && mode !== 'quiz') {
        exitQuizMode();
    }

    currentMode = mode;
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Redisplay current card with new mode
    if (currentCard) {
        displayCard(currentCard);
    }
}

function filterCategory(category) {
    if (category === 'all' ) {
        selectedCategories = ['all'];
    } else {
        // Remove 'all' if selecting specific categories
        selectedCategories = selectedCategories.filter(cat => cat !== 'all');

        if (selectedCategories.includes(category)) {
            // Unselect category
            selectedCategories = selectedCategories.filter(cat => cat !== category);
        } else {
            // Add category
            selectedCategories.push(category);
        }

        // If none selected, default back to 'all'
        if (selectedCategories.length === 0) {
            selectedCategories = ['all'];
        }
    }
    const newCard = getRandomCard();
    if (newCard) {
        displayCard(newCard);
    }
    updateCategoryButtons();
    updateStats();
}

function updateCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        const category = button.textContent.trim();
        if (selectedCategories.includes(category) || (category === 'All' && selectedCategories.includes('all'))) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
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
        selectedCategories.includes('all') ? 'All Categories' : selectedCategories;
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

/* --- GLOBAL SEARCH LOGIC --- */

function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    
    if (overlay.style.display === 'none') {
        overlay.style.display = 'flex';
        input.value = '';
        input.focus();
        handleSearch(); // Show all initially
    } else {
        overlay.style.display = 'none';
    }
}

function closeSearch(event) {
    if (event.target.id === 'search-overlay') {
        toggleSearch();
    }
}

function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    // Filter cards based on term OR definition
    const results = flashcards.filter(card => 
        card.term.toLowerCase().includes(query) || 
        card.definition.toLowerCase().includes(query)
    );

    results.forEach(card => {
        const div = document.createElement('div');
        div.className = 'search-item';
        div.innerHTML = `
            <span class="search-item-term">${card.term}</span>
            <span class="search-item-cat">${card.category}</span>
        `;
        div.onclick = () => {
            // If we are in quiz mode, exit it first
            if (currentMode === 'quiz') {
                exitQuizMode();
            }
            displayCard(card);
            toggleSearch();
        };
        resultsContainer.appendChild(div);
    });

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div style="padding:10px; opacity:0.7">No results found</div>';
    }
}

// Keyboard Shortcut for Search (Cmd+K or Ctrl+K)
document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
    if (e.key === 'Escape') {
        document.getElementById('search-overlay').style.display = 'none';
    }
});


/* --- QUIZ MODE LOGIC --- */

function startQuizMode() {
    currentMode = 'quiz';
    
    // Toggle UI Visibility
    document.querySelector('.flashcard-container').style.display = 'none';
    document.querySelector('.navigation').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'flex';
    
    // Update active button state
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    // Note: You might want to add an ID to the Quiz button to target it easily, 
    // otherwise clicking it won't visually highlight properly without an ID.
    
    nextQuizQuestion();
}

function exitQuizMode() {
    currentMode = 'term-first'; // Default back
    document.querySelector('.flashcard-container').style.display = 'flex';
    document.querySelector('.navigation').style.display = 'flex';
    document.getElementById('quiz-container').style.display = 'none';
    
    // Reshow the regular card
    if (currentCard) displayCard(currentCard);
}

function nextQuizQuestion() {
    // Reset UI
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-next-btn').style.display = 'none';
    
    // Get a random card from CURRENT FILTERS (so you can quiz specific categories)
    const questionCard = getRandomCard();
    if (!questionCard) return;
    
    currentCard = questionCard; // Track it
    
    // Display Question
    document.getElementById('quiz-category').textContent = questionCard.category;
    document.getElementById('quiz-question').textContent = questionCard.definition; // We show definition, ask for term
    
    // Generate Options (1 Correct + 3 Wrong)
    let options = [questionCard];
    
    // Try to find distractors from SAME category first for difficulty
    let sameCatCards = flashcards.filter(c => c.category === questionCard.category && c.term !== questionCard.term);
    
    // If not enough same-category cards, fallback to all cards
    let pool = sameCatCards.length >= 3 ? sameCatCards : flashcards.filter(c => c.term !== questionCard.term);
    
    // Shuffle pool and pick 3
    pool.sort(() => 0.5 - Math.random());
    options.push(...pool.slice(0, 3));
    
    // Shuffle options so correct answer isn't always first
    options.sort(() => 0.5 - Math.random());
    
    // Render Buttons
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'quiz-btn';
        btn.textContent = opt.term;
        btn.onclick = () => checkAnswer(opt, questionCard, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btnElement) {
    // Prevent multiple clicks
    if (document.getElementById('quiz-next-btn').style.display === 'block') return;
    
    const feedback = document.getElementById('quiz-feedback');
    const allBtns = document.querySelectorAll('.quiz-btn');
    
    if (selected.term === correct.term) {
        // Correct!
        btnElement.classList.add('correct');
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "#4CAF50";
    } else {
        // Wrong!
        btnElement.classList.add('wrong');
        feedback.textContent = `❌ Incorrect. The answer was: ${correct.term}`;
        feedback.style.color = "#F44336";
        
        // Highlight the correct one
        allBtns.forEach(btn => {
            if (btn.textContent === correct.term) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Show Next Button
    document.getElementById('quiz-next-btn').style.display = 'inline-block';
}

/* --- LEITNER SYSTEM & SMART NAVIGATION --- */

// Initialize Leitner boxes in LocalStorage if missing
function getLeitnerProgress() {
    const saved = localStorage.getItem('leitnerProgress');
    return saved ? JSON.parse(saved) : {};
}

function saveLeitnerProgress(progress) {
    localStorage.setItem('leitnerProgress', JSON.stringify(progress));
}

// Algorithm to pick a card based on user knowledge
function getSmartCard() {
    const progress = getLeitnerProgress();
    const pool = getFilteredCards();
    if (pool.length === 0) return null;

    // Create weighted pool
    // Box 0 (New/Forgotten): Weight 10
    // Box 1: Weight 5
    // Box 2: Weight 3
    // Box 3+: Weight 1
    let weightedPool = [];

    pool.forEach(card => {
        const box = progress[card.term] || 0;
        let weight = 10;
        if (box === 1) weight = 5;
        else if (box === 2) weight = 3;
        else if (box >= 3) weight = 1;

        // Add card to pool 'weight' times
        for (let i = 0; i < weight; i++) {
            weightedPool.push(card);
        }
    });

    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    return weightedPool[randomIndex];
}



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
    renderHeatmap();
}

init();
