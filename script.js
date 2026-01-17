const state = {
    topics: [],
    currentTopic: null,
    level: localStorage.getItem('eli5_level') || 'child',
    isDark: localStorage.getItem('eli5_theme') === 'dark'
};

// Initialize
async function init() {
    // In a real app, use fetch('data/topics.json')
    // For this demo, we'll use a constant or local data
    state.topics = [
        { id: 'ai', title: 'Artificial Intelligence', icon: '🤖', explanations: { child: "A robot brain that learns like you!", beginner: "Software that mimics human thought.", pro: "Neural networks processing <span class='highlight'>big data</span>." } },
        { id: 'blockchain', title: 'Blockchain', icon: '🔗', explanations: { child: "A digital Lego tower everyone watches.", beginner: "A shared digital record book.", pro: "<span class='highlight'>Decentralized</span> ledger technology." } }
    ];
    
    renderTopics();
    setupEventListeners();
    applyTheme();
}

function renderTopics() {
    const grid = document.getElementById('topic-grid');
    grid.innerHTML = state.topics.map(t => `
        <div class="topic-card glass" onclick="selectTopic('${t.id}')">
            <div style="font-size: 2rem">${t.icon}</div>
            <div style="font-size: 0.8rem; font-weight: 600; margin-top:10px">${t.title}</div>
        </div>
    `).join('');
}

function selectTopic(id) {
    state.currentTopic = state.topics.find(t => t.id === id);
    updateUI();
}

function updateUI() {
    if (!state.currentTopic) return;
    
    const text = state.currentTopic.explanations[state.level];
    document.getElementById('topic-title').innerText = state.currentTopic.title;
    document.getElementById('illustration').innerText = state.currentTopic.icon;
    
    typeWriter(text);
    calculateReadingTime(text);
}

function typeWriter(text) {
    const el = document.getElementById('explanation-text');
    el.innerHTML = '';
    let i = 0;
    const speed = state.level === 'child' ? 50 : 20; // Slower for kids
    
    function type() {
        if (i < text.length) {
            // Handle HTML tags for Pro mode highlights
            if (text[i] === '<') {
                const tagEnd = text.indexOf('>', i);
                el.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                el.innerHTML += text[i];
                i++;
            }
            setTimeout(type, speed);
        }
    }
    type();
}

function setupEventListeners() {
    // Difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.level = e.target.dataset.level;
            localStorage.setItem('eli5_level', state.level);
            updateUI();
        });
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        state.isDark = !state.isDark;
        applyTheme();
    });
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.isDark ? 'dark' : 'light');
    localStorage.setItem('eli5_theme', state.isDark ? 'dark' : 'light');
}

function calculateReadingTime(text) {
    const words = text.split(' ').length;
    const time = Math.ceil(words / 200);
    document.getElementById('reading-time').innerText = `${time} min read`;
}

// Start
init();
