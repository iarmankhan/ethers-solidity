import "dotenv/config";
import { ethers } from "ethers";
import * as fs from "fs-extra";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = new ethers.Wallet.fromEncryptedJson(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    // );
    //
    // wallet = (await wallet).connect(provider);

    const abi = fs.readFileSync(
        "./out/contracts_SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );

    const binary = fs.readFileSync(
        "./out/contracts_SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");

    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    console.log(`Contract address: ${contract.address}`);

    const currentFavoriteNumber = await contract.retrieve();
    console.log("Current favorite number:", currentFavoriteNumber.toString());
    const transactionResponse = await contract.store("7");
    await transactionResponse.wait(1);
    const newFavoriteNumber = await contract.retrieve();
    console.log("New favorite number:", newFavoriteNumber.toString());
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
