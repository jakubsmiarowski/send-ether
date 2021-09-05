import {ethers} from "ethers";
import useCurrencyModal from "./useCurrencyModal";
import Token from '../artifacts/contracts/Token.sol/Token.json';

declare const window: any;

const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function useEthers() {

    const {state: { amount, receiversAddress }} = useCurrencyModal()
    //if (typeof window.ethereum !== 'undefined') to sprawdzenie musi być przy otwarciu modala

    async function getAccount() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log("Account: ", account.toString());
        }
    }

    async function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
            const balance = await contract.balanceOf(account);
            console.log("Balance: ", balance.toString());
        }
    }

    async function sendCoins(event:any) {
        event.preventDefault()
    
        if (typeof window.ethereum !== 'undefined') {
            await getAccount()
            // czy ja mam wystarczaojąco kasy aby przelać

            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // get all the accounts
            // const accounts = await web3.eth.getAccounts(); -> twój adres
            // web3.eth.sendTransaction()

            // ABI eth - https://ethereum.stackexchange.com/questions/32959/how-to-use-web3-to-send-money-from-wallet-a-to-wallet-b/32965

            // const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
            // const transaction = await contract.transfer(receiversAddress, amount);
            // await transaction.wait();
            console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
        }
    }

    return { getAccount, sendCoins, getBalance }
}

// static buyEventToken = (eventContract, userAddress, preciseAmount) => {
//     if (!eventContract) {
//       throw new Error('Event contract not initiated')
//     }
//     const value = toU256(preciseAmount)

//     return new Promise((resolve, reject) => {
//       eventContract.methods.buy()
//         .send({ from: userAddress, value })
//         .once('transactionHash', (txHash) => {
//           resolve({
//             success: true,
//             from: userAddress,
//             value,
//             txHash,
//           })
//         })
//         .catch((err) => {
//           reject(err)
//         });
//     })
//   }

export default useEthers;
