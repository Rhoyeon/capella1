const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateButtonText(currentTheme);
}

toggleBtn.addEventListener('click', () => {
  let theme = 'light';
  if (document.documentElement.getAttribute('data-theme') !== 'dark') {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateButtonText(theme);
});

function updateButtonText(theme) {
  toggleBtn.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}