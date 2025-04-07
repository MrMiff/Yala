require('dotenv').config();
const { ethers } = require('ethers');
const solanaWeb3 = require('@solana/web3.js');
const evmConfig = require('../config/evmConfig');
const solanaConfig = require('../config/solanaConfig');

async function bridgeToSolana(amount) {
  // Inisialisasi provider dan wallet EVM
  const evmProvider = new ethers.providers.JsonRpcProvider(evmConfig.rpcUrl);
  const evmWallet = new ethers.Wallet(process.env.EVM_PRIVATE_KEY, evmProvider);

  // Inisialisasi koneksi dan wallet Solana
  const solanaConnection = new solanaWeb3.Connection(solanaConfig.rpcUrl, 'confirmed');
  const solanaWallet = solanaWeb3.Keypair.fromSecretKey(
    Buffer.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY))
  );

  // Interaksi dengan kontrak bridge di EVM
  const bridgeContract = new ethers.Contract(
    evmConfig.bridgeContractAddress,
    ['function bridgeToSolana(uint256 amount) public'],
    evmWallet
  );

  const tx = await bridgeContract.bridgeToSolana(ethers.utils.parseUnits(amount.toString(), 18));
  await tx.wait();

  console.log(`Bridging ${amount} YU to Solana initiated. Transaction Hash: ${tx.hash}`);

  // Proses selanjutnya: Mendengarkan event atau memantau status bridging
}

module.exports = { bridgeToSolana };
