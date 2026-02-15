let allProducts = [];

async function loadAllProducts() {
  const res = await fetch(`${SCRIPT_URL}?action=getProducts`);
  const data = await res.json();
  if (data.success) {
    allProducts = data.products;
    renderProducts(allProducts);
  }
}

function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach(p => {
    if (p.Public_Status !== "Public") return;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.Image_URL || 'https://via.placeholder.com/150'}" alt="${p.Name}">
      <h3>${p.Name}</h3>
      <p>${p.Sale_Price ? `RM${parseFloat(p.Sale_Price).toFixed(2)}` : `RM${parseFloat(p.Price).toFixed(2)}`}</p>
      <button onclick="addToCart('${p.Item_ID}', '${p.Name}', ${p.Sale_Price || p.Price})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function searchProducts() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.Name.toLowerCase().includes(term) ||
    p.Description.toLowerCase().includes(term)
  );
  renderProducts(filtered);
}

window.addToCart = async function(item_id, name, price) {
  const uac = localStorage.getItem('uac');
  if (!uac) {
    if (confirm("You need to login to add to cart. Go to login?")) {
      window.location = 'login.html';
    }
    return;
  }

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'addToCart',
      uac,
      item_id,
      quantity: 1
    })
  });
  const data = await res.json();
  if (data.success) {
    alert("Added to cart!");
  }
};
