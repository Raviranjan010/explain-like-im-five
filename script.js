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

// Simulate the "Explanation" feature
searchBtn.addEventListener('click', () => {
    const val = input.value;
    if(val) {
        resultBox.style.display = 'block';
        resultTitle.innerText = val;
        // In a real app, you would fetch an API response here
        window.scrollTo({ top: resultBox.offsetTop - 50, behavior: 'smooth' });
    }
});

// Magic Suggestion Feature
magicBtn.addEventListener('click', () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    input.value = randomTopic;
    input.focus();
});

// UI Interaction: Tag clicks
document.querySelectorAll('.tag').forEach(tag => {
    if(tag.id !== 'random-magic') {
        tag.addEventListener('click', () => {
            input.value = "Explain " + tag.innerText + " to me...";
        });
    }
});
