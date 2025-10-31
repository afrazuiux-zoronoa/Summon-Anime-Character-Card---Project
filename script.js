// Modal functionality
const modal = document.querySelector('#modal');
const addBtn = document.querySelector('#addBtn');
const closeBtn = document.querySelector('#closeBtn');
const form = document.querySelector("#callForm");

addBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

const imageUrlInput = document.querySelector('#imageUrl');
const charNameInput = document.querySelector('#charName');
const animeVerseInput = document.querySelector('#animeVerse');
const purposeInput = document.querySelector('#purpose');

const imageRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/;
const nameRegex = /^[A-Za-z ]{2,30}$/;
const textRegex = /^[A-Za-z0-9 ]{1,20}$/;

let cardsData = [];

function createCard(imageUrl, charName, animeVerse, purpose) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
    <div class="card-header">
    <div class="avatar">
    <img src="${imageUrl}" alt="${charName}">
    </div>
    </div>
    <h2>${charName}</h2>
    <div class="card-details">
    <div class="detail-row">
    <span>Animeverse</span>
    <span>${animeVerse}</span>
    </div>
    <div class="detail-row">
    <span>Purpose</span>
    <span>${purpose}</span>
    </div>
    </div>
    <div class="card-actions">
    <button class="action-btn call-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2"
    style="display: inline-block; vertical-align: middle;">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2
    19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6
    19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2
    2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0
    1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2
    2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0
    1 22 16.92z"></path>
    </svg>
    Summon
    </button>
    <button class="action-btn message-btn">Message</button>
    </div>
    `;
    
    return card;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const imageUrl = imageUrlInput.value.trim();
    const charName = charNameInput.value.trim();
    const animeVerse = animeVerseInput.value.trim();
    const purpose = purposeInput.value.trim();
    
    if (!imageUrl || !charName || !animeVerse || !purpose) {
        alert("Please fill all fields!");
        return;
    }
    
    if (!imageRegex.test(imageUrl)) {
        alert("Invalid image URL");
        return;
    }
    
    if (!nameRegex.test(charName)) {
        alert("Invalid name — only alphabets allowed (2–30 chars).");
        return;
    }
    
    if (!textRegex.test(animeVerse) || !textRegex.test(purpose)) {
        alert("Invalid text — only letters & numbers allowed (max 20 chars).");
        return;
    }
    
    const cardData = {
        imageUrl: imageUrl,
        charName: charName,
        animeVerse: animeVerse,
        purpose: purpose
    };
    
    cardsData.push(cardData); // ADD THIS LINE - was missing!
    localStorage.setItem("cards", JSON.stringify(cardsData));
    
    const newCard = createCard(imageUrl, charName, animeVerse, purpose);
    document.querySelector(".card-wrapper").prepend(newCard);
    
    cardContainer = document.querySelectorAll(".card");
    currentIndex = 0;
    cardManipulator();
    
    form.reset();
    modal.classList.remove('active');
});

// Load saved cards on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedCards = localStorage.getItem("cards");
    
    if (savedCards) {
        cardsData = JSON.parse(savedCards);
        
        cardsData.forEach(data => {
            const card = createCard(data.imageUrl, data.charName, data.animeVerse, data.purpose);
            document.querySelector(".card-wrapper").appendChild(card);
        });
        
        cardContainer = document.querySelectorAll(".card");
        cardManipulator();
    }
});

let cardContainer = document.querySelectorAll(".card");
let currentIndex = 0;

function cardManipulator() {
    cardContainer.forEach((card, index) => {
        card.className = 'card';
        let position = index - currentIndex;
        
        if (position < 0) position = position + cardContainer.length;
        
        if (position === 0) card.classList.add('pos-0');
        else if (position === 1) card.classList.add('pos-1');
        else if (position === 2) card.classList.add('pos-2');
        else card.classList.add('hidden');
    });
}

cardManipulator();

document.querySelector("#downBtn").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= cardContainer.length) currentIndex = 0;
    cardManipulator();
});

document.querySelector("#upBtn").addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = cardContainer.length - 1;
    cardManipulator();
});