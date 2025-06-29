// Load header and footer
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

let allProducts = [];

function handleImageError(img) {
  img.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
  img.style.border = '1px solid #f00';
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const firstColor = product.colors[Object.keys(product.colors)[0]];
    const firstImage = firstColor.images[0].replace(/^\.\//, '');

    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = firstImage;
    img.alt = product.name;
    img.onerror = () => handleImageError(img);

    const category = document.createElement('div');
    category.className = 'product-type';
    category.textContent = product.categories.join(', ');

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = product.name;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(category);
    card.appendChild(name);
    card.appendChild(price);

    grid.appendChild(card);
  });
}

function applyFilters() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const sizeBtns = document.querySelectorAll('[data-size].active');
  const selectedSizes = Array.from(sizeBtns).map(btn => btn.dataset.size);
  const inStock = document.getElementById('in-stock').checked;
  const outStock = document.getElementById('out-stock').checked;

  const filtered = allProducts.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchValue);

    const hasSize = selectedSizes.length === 0 || Object.values(product.colors).some(color => {
      return Object.keys(color.sizes).some(size => selectedSizes.includes(size));
    });

    const hasStock = Object.values(product.colors).some(color => {
      const stockTotal = Object.values(color.sizes).reduce((a, b) => a + b, 0);
      return (inStock && stockTotal > 0) || (outStock && stockTotal === 0);
    });

    return matchSearch && hasSize && hasStock;
  });

  renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      renderProducts(allProducts);
    });

  document.getElementById('searchInput').addEventListener('input', applyFilters);

  document.querySelectorAll('[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilters();
    });
  });

  document.getElementById('in-stock').addEventListener('change', applyFilters);
  document.getElementById('out-stock').addEventListener('change', applyFilters);
});
