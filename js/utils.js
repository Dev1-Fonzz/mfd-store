// Ganti dengan URL Apps Script anda selepas deploy
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyopaUkM6gAjQobBuo6aNw3XfPh5CtPnsEzc1zJUDIaJ7GH46FuIJ-ZzcDDrJQifWxL/exec";
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}
