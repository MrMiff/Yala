require('dotenv').config();
const { ethers } = require('ethers');
const solanaWeb3 = require('@solana/web3.js');
const evmConfig = require('../config/evmConfig');
const solanaConfig = require('../config/solanaConfig');

async function bridgeToEVM(amount) {
  // Inisialisasi koneksi dan wallet Solana
  const solanaConnection = new solanaWeb3.Connection(solanaConfig.rpcUrl, 'confirmed');
  const solanaWallet = solanaWeb3.Keypair.fromSecretKey(
    Buffer.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY))
  );

  // Interaksi dengan program bridge di Solana
  // Catatan: Implementasi spesifik tergantung pada program bridge Yala di Solana
  // Misalnya, mengirim instruksi ke program bridge dengan parameter yang sesuai

  console.log(`Bridging ${amount} YU to EVM initiated.`);

  // Proses selanjutnya: Mendengarkan event atau memantau status bridging
}

module.exports = { bridgeToEVM };
