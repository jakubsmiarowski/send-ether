import {useState} from "react";
import {ethers} from "ethers";
import useCurrencyModal from "./useCurrencyModal";

declare const window: any;

function useEthers() {

    const {state: { amount, currency, receiversAddress, transactionSpeed}} = useCurrencyModal()

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function getAccount() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log("Account: ", account.toString());
        }
    }

    async function sendCoins() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
            // const transaction = await contract.transfer(receiversAddress, amount);
            // await transaction.wait();
            // console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
        }
    }

    return { requestAccount, getAccount }
}

export default useEthers;
