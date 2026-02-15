// Ganti dengan URL Apps Script anda selepas deploy
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZ6eMcZebeKyRB3GS0goN3asN1Sc-tHIQV3giJK8ZcmaoANFQoot2A-8Oc-VvymbDn/exec";

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}
