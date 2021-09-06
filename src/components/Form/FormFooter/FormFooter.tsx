import React, {Dispatch, SetStateAction} from "react";
import './FormFooter.scss';
import useEthers from "../../../hooks/useEthers";

interface IFormFooter {
    close: () => void;
    setIsOngoingTransaction: Dispatch<SetStateAction<boolean>>;
    setIsPendingTransaction: Dispatch<SetStateAction<boolean>>
}

const FormFooter: React.FC<IFormFooter> = ({ close, setIsOngoingTransaction, setIsPendingTransaction }) => {

    const { sendCoins } = useEthers();

    const handlePropsActions = () => {
        close();
        setIsOngoingTransaction(false);
        setIsPendingTransaction(false);
    }

    const transaction = (e: any) => {
        setIsPendingTransaction(true);
        sendCoins(e).then(() => handlePropsActions())
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
