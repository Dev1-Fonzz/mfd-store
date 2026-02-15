document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const hashed = hashPassword(password);

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'login', phone, password: hashed })
  });
  const data = await res.json();

  if (data.success) {
    localStorage.setItem('uac', data.uac);
    localStorage.setItem('username', data.username);
    window.location = 'dashboard.html';
  } else {
    alert("Login failed: " + data.message);
  }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const hashed = hashPassword(password);

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'register', username, password: hashed, phone, email })
  });
  const data = await res.json();

  if (data.success) {
    alert("Registration successful! Please login.");
    window.location = 'login.html';
  } else {
    alert("Error: " + data.message);
  }
});

async function deleteAccount() {
  if (!confirm("Are you sure? This will deactivate your account.")) return;
  const uac = localStorage.getItem('uac');
  const res = await fetch(`${SCRIPT_URL}?action=deleteAccount&uac=${uac}`);
  const data = await res.json();
  if (data.success) {
    localStorage.removeItem('uac');
    localStorage.removeItem('username');
    alert("Account deactivated.");
    window.location = 'index.html';
  }
}
