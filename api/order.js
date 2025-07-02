const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csvPath = path.join(__dirname, '..', 'data', 'orders.csv');
let idCounter = 0;

if (fs.existsSync(csvPath)) {
    const data = fs.readFileSync(csvPath, 'utf-8').trim().split('\n');
    const lastLine = data[data.length - 1];
    const lastId = parseInt(lastLine.split(',')[0], 10);
    if (!isNaN(lastId)) idCounter = lastId + 1;
}

router.post('/', (req, res) => {
    const order = req.body;
    const orderId = Date.now();
    const createdAt = new Date().toISOString();
    const userName = `${order.firstName} ${order.lastName}`;
    const status = 0;

    const rows = order.cart.map(item => {
        return [
            idCounter++,
            orderId,
            status,
            userName,
            item.id,
            item.colorId,
            item.size,
            item.quantity,
            createdAt
        ].join(',');
    });

    const finalCsv = rows.join('\n') + '\n';

    fs.appendFile(csvPath, finalCsv, (err) => {
        if (err) {
            console.error('CSV Write Error:', err);
            return res.status(500).send('Failed to write order');
        }
        res.status(200).send('Order saved');
    });
});

module.exports = router;
