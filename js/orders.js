async function loadOrders() {
  const uac = localStorage.getItem('uac');
  const res = await fetch(`${SCRIPT_URL}?action=getOrders&uac=${uac}`);
  const data = await res.json();
  if (data.success) {
    displayOrders(data.orders);
  }
}

function displayOrders(orders) {
  const div = document.getElementById('ordersList');
  if (!div) return;

  if (orders.length === 0) {
    div.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  let html = '<div class="orders">';
  orders.forEach(o => {
    html += `
      <div class="order-item">
        <p><strong>Tracking:</strong> ${o.Tracking_Number}</p>
        <p><strong>Status:</strong> ${o.Payment_Status}</p>
        <p><strong>Date:</strong> ${new Date(o.Order_Date).toLocaleString()}</p>
        <p><strong>Total:</strong> RM${parseFloat(o.Total_Amount).toFixed(2)}</p>
        <p><strong>Payment:</strong> ${o.Payment_Menthod}</p>
      </div>
      <hr>
    `;
  });
  html += '</div>';
  div.innerHTML = html;
}
