const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product_id');
const colorRaw = urlParams.get('color_id');
const colorId = colorRaw === null || colorRaw === '' ? 0 : parseInt(colorRaw, 10);

let product = null;

fetch('products.json')
.then(res => res.json())
.then(data => {
  product = data.products.find(p => p.id == productId);
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
      document.querySelector('#details-product-price h1').textContent = `\$${product.price.toFixed(2)}`;
      document.querySelector('#details-product-description p').textContent = product.description;
      
      colors = product.colors;
      const colorsDiv = document.getElementById('details-product-colors');
      colors.forEach((color, index) => {
        const box = document.createElement('div');
        box.style.backgroundColor = color.code;
        box.classList.add('details-color-box');
        box.dataset.colorId = index;
        box.dataset.colorName = color.name;
        box.dataset.colorCode = color.code;

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
        btn.dataset.size = sizeName;
          
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

fetch('data/reviews.json')
.then(res => res.json())
.then(data => {
  reviews = data[productId];
  const reviewCarousel = document.getElementById('review-carousel');

  const addReviewButton = document.createElement('div');
  addReviewButton.classList.add("review-add-button");
  const buttonIcon = document.createElement('i');
  buttonIcon.classList.add("fa-solid");
  buttonIcon.classList.add("fa-plus");
  addReviewButton.appendChild(buttonIcon);
  addReviewButton.addEventListener('click', () => {
  });

  if (reviews && reviews.length > 0) {
    const reviewAddCard = document.createElement('div');
    reviewAddCard.classList.add("review-add-card");
    reviewAddCard.appendChild(addReviewButton);
    reviewCarousel.appendChild(reviewAddCard);

    let scoreSum = 0;

    reviews.forEach((review, index) => {
      scoreSum += review.stars;

      const reviewCard = document.createElement('div');
      reviewCard.classList.add("review-card");

      const reviewCardUpper = document.createElement('div');

      const account = document.createElement('div');
      account.classList.add("review-account-wrapper");
      const icon = document.createElement('i');
      icon.classList.add("fa-solid");
      icon.classList.add("fa-circle-user");
      icon.classList.add("review-user-icon");
      const name = document.createElement('p');
      name.textContent = review.name;
      account.appendChild(icon);
      account.appendChild(name);

      const starsDiv = document.createElement('div');
      starsDiv.classList.add("review-start-wrapper")
      for (let i = 0; i < review.stars; i++) {
        const star = document.createElement('p');
        star.textContent = "⭐️";
        starsDiv.appendChild(star);
      }

      const commentDiv = document.createElement('div');
      commentDiv.classList.add("review-comment-wrapper");
      const comment = document.createElement('p');
      comment.textContent = review.comment;
      commentDiv.appendChild(comment);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add("review-date-wrapper");
      const date = document.createElement('p');
      dateDiv.textContent = review.date;

      reviewCardUpper.appendChild(account);
      reviewCardUpper.appendChild(starsDiv);
      reviewCardUpper.appendChild(commentDiv);
      reviewCard.appendChild(reviewCardUpper);
      reviewCard.appendChild(dateDiv);

      reviewCarousel.appendChild(reviewCard);
    });

    const avrStarsDiv = document.getElementById("avr-starts");
    const openH2 = document.createElement('h2');
    openH2.textContent = "[ Average Score: ";
    avrStarsDiv.appendChild(openH2);

    const avrScore = Math.round(scoreSum / reviews.length);
    for (let i = 0; i < avrScore; i++) {
      const star = document.createElement('p');
      star.textContent = "⭐️";
      avrStarsDiv.appendChild(star);
    }

    const closeH2 = document.createElement('h2');
    closeH2.textContent = " ]";
    avrStarsDiv.appendChild(closeH2);
    
  } else {
    document.getElementById('no-reviews').style.display = 'flex';
  }
})
.catch(err => {
    document.getElementById('no-reviews').style.display = 'flex';
    console.error('Failed to load reviews data:', err);
});

document.getElementById("details-product-add-button").addEventListener("click", () => {
  const productId = product.id;
  const productName = product.name;
  const productPrice = product.price;
  const productDescription = product.description;

  const selectedColorBtn = document.querySelector(".details-color-selected");
  const selectedSizeBtn = document.querySelector(".details-size-selected");

  if (!selectedSizeBtn) {
    alert("Select a size!");
    return;
  }

  const productColorId = selectedColorBtn.dataset.colorId;
  const productColorName = selectedColorBtn.dataset.colorName;
  const productColorCode = selectedColorBtn.dataset.colorCode;
  const productSize = selectedSizeBtn.dataset.size;
  const productImage = product.colors[productColorId].images[0];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item =>
    item.id === productId &&
    item.size === productSize &&
    item.colorId === productColorId
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      size: productSize,
      colorId: productColorId,
      colorName: productColorName,
      colorCode: productColorCode,
      image: productImage,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
});
