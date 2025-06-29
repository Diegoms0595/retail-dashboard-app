fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    data.products.forEach(product => {
      const colorKeys = Object.keys(product.colors);
      const firstColor = product.colors[colorKeys[0]];
      const firstImage = firstColor.images[0];

      const card = document.createElement('div');
      card.classList.add('product-card');
      
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${firstImage}" alt="${product.name}" />
          <div class="product-colors">
            ${Object.keys(product.colors).map(colorName => `
              <span class="color-option" 
                    style="background-color: ${product.colors[colorName].code}"
                    data-images='${JSON.stringify(product.colors[colorName].images)}'
                    title="${colorName}">
              </span>
            `).join('')}
          </div>
        </div>
        <div class="product-info">
          <div class="product-type">${product.categories.join(', ')}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
      
      grid.appendChild(card);
    });

    // Evento para cambiar imágenes al seleccionar color
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', function() {
        const images = JSON.parse(this.dataset.images);
        const img = this.closest('.product-card').querySelector('img');
        if (images.length > 0) {
          img.src = images[0];
        }
      });
    });
  });

