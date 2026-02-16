async function loadCart() {
  const uac = localStorage.getItem('uac');
  if (!uac) return;

  try {
    const response = await fetch(`${SCRIPT_URL}?action=getCart&uac=${uac}`);
    const data = await response.json();
    if (data.success) {
      displayCart(data.cart);
    }
  } catch (err) {
    console.error("Load cart error:", err);
  }
}

function displayCart(cart) {
  const div = document.getElementById('cartItems');
  if (!div) return;

  if (cart.length === 0) {
    div.innerHTML = "<p style='text-align:center;color:#64748b;'>Troli anda kosong.</p>";
    return;
  }

  let html = '<ul style="list-style:none;padding:0;">';
  let totalItems = 0;
  cart.forEach(item => {
    totalItems += (item.qty || 0);
    html += `<li style="padding:12px 0;border-bottom:1px solid #eee;">${item.item_id} x${item.qty || 1}</li>`;
  });
  html += '</ul>';
  html += `<p style="margin-top:16px;"><strong>Jumlah Item:</strong> ${totalItems}</p>`;
  div.innerHTML = html;
}

window.checkoutFromCart = function() {
  const uac = localStorage.getItem('uac');
  if (!uac) return;

  fetch(`${SCRIPT_URL}?action=getCart&uac=${uac}`)
    .then(r => r.json())
    .then(data => {
      if (data.success && data.cart.length > 0) {
        localStorage.setItem('checkoutCart', JSON.stringify(data.cart));
        window.location = 'checkout.html';
      } else {
        alert("Troli kosong");
      }
    })
    .catch(err => {
      console.error("Checkout error:", err);
      alert("Ralat sistem: " + err.message);
    });
};
