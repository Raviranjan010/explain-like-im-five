const topics = [
    {
        id: "api",
        title: "API",
        tagline: "The digital waiter of the internet.",
        icon: "🔌",
        content: {
            child: "An API is like a waiter in a restaurant. You tell the waiter what you want, they go to the kitchen, and bring back your food! 🍕",
            beginner: "Application Programming Interfaces are sets of rules that allow one software application to talk to another.",
            pro: "An API is an abstraction layer that allows systems to communicate via defined protocols like REST or GraphQL, handling requests/responses."
        },
        keywords: ["abstraction layer", "REST", "GraphQL", "protocols"]
    },
    {
        id: "cloud",
        title: "Cloud Computing",
        tagline: "Someone else's computer, but better.",
        icon: "☁️",
        content: {
            child: "The cloud is like a giant toy box in the sky that you can reach from any computer, anywhere! 🧸",
            beginner: "Storing and accessing data over the internet instead of your computer's hard drive.",
            pro: "On-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user."
        },
        keywords: ["On-demand", "resources", "computing power"]
    }
];

let state = {
    activeId: null,
    level: 'beginner'
};

// Initialize Sidebar
const topicList = document.getElementById('topicList');
topics.forEach(t => {
    const div = document.createElement('div');
    div.className = 'topic-item';
    div.innerHTML = `${t.icon} &nbsp; ${t.title}`;
    div.onclick = () => setActiveTopic(t.id);
    topicList.appendChild(div);
});

// Level Switching
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.level = btn.dataset.level;
        renderContent();
    };
});

function setActiveTopic(id) {
    state.activeId = id;
    document.querySelectorAll('.topic-item').forEach(el => {
        el.classList.toggle('active', el.innerText.includes(topics.find(t => t.id === id).title));
    });
    renderContent();
}

function renderContent() {
    const topic = topics.find(t => t.id === state.activeId);
    if (!topic) return;

    document.getElementById('activeTopicTitle').innerText = topic.title;
    document.getElementById('activeTopicTagline').innerText = topic.tagline;
    
    let text = topic.content[state.level];
    
    // Pro Highlight
    if(state.level === 'pro') {
        topic.keywords.forEach(word => {
            const reg = new RegExp(`(${word})`, 'gi');
            text = text.replace(reg, `<span class="keyword">$1</span>`);
        });
    }

    // Reading Time
    const minutes = Math.ceil(text.split(' ').length / 200);
    document.getElementById('readingTime').innerText = `${minutes} min read`;

    typeEffect(text);
}

function typeEffect(text) {
    const display = document.getElementById('displayText');
    display.innerHTML = text; // Fast injection
    display.style.animation = 'none';
    display.offsetHeight; // Trigger reflow
    display.style.animation = null;
}

// Utility: Speak
document.getElementById('speakBtn').onclick = () => {
    const text = document.getElementById('displayText').innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
};

// Utility: Copy
document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(document.getElementById('displayText').innerText);
    showToast("Copied to clipboard!");
};

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 2000);
}

