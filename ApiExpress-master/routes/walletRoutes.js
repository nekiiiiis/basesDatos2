const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet'); // Asegúrate de tener un modelo de Mongoose para Wallet

// Obtener datos de wallet
router.get('/wallet/:address', async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ address: req.params.address });
        res.json(wallet);
    } catch (error) {
        console.error("Error retrieving wallet data:", error);
        res.status(500).json({ error: 'Failed to retrieve wallet data' });
    }
});

// Crear una nueva wallet
router.post('/wallets', async (req, res) => {
    try {
        const newWallet = new Wallet({
            address: req.body.address,
            balance: req.body.balance // Asumimos que el balance inicial es proporcionado o default es 0
        });
        await newWallet.save();
        res.status(201).json(newWallet);
    } catch (error) {
        console.error("Error creating wallet:", error);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
});

// Actualizar una wallet
router.put('/wallet/:address', async (req, res) => {
    try {
        const updatedWallet = await Wallet.findOneAndUpdate(
            { address: req.params.address },
            { $set: req.body },
            { new: true }
        );
        res.json(updatedWallet);
    } catch (error) {
        console.error("Error updating wallet:", error);
        res.status(500).json({ error: 'Failed to update wallet' });
    }
});

// Eliminar una wallet
router.delete('/wallet/:address', async (req, res) => {
    try {
        await Wallet.findOneAndDelete({ address: req.params.address });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting wallet:", error);
        res.status(500).json({ error: 'Failed to delete wallet' });
    }
});

module.exports = router;
