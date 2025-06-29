document.addEventListener('DOMContentLoaded', function() {
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('products-grid');
      
      data.products.forEach(product => {
        const colorKeys = Object.keys(product.colors);
        const firstColor = product.colors[colorKeys[0]];
        const firstImage = firstColor.images[0];
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-image-container">
            <img src="${firstImage}" alt="${product.name}" />
            <div class="product-colors">
              ${Object.entries(product.colors).map(([colorName, colorData]) => `
                <span class="color-option" 
                      style="background-color: ${colorData.code}"
                      data-images='${JSON.stringify(colorData.images)}'
                      title="${colorName}">
                </span>
              `).join('')}
            </div>
          </div>
          <div class="product-info">
            <div class="product-type">${product.categories.join(', ')}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="quick-view">Quick View</button>
          </div>
        `;
        
        grid.appendChild(card);
      });

      // Eventos para cambiar imágenes de color
      document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
          const images = JSON.parse(this.dataset.images);
          const img = this.closest('.product-card').querySelector('img');
          if (images && images.length > 0) {
            img.src = images[0];
          }
        });
      });
    });
});

