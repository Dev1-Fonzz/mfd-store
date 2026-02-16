async function loadOrders() {
  const uac = localStorage.getItem('uac');
  if (!uac) return;

  try {
    const response = await fetch(`${SCRIPT_URL}?action=getOrders&uac=${uac}`);
    const data = await response.json();
    if (data.success) {
      displayOrders(data.orders);
    }
  } catch (err) {
    console.error("Load orders error:", err);
  }
}

function displayOrders(orders) {
  const div = document.getElementById('ordersList');
  if (!div) return;

  if (orders.length === 0) {
    div.innerHTML = "<p style='text-align:center;color:#64748b;'>Tiada sejarah pesanan.</p>";
    return;
  }

  let html = '<div style="display:flex;flex-direction:column;gap:16px;">';
  orders.forEach(o => {
    const statusColor = o.Payment_Status === "Pending Payment" ? "#f59e0b" : "#10b981";
    html += `
      <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
          <strong style="color:#3f37c9;">#${o.Tracking_Number}</strong>
          <span style="background:${statusColor};color:white;padding:4px 10px;border-radius:20px;font-size:12px;">${o.Payment_Status}</span>
        </div>
        <p><strong>Tarikh:</strong> ${new Date(o.Order_Date).toLocaleString('ms-MY')}</p>
        <p><strong>Jumlah:</strong> RM${parseFloat(o.Total_Amount).toFixed(2)}</p>
        <p><strong>Kaedah:</strong> ${o.Payment_Menthod}</p>
      </div>
    `;
  });
  html += '</div>';
  div.innerHTML = html;
}
