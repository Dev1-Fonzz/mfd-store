// Ganti dengan URL Apps Script anda selepas deploy
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwfo4qOl_OhcYSjzvowY1Rqy9vFNCEJyeYYja_Jksw7eIvHh0KMvK9E2zcPUYo5XbXV/exec";
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}
