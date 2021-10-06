import {useContext} from "react";
import web3 from 'web3';
import {toast} from "react-toastify";

import {AppContext} from "../AppContext";
import web3Service from "../controllers/Web3Controller";
import userApiController from "../controllers/AdminApiController";
import {AdminTransactionObject} from "../assets/types/adminTransactionObject";
import {TransactionObject} from "../assets/types/transactionObject";

function useEthers() {

    const {
        state: {
            product,
            amount,
            receiversAddress,
            transactionSpeed
        },
        actions: {
            handleReset
        },
        ongoingTransaction: {
            setIsOngoingTransaction
        },
        pendingTransaction: {
            setIsPendingTransaction
        }
    } = useContext(AppContext)

    async function getMetamaskAccount(widgetToken: string) {
        try {
            await web3Service.getAccount();
            await userApiController.checkPaymentGateStatus(widgetToken);
        } catch (e) {
            throw new Error(e);
        }
        setIsOngoingTransaction(true);
    }

    async function getBalance() {
        await web3Service.getBalance();
        setIsPendingTransaction(true);
    }

    async function addTransactionToAdmin(txReceipt: AdminTransactionObject, widgetToken: string) {
        let status = '';
        if (txReceipt.to === txReceipt.from) {
            status = 'SELF';
        } else {
            status = 'OUT'
        }
        const adminTxObject: AdminTransactionObject = {
            to: txReceipt.to,
            from: txReceipt.from,
            status: status,
            product: product,
            widgetToken: widgetToken,
            gasUsed: txReceipt.gasUsed,
            value: amount
        }
        const result = await userApiController.registerTransactionInAdmin(adminTxObject);
        toast.success(`Transaction completed! You just bought ${product}`);
        handleReset();
        setIsPendingTransaction(false);
        return result
    }

    async function sendCoins(event: any, widgetToken: string) {
        event.preventDefault();
        try {
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
            const transactionObject: TransactionObject = {
                from: accounts[0],
                to: receiversAddress,
                value: web3.utils.toWei(amount, 'ether'),
                gasPrice: gasPrice,
            };
            const txReceipt: any = await web3Service.sendCoins(transactionObject);
            await addTransactionToAdmin(txReceipt, widgetToken);
        } catch (e) {
            throw new Error(e)
        }
    }

    return {
        getMetamaskAccount,
        sendCoins,
    }
}

export default useEthers;
