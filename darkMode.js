const moonIcon = document.getElementById('moon');
const sunIcon = document.getElementById('sun');
const body = document.querySelector('body');

function toggleTheme() {
  if (body.classList.contains('dark_mode')) {
    body.classList.remove('dark_mode');
    moonIcon.style.display = 'inline';
    sunIcon.style.display = 'none';
  } else {
    body.classList.add('dark_mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'inline';
  }
}

moonIcon.addEventListener('click', toggleTheme);
sunIcon.addEventListener('click', toggleTheme);
