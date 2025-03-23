async function main() {
  const { ethers } = require("hardhat");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Create an instance of the contract
  const CoffeeTrack = await ethers.getContractFactory("CoffeeTrack");
  console.log("Deploying CoffeeTrack...");

  // Deploy contract with a higher gas limit
  const coffeeTrack = await CoffeeTrack.deploy({
    gasLimit: 20000000, // Increase to 20 million gas
  });

  console.log("Contract creation response:", coffeeTrack);

  // Check if deploy transaction exists
  if (!coffeeTrack.deployTransaction) {
    console.error("Error: Deployment transaction not found.");
    return;
  }

  console.log("Deploy transaction hash:", coffeeTrack.deployTransaction.hash);

  // Explicitly wait for transaction to be mined
  try {
    // This ensures the transaction is mined before proceeding
    const receipt = await coffeeTrack.deployTransaction.wait();
    console.log("Transaction mined:", receipt);
    console.log("CoffeeTrack contract deployed to:", coffeeTrack.address);
  } catch (error) {
    console.error("Error waiting for transaction to be mined:", error);
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });