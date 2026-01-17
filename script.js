const topicsData = [
    {
        id: "blockchain",
        title: "Blockchain",
        icon: "⛓️",
        content: {
            child: "Imagine a digital Lego tower where everyone keeps an eye on the blocks so no one can cheat!",
            beginner: "A digital ledger where information is stored in linked blocks across many computers, making it secure and decentralized.",
            pro: "A distributed ledger technology utilizing cryptographic hashing and consensus mechanisms to ensure data immutability."
        },
        tags: ["Digital Ledger", "Decentralized", "Secure"]
    },
    { id: "ai", title: "AI", icon: "🤖" },
    { id: "internet", title: "Internet", icon: "🌐" }
];

let currentLevel = 'beginner';
let currentTopic = topicsData[0];

function init() {
    renderTopicGrid();
    setupEventListeners();
    updateDisplay();
}

function renderTopicGrid() {
    const grid = document.getElementById('topicGrid');
    topicsData.forEach(topic => {
        const item = document.createElement('div');
        item.className = `topic-item ${currentTopic.id === topic.id ? 'active' : ''}`;
        item.innerHTML = `
            <div class="topic-icon-wrap">${topic.icon}</div>
            <p>${topic.title}</p>
        `;
        item.onclick = () => {
            currentTopic = topic;
            updateDisplay();
        };
        grid.appendChild(item);
    });
}

function updateDisplay() {
    const textEl = document.getElementById('explanationText');
    const titleEl = document.getElementById('topicTitle');
    
    titleEl.innerText = `What's ${currentTopic.title}?`;
    
    // Typewriter effect trigger
    textEl.classList.remove('typing');
    void textEl.offsetWidth; // Reset animation
    textEl.innerText = currentTopic.content[currentLevel] || "Coming soon...";
    textEl.classList.add('typing');
}

function setupEventListeners() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLevel = e.target.dataset.level;
            updateDisplay();
        };
    });

    document.getElementById('copyBtn').onclick = () => {
        navigator.clipboard.writeText(document.getElementById('explanationText').innerText);
        alert("Copied to clipboard!");
    };
}

init();
