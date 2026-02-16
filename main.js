const diaryInput = document.getElementById('diary-input');
const addBtn = document.getElementById('add-btn');
const diaryList = document.getElementById('diary-list');
const themeToggle = document.getElementById('theme-toggle');

// Load data
let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
const savedTheme = localStorage.getItem('theme');

// Init Theme
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Render Initial List
renderDiaries();

// Event Listeners
addBtn.addEventListener('click', addDiary);

diaryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addDiary();
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

diaryList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = Number(e.target.dataset.id);
        deleteDiary(id);
    }
});

// Logic
function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function addDiary() {
    const text = diaryInput.value.trim();
    if (!text) return;

    const diary = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleDateString('ko-KR', { 
            year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' 
        })
    };

    diaries.unshift(diary);
    saveAndRender();
    diaryInput.value = '';
}

function deleteDiary(id) {
    diaries = diaries.filter(d => d.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('diaries', JSON.stringify(diaries));
    renderDiaries();
}

function renderDiaries() {
    diaryList.innerHTML = '';
    diaries.forEach(diary => {
        const li = document.createElement('li');
        li.className = 'diary-item';
        li.innerHTML = `
            <div class="diary-content">
                <span class="diary-date">${diary.date}</span>
                <p class="diary-text">${escapeHtml(diary.text)}</p>
            </div>
            <button class="delete-btn" data-id="${diary.id}" aria-label="삭제">❌</button>
        `;
        diaryList.appendChild(li);
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
