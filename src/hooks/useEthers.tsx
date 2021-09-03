import {ethers} from "ethers";
import useCurrencyModal from "./useCurrencyModal";
import Token from '../artifacts/contracts/Token.sol/Token.json';

declare const window: any;

const tokenAddress = '0x1D5630816c9c5C1547Cc5745E195E45525C58737';

function useEthers() {

    const {state: { amount, currency, receiversAddress, transactionSpeed}} = useCurrencyModal()

    async function getAccount() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log("Account: ", account.toString());
        }
    }

    async function sendCoins() {
        if (typeof window.ethereum !== 'undefined') {
            await getAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
            const transaction = await contract.transfer(receiversAddress, amount);
            await transaction.wait();
            console.log(`${amount} Coins successfully sent to ${receiversAddress}`);
        }
    }

    return { getAccount, sendCoins }
}

export default useEthers;
