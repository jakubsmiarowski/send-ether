import React, {useContext} from "react";
import './FormFooter.scss';
import useEthers from "../../../hooks/useEthers";
import {AppContext} from "../../../AppContext";

interface IFormFooter {
    close: () => void;
}

const FormFooter: React.FC<IFormFooter> = ({ close }) => {

    const { sendCoins } = useEthers();
    const { ongoingTransaction: {setIsOngoingTransaction}, pendingTransaction: {setIsPendingTransaction} } = useContext(AppContext);

    const handlePropsActions = () => {
        close();
        setIsOngoingTransaction(false);
        setIsPendingTransaction(false);
    }

    async function transaction(e: any) {
        setIsPendingTransaction(true);
        await sendCoins(e).then(() => handlePropsActions())
    }

    return (
        <footer className="form__footer">
            <button className="form-close" onClick={() => handlePropsActions()}>
                Cancel
            </button>
            <button className="submit" onClick={transaction}>Submit</button>
        </footer>
    )
}

export default FormFooter;
