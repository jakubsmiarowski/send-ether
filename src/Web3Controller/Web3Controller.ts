import Web3 from 'web3';

declare const window: any;

class Web3Controller {
    web3 = new Web3(Web3.givenProvider);
    accounts: string[] = [];

    async getAccount() {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log("Account: ", account.toString());
    }

    async getBalance() {
        await this.web3.eth.getAccounts()
            .then(accounts => this.accounts = accounts);
        await this.web3.eth.getBalance(this.accounts[0], (err: Error, balance: string) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Balance: ', balance);
            }
            console.log(balance);
        })
            .then((balance: string)=> console.log('Balance: ', balance));
    }

    async sendCoins(transactionObject: Object) {
        await this.web3.eth.sendTransaction(transactionObject, (err: Error, result:any) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(result);
            }
        })
            .then((receipt) => console.log(receipt));
    }
}

const web3Service = new Web3Controller();
export default web3Service;



