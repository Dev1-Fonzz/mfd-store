// Ganti dengan URL Apps Script anda selepas deploy
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_URL/exec";

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}
