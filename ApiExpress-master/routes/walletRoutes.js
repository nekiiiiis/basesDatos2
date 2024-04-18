const express = require('express');
const router = express.Router();
const getAndStoreWalletBalance = require('../modules/etherscan/etherscan.client');

router.get('/wallet/:address', async (req, res) => {
    try {
        const walletData = await getAndStoreWalletBalance(req.params.address);
        res.json(walletData);
    } catch (error) {
        console.error("Error retrieving wallet data:", error);
        res.status(500).json({ error: 'Failed to retrieve wallet data' });
    }
});

module.exports = router;
