const modeBtn = document.getElementById('modeToggle');
const themeBtn = document.getElementById('themeToggle');
const container = document.getElementById('firework-container');

let currentMode = 'fireworks';
let currentThemeIndex = 0;

const sounds = {
    launch: new Audio('./sounds/launch.mp3'),
    boom: new Audio('./sounds/boom.mp3'),
    confettiwithkids: new Audio('./sounds/confettiwithkids.mp3'),
    confetti: new Audio('./sounds/confetti.mp3')
};

Object.values(sounds).forEach(s => {
    s.load();
    s.volume = 0.5;
});


const themes = [
    { name: "Neon Night 🌙", colors: ['#ff00ff', '#00ffff', '#ffff00', '#7000ff'], neon:'#ff00ff' },
    { name: "Golden Sunset 🌅", colors: ['#ffcc00', '#ff6600', '#ff0033', '#ffffff'], neon: '#ffcc00' },
    { name: "Ocean Breeze 🌊", colors: ['#00d2ff', '#3a7bd5', '#ffffff', '#00ffcc'], neon: '#00d2ff' },
    { name: "Cyberpunk 🤖", colors: ['#f50057', '#00e5ff', '#ffeb3b', '#00ff00'], neon:'#f50057'  }
];

const fw = new Fireworks.Fireworks(container, {
    autoresize: true,
    opacity: 0.5,
    acceleration: 1.05,
    friction: 0.97,
    gravity: 1.5,
    particles: 60,
    explosion: 6
});

modeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentMode = currentMode === 'fireworks' ? 'confetti' : 'fireworks';
    modeBtn.innerText = `Mode: ${currentMode === 'fireworks' ? 'Fireworks 🎆' : 'Confetti 🎊'}`;
});

themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    themeBtn.innerText = `Theme: ${themes[currentThemeIndex].name}`;
});

window.addEventListener('click', (e) => {
    const theme = themes[currentThemeIndex];
    const x = e.clientX;
    const y = e.clientY;

    if (currentMode === 'confetti') {
        if (Math.random() > 0.2) {
            playSFX('confetti');
        } else {
            playSFX('confettiwithkids');
        }
        launchRandomConfetti(x, y, theme.colors);
    } else {
        launchThemedFirework(x, y, theme.colors);
    }
    triggerNeon();
});

function playSFX(type) {
    const sfx = sounds[type].cloneNode();
    sfx.volume = 0.4;
    sfx.play();
}

function launchRandomConfetti(x, y, colors) {
    const shapes = ['circle', 'square', 'star'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const isExplosion = Math.random() > 0.5;
    const spread = isExplosion ? 360 : 70;
    const velocity = isExplosion ? 40 : 60;

    confetti({
        particleCount: 80,
        spread: spread,
        startVelocity: velocity,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: colors,
        shapes: [randomShape],
        scalar: Math.random() * 1 + 0.5
    });
}

function launchThemedFirework(x, y, colors) {
    playSFX('launch');

    const travelTime = 600; // 0.6 seconds

    setTimeout(() => {
        playSFX('boom');

        fw.updateOptions({ colors: colors });
        fw.launch(1, { x, y });
    }, travelTime);
}

function getMessageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg'); 
    
    if (msg) {
        document.getElementById('dynamic-text').innerText = msg;
    }
}

const textElement = document.getElementById('dynamic-text');

function triggerNeon() {
    const currentTheme = themes[currentThemeIndex];
    textElement.style.setProperty('--neon-color', currentTheme.neon);
    textElement.classList.add('neon-hit');

    if (!textElement.innerText) return;

    textElement.classList.remove('neon-hit');
    
    void textElement.offsetWidth;

    textElement.classList.add('neon-hit');

    setTimeout(() => {
        textElement.style.opacity = "0.5";
        setTimeout(() => {
            textElement.style.opacity = "1";
        }, 50);
    }, 100);

    setTimeout(() => {
        textElement.classList.remove('neon-hit');
    }, 500); 
}

getMessageFromURL();

const uiLayer = document.getElementById('ui-layer');

uiLayer.classList.add('active');
setTimeout(() => {
    uiLayer.classList.remove('active');
}, 3000);