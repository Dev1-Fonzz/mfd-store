async function loadCart() {
  const uac = localStorage.getItem('uac');
  const res = await fetch(`${SCRIPT_URL}?action=getCart&uac=${uac}`);
  const data = await res.json();
  if (data.success) {
    displayCart(data.cart);
  }
}

function displayCart(cart) {
  const div = document.getElementById('cartItems');
  if (!div) return;

  if (cart.length === 0) {
    div.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html = '<ul>';
  let total = 0;
  cart.forEach(item => {
    // Untuk demo, kita anggap item ada maklumat – dalam realiti, kena fetch Products
    html += `<li>${item.item_id} x${item.qty}</li>`;
    total += (item.qty || 0);
  });
  html += '</ul>';
  html += `<p>Total Items: ${total}</p>`;
  html += `<button onclick="checkoutFromCart()">Checkout</button>`;
  div.innerHTML = html;
}

window.checkoutFromCart = function() {
  const uac = localStorage.getItem('uac');
  // Untuk ringkas, kita hantar terus – dalam realiti, kena resolve nama/harga
  fetch(`${SCRIPT_URL}?action=getCart&uac=${uac}`)
    .then(r => r.json())
    .then(data => {
      if (data.success && data.cart.length > 0) {
        localStorage.setItem('checkoutCart', JSON.stringify(data.cart));
        window.location = 'checkout.html';
      } else {
        alert("Cart is empty");
      }
    });
};
