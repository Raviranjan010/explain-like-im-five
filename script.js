const topics = [
    "How does the internet travel under the ocean?",
    "Why is the sky blue but space black?",
    "How do credit cards actually work?",
    "What is a Black Hole in simple words?",
    "How does a giant ship stay afloat?"
];

const searchBtn = document.getElementById('search-btn');
const magicBtn = document.getElementById('random-magic');
const input = document.getElementById('topic-input');
const resultBox = document.getElementById('result-box');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const loader = document.getElementById('loader');
const explanationCard = document.getElementById('explanation-card');
const progressBar = document.getElementById('progress-bar');

// Typewriter Effect Function
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        resultText.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true">|</span>';
        setTimeout(() => {
            typeWriter(text, i + 1, fnCallback);
        }, 15);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Search Logic
searchBtn.addEventListener('click', () => {
    const val = input.value;
    if(val) {
        // UI reset
        resultBox.style.display = 'block';
        explanationCard.style.display = 'none';
        loader.style.display = 'block';
        resultTitle.innerText = val;
        
        // Scroll to area
        window.scrollTo({ top: resultBox.offsetTop - 50, behavior: 'smooth' });

        // Simulate AI Thinking
        setTimeout(() => {
            loader.style.display = 'none';
            explanationCard.style.display = 'block';
            
            const explanation = `Imagine that ${val} is like a giant playground. Everything seems complicated from the outside, but once you step inside, you realize it's all about simple rules! Just like how you share toys with friends, this works by passing small bits of energy (or information) back and forth until the job is done. It's basically nature's way of being super efficient!`;
            
            typeWriter(explanation, 0);
        }, 1500);
    }
});

// Magic Suggestion with Confetti
magicBtn.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7']
    });
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    input.value = randomTopic;
    input.focus();
});

// Progress Bar on Scroll
window.onscroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
};

// Utility: Text to Speech
function speak() {
    const text = resultText.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for kids
    window.speechSynthesis.speak(utterance);
}

// Utility: Copy Text
function copyText() {
    navigator.clipboard.writeText(resultText.innerText);
    alert("Copied to clipboard! 🚀");
}

// Tag clicks
document.querySelectorAll('.tag').forEach(tag => {
    if(tag.id !== 'random-magic') {
        tag.addEventListener('click', () => {
            input.value = tag.innerText.replace(/[^\w\s]/gi, '').trim();
            searchBtn.click();
        });
    }
});
