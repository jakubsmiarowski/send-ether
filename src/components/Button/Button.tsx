import React, {useContext, useState} from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import useEthers from "../../hooks/useEthers";
import Ethereum from '../../assets/img/ethereum-brands.svg'
import './Button.scss';
import {AppContext} from "../../AppContext";

const Button: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {getAccount} = useEthers();
    const {
        ongoingTransaction: {
            isOngoingTransaction
        },
        pendingTransaction: {
            isPendingTransaction
        }
    } = useContext(AppContext)
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='wrapper'>
            <button className='button'
                    onClick={() => getAccount().then(() => toggle())}
                    disabled={isOpen && isOngoingTransaction && isPendingTransaction}>
                <img className='button__logo' src={Ethereum} alt='ethereum logo' />
                {!isPendingTransaction && !isOngoingTransaction ? 'Send Ether' : ''}
                {isOngoingTransaction && !isPendingTransaction ? 'Transaction is in progress' : ''}
                {isPendingTransaction ? 'Transaction has been confirmed, please wait while it is being completed' : ''}
            </button>
            <Modal show={isOpen}
                   title='Send Ether'
                   close={toggle}>
                <Form close={toggle} />
            </Modal>
        </div>
    )
};

export default Button;
