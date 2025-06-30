  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product_id');
  const colorRaw = urlParams.get('color_id');
  const colorId = colorRaw === null || colorRaw === '' ? 0 : parseInt(colorRaw, 10);

  // JSONファイルからデータを取得して商品情報を表示
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      const product = data.products.find(p => p.id == productId);
      if (product) {
          console.info(`Find product: ${productId}`);
          images = product.colors[colorId].images;
          const bigImageDiv = document.getElementById('details-big-image');
          const bigImg = document.createElement('img');
          bigImg.src = images[0];
          bigImg.alt = 'Big Product Image';
          bigImageDiv.appendChild(bigImg);
          
          const smallImagesDiv = document.getElementById('details-small-images');
          images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Thumbnail ${index + 1}`;
            if (index == 0) {
              thumb.classList.add('details-image-selected');
            }

            thumb.addEventListener('click', () => {
              bigImg.src = imgSrc;
              const allThumbs = smallImagesDiv.querySelectorAll('img');
              allThumbs.forEach(img => img.classList.remove('details-image-selected'));
              thumb.classList.add('details-image-selected');
            });

            smallImagesDiv.appendChild(thumb);
          });

          document.querySelector('#details-product-name h1').textContent = product.name;
          document.querySelector('#details-product-price h1').textContent = `\$${product.price}`;
          document.querySelector('#details-product-description p').textContent = product.description;
          
          colors = product.colors;
          const colorsDiv = document.getElementById('details-product-colors');
          colors.forEach((color, index) => {
            const box = document.createElement('div');
            box.style.backgroundColor = color.code;
            box.classList.add('details-color-box');

            if (index === colorId) {
              box.classList.add('details-color-selected');
            }

            box.addEventListener('click', () => {
              const url = new URL(window.location.href);
              url.searchParams.set('color_id', index);
              window.location.href = url.toString();
            });

            colorsDiv.appendChild(box);
          });
          
          sizes = product.colors[colorId].sizes;
          const sizesDiv = document.getElementById('details-product-sizes');
          Object.entries(sizes).forEach(([sizeName, stock]) => {
            const btn = document.createElement('button');
            btn.textContent = sizeName;
            btn.classList.add('details-size-button');

            if (stock <= 0) {
              btn.disabled = true;
              btn.classList.add('out-of-stock');
            }

            btn.addEventListener('click', () => {
              document.querySelectorAll('.details-size-selected').forEach(b => b.classList.remove('details-size-selected'));
              btn.classList.add('details-size-selected');
            });

            sizesDiv.appendChild(btn);
          });

                    
      } else {
          console.info('The Product does not exist: ${productId}');
          document.getElementById('details-wrapper').style.display = 'none';
          document.getElementById('details-no-propduct-wrapper').style.display = 'flex';
      }
    })
    .catch(err => {
        document.getElementById('details-wrapper').style.display = 'none';
        document.getElementById('details-no-propduct-wrapper').style.visibility = 'visible';
        console.error('Failed to load product data:', err);
    });
