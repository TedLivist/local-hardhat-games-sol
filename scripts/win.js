// add the game address here and update the contract name if necessary
const gameAddr = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:

    const signer = ethers.provider.getSigner(0);
    const funder = ethers.provider.getSigner(1);

    console.log(await signer.getAddress());
    // const address = await signer.getAddress();
    // console.log(await ethers.provider.getBalance(address));
    console.log(await signer.getBalance());
    console.log(ethers.utils.formatEther(await signer.getBalance()));

    console.log(ethers.utils.formatEther(await funder.getBalance()));

    const sendEth = await funder.sendTransaction({
      to: signer.getAddress(),
      value: ethers.utils.parseEther("1000.0")
    });
    await sendEth.wait();
    console.log("Funded signer with 1000 ETH!")

    console.log(ethers.utils.formatEther(await funder.getBalance()));
    console.log(ethers.utils.formatEther(await signer.getBalance()));

    const allow = await game.giveMeAllowance(10100);
    await allow.wait();
    const mint = await game.mint(10005);
    await mint.wait();

    const tx = await game.win();

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
