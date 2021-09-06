import React, {useState} from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import useEthers from "../../hooks/useEthers";
import Ethereum from '../../assets/img/ethereum-brands.svg'
import './Button.scss';

const Button: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {getAccount, isOngoingTransaction, setIsOngoingTransaction, isPendingTransaction, setIsPendingTransaction} = useEthers();
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='wrapper'>
            <button className='button'
                    onClick={() => getAccount().then(() => toggle())}
                    disabled={isOpen && isOngoingTransaction && isPendingTransaction}>
                <img className='button__logo' src={Ethereum} alt='ethereum logo' />
                {!isPendingTransaction && !isOngoingTransaction ? 'Send Ether' : ''}
                {isOngoingTransaction && !isPendingTransaction ? 'Transaction is in process' : ''}
                {isPendingTransaction ? 'Transaction has been confirmed, please wait while it is being completed' : ''}
            </button>
            <Modal show={isOpen}
                   title='Send Ether'
                   close={toggle}
                   setIsPendingTransaction={setIsPendingTransaction}
                   setIsOngoingTransaction={setIsOngoingTransaction}>
                <Form close={toggle}
                      setIsOngoingTransaction={setIsOngoingTransaction}
                      setIsPendingTransaction={setIsPendingTransaction}
                      isPendingTransaction={isPendingTransaction}/>
            </Modal>
        </div>
    )
};

export default Button;
