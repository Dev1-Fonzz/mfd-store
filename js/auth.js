function showMessage(elementId, text, isSuccess = true) {
  const msgDiv = document.getElementById(elementId);
  if (!msgDiv) return;
  msgDiv.textContent = text;
  msgDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
  msgDiv.style.display = 'block';
}

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const btn = e.submitter;

  if (!/^\d{10,11}$/.test(phone)) {
    showMessage('message', "Nombor telefon mesti 10-11 digit", false);
    return;
  }

  if (password.length < 6) {
    showMessage('message', "Kata laluan mesti sekurang-kurangnya 6 aksara", false);
    return;
  }

  btn.disabled = true;
  showMessage('message', "Mendaftar...", true);

  try {
    const hashedPass = hashPassword(password);
    const formData = new URLSearchParams();
    formData.append('action', 'register');
    formData.append('username', username);
    formData.append('password', hashedPass);
    formData.append('phone', phone);
    formData.append('email', email);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();
    if (data.success) {
      showMessage('message', "✅ Pendaftaran berjaya! Redirect ke login...", true);
      setTimeout(() => window.location = 'login.html', 1500);
    } else {
      showMessage('message', "❌ Gagal daftar: " + (data.message || "Sila cuba lagi"), false);
    }
  } catch (err) {
    console.error("Register error:", err);
    showMessage('message', "Ralat sistem: " + err.message, false);
  } finally {
    btn.disabled = false;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const btn = e.submitter;

  if (!/^\d{10,11}$/.test(phone)) {
    showMessage('message', "Nombor telefon mesti 10-11 digit", false);
    return;
  }

  btn.disabled = true;
  showMessage('message', "Sedang login...", true);

  try {
    const hashedPass = hashPassword(password);
    const formData = new URLSearchParams();
    formData.append('action', 'login');
    formData.append('phone', phone);
    formData.append('password', hashedPass);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('uac', data.uac);
      localStorage.setItem('username', data.username);
      showMessage('message', "✅ Login berjaya! Mengalihkan...", true);
      setTimeout(() => window.location = 'dashboard.html', 1200);
    } else {
      showMessage('message', "❌ Gagal login: " + (data.message || "Nombor atau kata laluan salah"), false);    }
  } catch (err) {
    console.error("Login error:", err);
    showMessage('message', "Ralat sistem: Gagal sambung ke pelayan.", false);
  } finally {
    btn.disabled = false;
  }
}

async function deleteAccount() {
  if (!confirm("⚠️ Adakah anda pasti?\nAkaun akan dinyahaktifkan secara kekal.")) return;
  
  const uac = localStorage.getItem('uac');
  try {
    const formData = new URLSearchParams();
    formData.append('action', 'deleteAccount');
    formData.append('uac', uac);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();
    if (data.success) {
      localStorage.removeItem('uac');
      localStorage.removeItem('username');
      alert("✅ Akaun telah dinyahaktifkan.");
      window.location = 'index.html';
    } else {
      alert("❌ Gagal padam akaun: " + data.message);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Ralat sistem: " + err.message);
  }
}
