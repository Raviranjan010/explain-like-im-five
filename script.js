const topicData = {
    blockchain: {
        title: "Blockchain", icon: "🔗",
        child: "A digital Lego tower where blocks are stuck together forever.",
        beginner: "A shared digital list that everyone can see but no one can change.",
        pro: "A decentralized ledger using cryptography to ensure data immutability."
    },
    ai: {
        title: "Artificial Intelligence", icon: "🤖",
        child: "A robot brain that learns from pictures and stories.",
        beginner: "Computers programmed to think and learn like humans.",
        pro: "Simulated human intelligence using neural networks and deep learning."
    },
    cloud: {
        title: "Cloud Computing", icon: "☁️",
        child: "Storing your toys in a giant toy box in the sky so you can play anywhere.",
        beginner: "Using the internet to store files instead of your own computer.",
        pro: "On-demand delivery of IT resources over the internet with pay-as-you-go pricing."
    }
};

let currentTopic = "blockchain";
let currentLevel = "child";
let xp = 0;

function updateUI() {
    const data = topicData[currentTopic];
    document.getElementById('display-title').innerText = "What is " + data.title + "?";
    document.getElementById('topic-icon').innerText = data.icon;
    document.getElementById('display-text').innerText = data[currentLevel];
}

document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.level;
        updateUI();
    });
});

document.getElementById('topicSearch').addEventListener('keyup', (e) => {
    const val = e.target.value.toLowerCase();
    if (topicData[val]) {
        currentTopic = val;
        updateUI();
    }
});

function speakText() {
    const text = document.getElementById('display-text').innerText;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function takeQuiz() {
    xp += 20;
    if(xp > 100) xp = 100;
    document.getElementById('xp-fill').style.width = xp + "%";
    document.getElementById('xp-count').innerText = xp;
    alert("Knowledge confirmed! +20 XP");
}
