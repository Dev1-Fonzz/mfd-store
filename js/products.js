let allProducts = [];

async function loadAllProducts() {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=getProducts`);
    const data = await response.json();
    if (data.success) {
      allProducts = data.products;
      renderProducts(allProducts);
    }
  } catch (err) {
    console.error("Load products error:", err);
  }
}

function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const publicProducts = products.filter(p => p.Public_Status === "Public");
  
  if (publicProducts.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#64748b;">Tiada produk tersedia</p>';
    return;
  }

  publicProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const price = p.Sale_Price ? parseFloat(p.Sale_Price) : parseFloat(p.Price);
    const hasSale = p.Sale_Price && p.Sale_Price !== p.Price;
    
    card.innerHTML = `
      <img src="${p.Image_URL || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${p.Name}">
      <div class="product-info">
        <h3>${p.Name}</h3>
        <p class="description">${p.Description || 'Tiada deskripsi'}</p>
        <p class="price">
          ${hasSale ? `<span style="text-decoration:line-through;color:#94a3b8;font-size:14px;">RM${parseFloat(p.Price).toFixed(2)}</span><br>` : ''}
          RM${price.toFixed(2)}
        </p>
        ${p.Event_Tag ? `<span style="background:#4361ee;color:white;padding:4px 8px;border-radius:20px;font-size:12px;">${p.Event_Tag}</span>` : ''}
        <button onclick="addToCart('${p.Item_ID}', '${p.Name.replace(/'/g, "\\'")}', ${price})" style="width:100%;margin-top:12px;background:linear-gradient(to right,#10b981,#059669);">🛒 Tambah ke Troli</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function searchProducts() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.Name.toLowerCase().includes(term) ||
    (p.Description && p.Description.toLowerCase().includes(term)) ||
    (p.Labels && p.Labels.toLowerCase().includes(term))
  );
  renderProducts(filtered);
}

window.addToCart = async function(item_id, name, price) {
  const uac = localStorage.getItem('uac');
  if (!uac) {
    if (confirm("Anda perlu login untuk tambah ke troli.\nPergi ke halaman login?")) {
      window.location = 'login.html';
    }
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('action', 'addToCart');
    formData.append('uac', uac);
    formData.append('item_id', item_id);
    formData.append('quantity', '1');

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await response.json();
    if (data.success) {
      alert("✅ Berjaya ditambah ke troli!");
    } else {
      alert("❌ Gagal tambah ke troli: " + data.message);
    }
  } catch (err) {
    console.error("Add to cart error:", err);
    alert("Ralat sistem: " + err.message);
  }
};
