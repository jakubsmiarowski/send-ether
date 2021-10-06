import Web3 from 'web3';
import {TransactionObject} from "../assets/types/transactionObject";

declare const window: any;

class Web3Controller {
    web3 = new Web3(Web3.givenProvider);
    accounts: string[] = [];
    gasPrice: string = '';
    convertFromWei(amount: string) {
        return this.web3.utils.fromWei(amount, 'ether');
    }

    async getGasPrice() {
        return this.web3.eth.getGasPrice();
    }

    async getAccount() {
        const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
        console.log("Account: ", account.toString());
    }

    async getBalance() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            this.accounts = accounts;
            const balance = await this.web3.eth.getBalance(accounts[0]);
            return balance.toString();
        } catch (err) {
            throw new Error(err)
        }
    }

    async sendCoins(transactionObject: TransactionObject) {
        try {
            return await this.web3.eth.sendTransaction(transactionObject)
        } catch (err) {
            throw new Error(err)
        }
    }
}

const web3Service = new Web3Controller();
export default web3Service;
