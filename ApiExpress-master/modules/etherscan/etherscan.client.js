const axios = require('axios');
const Wallet = require('../wallet/wallet.model'); // Asegúrate de que la ruta al modelo es correcta

const ethApiKey = "SRX4R8IP7EFJMXX3IZYWB9882YFFH1KH4I";
const API_URL = 'https://api.etherscan.io/api';

async function getAndStoreWalletBalance(walletAddress) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                module: 'account',
                action: 'balance',
                address: walletAddress,
                tag: 'latest',
                apiKey: ethApiKey
            }
        });

        if (response.data.status !== "1") {
            throw new Error('Error al obtener el saldo de la wallet: ' + response.data.message);
        }

        const balanceInWei = BigInt(response.data.result);
        const divisor = BigInt(1e18);
        const balanceInEth = balanceInWei / divisor; // Realizar la división en BigInt

        console.log(`Balance in ETH (BigInt): ${balanceInEth}`); // Imprimir el balance en ETH como BigInt

        // Convertir el resultado final de BigInt a Number para facilitar el manejo en JavaScript
        const balanceInEthNumber = Number(balanceInWei) / 1e18;
        
        console.log(`Balance in ETH (Number): ${balanceInEthNumber}`); // Imprimir el balance convertido a Number

        const existingWallet = await Wallet.findOneAndUpdate(
            { address: walletAddress },
            { balance: balanceInEthNumber },
            { new: true, upsert: true, returnOriginal: false }
        );

        return existingWallet;  // Devolver el objeto de la wallet actualizado
    } catch (error) {
        console.error('Error al obtener o guardar el saldo de la wallet:', error);
        throw error;
    }
}

module.exports = getAndStoreWalletBalance;
