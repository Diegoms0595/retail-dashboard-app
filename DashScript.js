// Sample product data
const products = [
  { id: 1, name: "Pattern Shirt", stock: 15, sales: 320, price: 199, reviews: 45, rating: 4.5, image: "placeholder" },
  { id: 2, name: "White Tee", stock: 8, sales: 210, price: 150, reviews: 32, rating: 4.2, image: "placeholder" },
  { id: 3, name: "Beige Tee", stock: 12, sales: 180, price: 170, reviews: 28, rating: 4.0, image: "placeholder" },
  { id: 4, name: "Print Tee", stock: 20, sales: 450, price: 160, reviews: 62, rating: 4.7, image: "placeholder" },
  { id: 5, name: "Green Shirt", stock: 30, sales: 520, price: 199, reviews: 38, rating: 3.9, image: "placeholder" },
  { id: 6, name: "Black Jeans", stock: 25, sales: 380, price: 220, reviews: 55, rating: 4.3, image: "placeholder" },
  { id: 7, name: "Denim Jacket", stock: 5, sales: 280, price: 350, reviews: 42, rating: 4.6, image: "placeholder" },
  { id: 8, name: "Brown Boots", stock: 7, sales: 190, price: 420, reviews: 37, rating: 4.4, image: "placeholder" }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  updateSummary();
  renderProductGrid();
  initializeCharts();
});

// Update summary stats
function updateSummary() {
  document.getElementById('totalProducts').textContent = products.length;
  const lowStockCount = products.filter(p => p.stock < 10).length;
  document.getElementById('lowStock').textContent = lowStockCount;
}

// Render product grid
function renderProductGrid() {
  const gridContainer = document.getElementById('productGrid');
  gridContainer.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <div class="product-image">
        <span>${product.name}</span>
      </div>
      <div class="product-info">
        <h4 class="product-name">${product.name}</h4>
        <div class="product-price">$${product.price}</div>
        <div class="product-stock ${product.stock < 10 ? 'stock-low' : 'stock-ok'}">
          Stock: ${product.stock} ${product.stock < 10 ? '(Low)' : ''}
        </div>
      </div>
    `;
    
    gridContainer.appendChild(productCard);
  });
}

// Initialize charts
function initializeCharts() {
  // Stock Chart
  const stockCtx = document.getElementById('stockChart').getContext('2d');
  new Chart(stockCtx, {
    type: 'bar',
    data: {
      labels: products.map(p => p.name),
      datasets: [{
        label: 'Current Stock',
        data: products.map(p => p.stock),
        backgroundColor: products.map(p => p.stock < 10 ? 'rgba(224, 49, 49, 0.7)' : 'rgba(40, 167, 69, 0.7)'),
        borderColor: products.map(p => p.stock < 10 ? 'rgba(224, 49, 49, 1)' : 'rgba(40, 167, 69, 1)'),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Sales Chart
  const salesData = {
    'Jan': 1200,
    'Feb': 1900,
    'Mar': 1500,
    'Apr': 1800,
    'May': 2100,
    'Jun': 2400,
    'Jul': 3200,
    'Aug': 2800
  };
  
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: Object.keys(salesData),
      datasets: [{
        label: 'Monthly Sales ($)',
        data: Object.values(salesData),
        backgroundColor: 'rgba(108, 117, 125, 0.2)',
        borderColor: 'rgba(108, 117, 125, 1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }]
    },
    options: {
      responsive: true
    }
  });

  // Ratings Chart
  const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
  new Chart(ratingsCtx, {
    type: 'bar',
    data: {
      labels: products.map(p => p.name),
      datasets: [{
        label: 'Average Rating',
        data: products.map(p => p.rating),
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0,
          max: 5
        }
      }
    }
  });

  // Reviews Chart
  const reviewsCtx = document.getElementById('reviewsChart').getContext('2d');
  new Chart(reviewsCtx, {
    type: 'doughnut',
    data: {
      labels: products.map(p => p.name),
      datasets: [{
        label: 'Customer Reviews',
        data: products.map(p => p.reviews),
        backgroundColor: [
          '#ff6b6b', '#748ffc', '#51cf66', '#fcc419', '#9775fa',
          '#ff922b', '#4dabf7', '#20c997'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });
}

// Refresh button functionality
document.querySelector('.refresh-btn').addEventListener('click', function() {
  this.innerHTML = '<i class="refresh-icon">↻</i> Refreshing...';
  
  // Simulate refresh delay
  setTimeout(() => {
    this.innerHTML = '<i class="refresh-icon">↻</i> Refresh Data';
  }, 1000);
});
