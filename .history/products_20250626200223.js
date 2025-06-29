function handleImageError(img) {
  console.error('Failed to load image:', img.src);
  img.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/95c7a2fa-9674-4499-80a6-08b354704ae2.png';
  img.style.border = '1px solid #ff000030';
}

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('products-grid');

    data.products.forEach(product => {
      const colorKeys = Object.keys(product.colors);
      const firstColor = product.colors[colorKeys[0]];
      const firstImagePath = firstColor.images[0];

      // Usar la ruta tal como viene en el JSON (no modificarla)
      const imgSrc = firstImagePath;

      // Crear tarjeta del producto
      const card = document.createElement('div');
      card.classList.add('product-card');

      const image = document.createElement('img');
      image.src = imgSrc;
      image.alt = product.name;
      image.onerror = () => handleImageError(image);

      const category = document.createElement('div');
      category.className = 'product-type';
      category.textContent = product.categories.join(', ');

      const name = document.createElement('div');
      name.className = 'product-name';
      name.textContent = product.name;

      const price = document.createElement('div');
      price.className = 'product-price';
      price.textContent = `$${product.price.toFixed(2)}`;

      card.appendChild(image);
      card.appendChild(category);
      card.appendChild(name);
      card.appendChild(price);

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Error loading products:', err);
  });
