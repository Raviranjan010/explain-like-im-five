const topics = [
    {
        id: "api",
        title: "API",
        category: "Backend",
        tagline: "The digital waiter",
        icon: "🔌",
        content: {
            child: "An API is like a waiter. You tell them what you want, they tell the kitchen, and bring back your food! 🍕",
            beginner: "Application Programming Interfaces allow applications to communicate through defined rules and requests.",
            pro: "An API is an abstraction layer implementing REST/GraphQL protocols for stateless system-to-system communication."
        },
        keywords: ["abstraction layer", "stateless", "protocols"],
        code: `fetch('https://api.eli5.com/data')\n .then(res => res.json())`
    }
    // ... more topics here
];

let state = {
    activeTopic: null,
    level: 'beginner',
    viewed: new Set()
};

// --- Initialization ---
function init() {
    renderList(topics);
    setupEventListeners();
    updateProgress();
}

function renderList(data) {
    const container = document.getElementById('topicList');
    container.innerHTML = '';
    
    data.forEach(topic => {
        const div = document.createElement('div');
        div.className = `topic-item ${state.activeTopic?.id === topic.id ? 'active' : ''}`;
        div.innerHTML = `<span>${topic.icon}</span> <span>${topic.title}</span>`;
        div.onclick = () => selectTopic(topic);
        container.appendChild(div);
    });
}

function selectTopic(topic) {
    state.activeTopic = topic;
    state.viewed.add(topic.id);
    renderContent();
    renderList(topics);
    updateProgress();
}

function renderContent() {
    const topic = state.activeTopic;
    if(!topic) return;

    document.getElementById('activeTopicTitle').innerText = topic.title;
    document.getElementById('activeTopicTagline').innerText = topic.tagline;
    
    let text = topic.content[state.level];
    
    // Keyword Highlighting Logic
    if(state.level === 'pro') {
        topic.keywords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            text = text.replace(regex, `<span class="keyword">$1</span>`);
        });
    }

    document.getElementById('displayText').innerHTML = text;

    // Show Code Example
    const codeBox = document.getElementById('codeExample');
    if(topic.code) {
        codeBox.style.display = 'block';
        codeBox.innerText = topic.code;
    } else {
        codeBox.style.display = 'none';
    }
}

// Search Logic
document.getElementById('searchInput').oninput = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = topics.filter(t => t.title.toLowerCase().includes(query));
    renderList(filtered);
};

// Progress Tracker
function updateProgress() {
    const total = topics.length;
    const current = state.viewed.size;
    const percent = (current / total) * 100;
    
    document.getElementById('progressText').innerText = `${current}/${total}`;
    document.getElementById('progressFill').style.width = `${percent}%`;
}

init();
