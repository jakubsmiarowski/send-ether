import Token from '../artifacts/contracts/Token.sol/Token.json';
import {useContext} from "react";
import {AppContext} from "../AppContext";
import web3Service from "../Web3Controller/Web3Controller";

interface TransactionObject {
    from: string;
    to: string;
    value: string;
    gasPrice: number;
}

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
        await web3Service.getAccount();
        setIsOngoingTransaction(true);
    }

    async function getBalance() {
        await web3Service.getBalance();
        setIsPendingTransaction(true);
    }

    async function sendCoins(event:any) {
        console.log(event);
        event.preventDefault();
        await getBalance();
        let gasPrice: number = 0;
        await web3Service.getGasPrice()
            .then(price => {
                if (transactionSpeed === 'High') {
                    gasPrice = parseInt(price) * 3;
                } else if (transactionSpeed === 'Medium') {
                    gasPrice = parseInt(price) * 1.5;
                } else {
                    gasPrice = parseInt(price);
                }
            });
        const accounts = web3Service.accounts;
        let transactionObject: TransactionObject = {
            from: accounts[0],
            to: receiversAddress,
            value: web3Service.convertToWei(amount),
            gasPrice: gasPrice,
        };
        await web3Service.sendCoins(transactionObject);

        // ABI eth - https://ethereum.stackexchange.com/questions/32959/how-to-use-web3-to-send-money-from-wallet-a-to-wallet-b/32965
        // const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        // const transaction = await contract.transfer(receiversAddress, amount);
        // await transaction.wait();
        // await setIsOngoingTransaction(true);
        // console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
    }

    return {
        getAccount,
        getBalance,
        sendCoins,
    }
}


export default useEthers;
