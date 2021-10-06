import React, {useContext} from "react";
import './FormFooter.scss';
import useEthers from "../../../hooks/useEthers";
import {AppContext} from "../../../AppContext";

interface IFormFooter {
    close: () => void;
    clientSecret: string | undefined;
}

const FormFooter: React.FC<IFormFooter> = ({close, clientSecret}) => {

    const {sendCoins} = useEthers();
    const {
        state: {amount, product, receiversAddress, transactionSpeed},
        ongoingTransaction: {setIsOngoingTransaction},
        pendingTransaction: {isPendingTransaction, setIsPendingTransaction}
    } = useContext(AppContext);

    const handlePropsActions = () => {
        close();
        setIsOngoingTransaction(false);
        setIsPendingTransaction(false);
    }

    async function transaction(e: any) {
        if (clientSecret !== undefined) {
            setIsPendingTransaction(true);
            await sendCoins(e, clientSecret).then(() => handlePropsActions());
        }
    }

    return (
        <footer className="form__footer">
            <button className="form-close" onClick={() => handlePropsActions()}>
                Cancel
            </button>
            <button
                className={product === '' || receiversAddress === '' || amount === '' || transactionSpeed === '' || isPendingTransaction ? 'submit-disabled' : 'submit'}
                onClick={transaction}
                disabled={product === '' || receiversAddress === '' || amount === '' || transactionSpeed === '' || isPendingTransaction}>
                Submit
            </button>
        </footer>
    )
}

export default FormFooter;
