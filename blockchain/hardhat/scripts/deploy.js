const hre = require('hardhat')

async function main () {
  const MintFactory = await hre.ethers.getContractFactory('MintFactory')

  const mintFactory = await MintFactory.deploy()

  await mintFactory.deployed()

  console.log('Mint Factory deployed to: ', mintFactory.address)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
