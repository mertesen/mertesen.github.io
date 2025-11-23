// --- Configuration & State ---

const DEFAULT_MODES = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

let MODES = JSON.parse(localStorage.getItem('flowStateModes')) || DEFAULT_MODES;

let currentMode = 'focus';
let timeLeft = MODES[currentMode];
let totalSeconds = MODES[currentMode];
let isRunning = false;
let timerInterval = null;

// --- DOM Elements ---
const timeLeftEl = document.getElementById('time-left');
const labelEl = document.getElementById('timer-label');
const circle = document.querySelector('.progress-ring__circle');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const taskInput = document.getElementById('task-input');
const historyList = document.getElementById('history-list');
const todayMinsEl = document.getElementById('today-minutes');
const todaySessionsEl = document.getElementById('today-sessions');
const modeBtns = document.querySelectorAll('.mode-btn');
const exportBtn = document.getElementById('btn-export');
const pipBtn = document.getElementById('btn-pip');
const timerCanvas = document.getElementById('timer-canvas');
const timerVideo = document.getElementById('timer-video');
const ctx = timerCanvas.getContext('2d');
let endTime = null;

// Settings Elements
const settingsBtn = document.getElementById('btn-settings');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('btn-save-settings');
const closeSettingsBtn = document.getElementById('btn-close-settings');
const settingInputs = {
    focus: document.getElementById('setting-focus'),
    short: document.getElementById('setting-short'),
    long: document.getElementById('setting-long')
};

// --- SVG Setup ---
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// --- Timer Logic ---
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    if (!endTime) {
        endTime = Date.now() + (timeLeft * 1000);
    } else {
        endTime = Date.now() + (timeLeft * 1000);
    }

    toggleControls(true);
    
    timerInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.ceil((endTime - now) / 1000);
        
        if (remaining >= 0) {
            timeLeft = remaining;
            updateDisplay();
            updateCanvas();
        } else {
            timeLeft = 0;
            updateDisplay();
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    endTime = null;
    toggleControls(false);
}

function resetTimer() {
    pauseTimer();
    timeLeft = MODES[currentMode];
    totalSeconds = MODES[currentMode];
    updateDisplay();
    setProgress(0); 
}

function completeSession() {
    pauseTimer();
    
    if ('speechSynthesis' in window) {
        const text = currentMode === 'focus' ? "Session complete" : "Break is over";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        utterance.pitch = 1;
        utterance.volume = 2;
        window.speechSynthesis.speak(utterance);
    } else {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play().catch(e => console.log("Audio play failed", e));
    }

    // Notification
    if (Notification.permission === "granted") {
        new Notification("FlowState", {
            body: `${currentMode === 'focus' ? 'Focus session complete!' : 'Break is over!'}`
        });
    }

    if (currentMode === 'focus') {
        const taskName = taskInput.value.trim() || "Untitled Focus Session";
        saveSession(taskName, Math.floor(totalSeconds / 60));
    }
    
    setTimeout(() => {
         alert(currentMode === 'focus' ? "Focus Complete! Take a break?" : "Break Over! Ready to focus?");
         resetTimer();
    }, 1000);
}

function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timeLeftEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    
    document.title = `${timeLeftEl.textContent} - FlowState`;

    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    setProgress(100 - progress); 
}

function toggleControls(active) {
    if (active) {
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    } else {
        startBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    }
}

// --- Mode Switching ---
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentMode = btn.dataset.mode;
        timeLeft = MODES[currentMode];
        totalSeconds = MODES[currentMode];
        
        if (currentMode === 'focus') {
            labelEl.innerText = "FOCUS";
            document.body.classList.remove('break-mode');
        } else {
            labelEl.innerText = "RECHARGE";
            document.body.classList.add('break-mode');
        }
        
        resetTimer();
    });
});

// --- Data Management ---
function saveSession(task, duration) {
    const now = new Date();
    
    const session = {
        id: Date.now(),
        date: now.toLocaleDateString(),
        endTimeISO: now.toISOString(), 
        timestamp: now.toLocaleTimeString(),
        task: task,
        duration: duration
    };

    let history = JSON.parse(localStorage.getItem('flowStateHistory')) || [];
    history.unshift(session);
    localStorage.setItem('flowStateHistory', JSON.stringify(history));
    
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('flowStateHistory')) || [];
    const today = new Date().toLocaleDateString();
    
    const todaySessions = history.filter(s => s.date === today);
    const totalMinutes = todaySessions.reduce((acc, curr) => acc + curr.duration, 0);
    
    todayMinsEl.innerText = totalMinutes;
    todaySessionsEl.innerText = todaySessions.length;

    historyList.innerHTML = '';
    
    if (todaySessions.length === 0) {
        historyList.innerHTML = '<div class="empty-state">No sessions completed today.</div>';
        return;
    }

    todaySessions.forEach(session => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <span>${session.task}</span>
            <span class="history-time">${session.duration}m • ${session.timestamp}</span>
        `;
        historyList.appendChild(item);
    });
}

function clearData() {
    if(confirm("Clear all history?")) {
        localStorage.removeItem('flowStateHistory');
        loadHistory();
    }
}

function exportToCSV() {
    const history = JSON.parse(localStorage.getItem('flowStateHistory')) || [];
    
    if (history.length === 0) {
        alert("Nothing to export!");
        return;
    }

    let csvContent = "Date,Task,Duration (min),Start Time,End Time\n";

    history.forEach(session => {
        let endObj;
        if (session.endTimeISO) {
            endObj = new Date(session.endTimeISO);
        } else {
            endObj = new Date(`${session.date} ${session.timestamp}`);
        }

        const startObj = new Date(endObj.getTime() - (session.duration * 60 * 1000));
        const startStr = startObj.toLocaleTimeString();
        const endStr = endObj.toLocaleTimeString();

        const row = [
            session.date,
            `"${session.task}"`, 
            session.duration,
            startStr,
            endStr
        ].join(",");

        csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pomodoro_history_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- Settings Logic ---
function openSettings() {
    settingInputs.focus.value = Math.floor(MODES.focus / 60);
    settingInputs.short.value = Math.floor(MODES.short / 60);
    settingInputs.long.value = Math.floor(MODES.long / 60);
    
    settingsModal.classList.remove('hidden');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function saveSettings() {
    const newFocus = parseInt(settingInputs.focus.value);
    const newShort = parseInt(settingInputs.short.value);
    const newLong = parseInt(settingInputs.long.value);

    if (newFocus > 0 && newShort > 0 && newLong > 0) {
        MODES = {
            focus: newFocus * 60,
            short: newShort * 60,
            long: newLong * 60
        };

        localStorage.setItem('flowStateModes', JSON.stringify(MODES));
        closeSettings();
        
        if (!isRunning) {
            timeLeft = MODES[currentMode];
            totalSeconds = MODES[currentMode];
            updateDisplay();
            setProgress(0);
        }
        alert("Settings Saved!");
    } else {
        alert("Please enter valid minutes.");
    }
}

function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

function updateCanvas() {

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, timerCanvas.width, timerCanvas.height);


    ctx.fillStyle = '#f1f5f9'; // --text-main
    ctx.font = 'bold 80px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';


    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const timeText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;


    ctx.fillText(timeText, 150, 140);

    ctx.font = '20px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8'; // --text-dim
    const statusText = currentMode === 'focus' ? "FOCUS" : "BREAK";
    ctx.fillText(statusText, 150, 190);
}

async function togglePiP() {
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    } else {
        try {
            if (timerVideo.srcObject === null) {
                updateCanvas();
                const stream = timerCanvas.captureStream(30); // 30 FPS
                timerVideo.srcObject = stream;
                await timerVideo.play();
            }
            await timerVideo.requestPictureInPicture();
        } catch (error) {
            console.error("PiP Hatası:", error);
            alert("PiP özelliği bu tarayıcıda desteklenmiyor veya izin verilmedi.");
        }
    }
}



// --- Event Listeners ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
pipBtn.addEventListener('click', togglePiP);
exportBtn.addEventListener('click', exportToCSV);

if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);

document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            isRunning ? pauseTimer() : startTimer();
            break;
        case 'KeyR':
            resetTimer();
            break;
        case 'KeyF':
            document.querySelector('[data-mode="focus"]').click();
            break;
        case 'KeyS':
            document.querySelector('[data-mode="short"]').click();
            break;
        case 'KeyL':
            document.querySelector('[data-mode="long"]').click();
            break;
        case 'KeyT':
            document.querySelector('#btn-pip').click();
            break;
    }
});

window.addEventListener('beforeunload', (e) => {
    if (isRunning) {
        e.preventDefault();
        e.returnValue = '';
    }
});

window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        closeSettings();
    }
});

// --- Initialization ---
function init() {
    loadHistory();
    updateDisplay();
    requestNotificationPermission();
}

init();
