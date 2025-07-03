const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST /api/review
router.post('/', (req, res) => {
  try {
    const { productId, name, stars, comment } = req.body;
    if (!productId || !name || !stars || !comment) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }
    const reviewsPath = path.join(__dirname, '../data/reviews.json');
    let reviews = {};
    if (fs.existsSync(reviewsPath)) {
      reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
    }
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    const newReview = { name, stars, comment, date };
    if (!reviews[productId]) {
      reviews[productId] = [];
    }
    reviews[productId].push(newReview);
    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
    res.status(200).json({ success: true, review: newReview });
  } catch (e) {
    res.status(500).json({ error: 'Server error', detail: e.message });
  }
});

module.exports = router;