import Token from '../artifacts/contracts/Token.sol/Token.json';
import useUpdateLogger from "./useUpdateLogger";
import Web3Provider from "web3-react";
import {useContext, useState} from "react";
import {AppContext} from "../AppContext";

declare const window: any;
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

function useEthers() {

    const { state: { amount, receiversAddress } } = useContext(AppContext)
    const [balance, setBalance] = useState<string>('');
    const [isOngoingTransaction, setIsOngoingTransaction] = useState<boolean>(false);
    const [isPendingTransaction, setIsPendingTransaction] = useState<boolean>(false);

    async function getAccount() {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log("Account: ", account.toString());
        setIsOngoingTransaction(true);
        // Web3Controller.getAccount()
    }

    async function getBalance() {
        const accounts = await web3.eth.getAccounts();
        web3.currentProvider.sendAsync({
            method: 'personal_sign',
            params: [
                web3.utils.fromAscii('Personal Sign needed to check balance'),
                accounts[0],
            ],
            from: accounts[0],
        }, function (err: any, result: any) {
            console.log(err, result);
        });
        await web3.eth.getBalance(accounts[0], (err: Error, bal: string) => console.log(bal))
            .then((result: any)=> setBalance(web3.utils.fromWei(result, 'ether')));
        setIsPendingTransaction(true);
    }

    async function sendCoins(event:any) {
        event.preventDefault();
        await getBalance();
        const accounts = await web3.eth.getAccounts();
        const transactionObject = {
            from: accounts[0],
            to: receiversAddress,
            value: web3.utils.toWei(amount, 'ether')
        }
        // Web3Controller.send(transactionObject)

        await web3.eth.sendTransaction(transactionObject)
            .then((receipt: any) => console.log(receipt))
        // ABI eth - https://ethereum.stackexchange.com/questions/32959/how-to-use-web3-to-send-money-from-wallet-a-to-wallet-b/32965

        // const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        // const transaction = await contract.transfer(receiversAddress, amount);
        // await transaction.wait();
        // await setIsOngoingTransaction(true);
        console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
    }

    return { getAccount, sendCoins, isPendingTransaction, setIsPendingTransaction, isOngoingTransaction, setIsOngoingTransaction, balance }
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
