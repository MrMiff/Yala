const inquirer = require('inquirer');
const { bridgeToSolana } = require('./scripts/bridgeToSolana');
const { bridgeToEVM } = require('./scripts/bridgeToEVM');

async function main() {
  const { direction, amount } = await inquirer.prompt([
    {
      type: 'list',
      name: 'direction',
      message: 'Pilih arah bridging:',
      choices: ['EVM ke Solana', 'Solana ke EVM'],
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Masukkan jumlah YU yang ingin di-bridge:',
      validate: (input) => !isNaN(input) && Number(input) > 0,
    },
  ]);

  if (direction === 'EVM ke Solana') {
    await bridgeToSolana(Number(amount));
  } else {
    await bridgeToEVM(Number(amount));
  }
}

main().catch(console.error);
