const topicData = {
    blockchain: {
        title: "What is Blockchain?",
        icon: "🔗",
        tags: ["#Web3", "#Security", "#Lego"],
        child: "Imagine a digital Lego tower. Everyone can see it, but no one can break it or take a piece away once it's built!",
        beginner: "A decentralized digital ledger that records transactions across many computers so the record cannot be changed retroactively.",
        pro: "A peer-to-peer distributed ledger technology that utilizes cryptographic hashing and consensus algorithms to ensure immutability."
    },
    ai: {
        title: "What is AI?",
        icon: "🤖",
        tags: ["#Smart", "#MachineLearning", "#Future"],
        child: "It's like a robot brain that learns by looking at millions of pictures, just like how you learn your ABCs!",
        beginner: "Software designed to simulate human intelligence, allowing machines to recognize patterns and make decisions.",
        pro: "A branch of computer science focused on building systems capable of performing tasks that typically require human cognition, such as NLP and neural networks."
    }
};

let currentTopic = "blockchain";
let currentLevel = "child";
let xp = 0;

// --- Update UI ---
function updateUI() {
    const data = topicData[currentTopic];
    const textElement = document.getElementById('display-text');
    
    // Add fade effect
    textElement.style.opacity = 0;
    
    setTimeout(() => {
        document.getElementById('display-title').innerText = data.title;
        document.getElementById('topic-icon').innerText = data.icon;
        textElement.innerText = data[currentLevel];
        
        // Update Tags
        const tagContainer = document.getElementById('tag-container');
        tagContainer.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        
        textElement.style.opacity = 1;
    }, 300);
}

// --- Difficulty Level Switcher ---
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.level;
        updateUI();
    });
});

// --- Text to Speech (Functional) ---
function speakText() {
    const text = document.getElementById('display-text').innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}

// --- Gamification (XP System) ---
function takeQuiz() {
    xp += 10;
    if (xp > 100) xp = 100; // Cap at 100 for this demo
    document.getElementById('xp-fill').style.width = xp + "%";
    document.getElementById('xp-count').innerText = xp;
    
    const mainCard = document.getElementById('mainCard');
    mainCard.style.transform = "scale(1.02)";
    setTimeout(() => mainCard.style.transform = "scale(1)", 200);
    
    alert("Great job! You earned 10 XP for learning about " + currentTopic);
}

// --- Copy to Clipboard ---
function copyText() {
    const text = document.getElementById('display-text').innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

// --- Search Implementation ---
document.getElementById('topicSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = this.value.toLowerCase();
        if (topicData[val]) {
            currentTopic = val;
            updateUI();
        } else {
            alert("Topic not found! Try 'AI' or 'Blockchain'");
        }
    }
});
