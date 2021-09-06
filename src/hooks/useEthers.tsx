import Token from '../artifacts/contracts/Token.sol/Token.json';
import {useContext} from "react";
import {AppContext} from "../AppContext";
import web3Service from "../Web3Controller/Web3Controller";

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

function useEthers() {

    const {
        state: {
            currency,
            amount,
            receiversAddress,
            transactionSpeed
        },
        ongoingTransaction: {
            setIsOngoingTransaction
        },
        pendingTransaction: {
            setIsPendingTransaction
        }
    } = useContext(AppContext)

    async function getAccount() {
        setIsOngoingTransaction(true);
        await web3Service.getAccount();
    }

    async function getBalance() {
        await web3Service.getBalance();
        setIsPendingTransaction(true);
    }

    async function sendCoins(event:any) {
        event.preventDefault();
        await getBalance();
        const accounts = await web3.eth.getAccounts();
        let transactionObject = {
            from: accounts[0],
            to: receiversAddress,
            value: web3.utils.toWei(amount, 'ether'),
        };
        // if (transactionSpeed === 'Low') {
        //     Object.assign(transactionObject, { gasPrice: 1000})
        // } else if (transactionSpeed === 'Medium') {
        //     Object.assign(transactionObject, { gasPrice: 10000})
        // } else {
        //     Object.assign(transactionObject, { gasPrice: 1000000})
        // }

        await web3Service.sendCoins(transactionObject);
        console.log(web3Service.accounts)
        // ABI eth - https://ethereum.stackexchange.com/questions/32959/how-to-use-web3-to-send-money-from-wallet-a-to-wallet-b/32965

        // const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        // const transaction = await contract.transfer(receiversAddress, amount);
        // await transaction.wait();
        // await setIsOngoingTransaction(true);
        console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
    }

    return {
        getAccount,
        getBalance,
        sendCoins,
    }
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
