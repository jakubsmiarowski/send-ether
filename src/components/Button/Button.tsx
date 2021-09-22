import React, {useCallback, useContext, useState} from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import useEthers from "../../hooks/useEthers";
import {AppContext} from "../../AppContext";
import userApiController from "../../controllers/UserApiController";
import {PacmanLoader} from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';

import Ethereum from '../../assets/img/ethereum-brands.svg'
import 'react-toastify/dist/ReactToastify.css';
import './Button.scss';

interface IButtonProps {
    clientId: string,
    clientSecret: string,
}

const Button: React.FC<IButtonProps> = ({ clientId, clientSecret}) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isPacman, setIsPacman ] = useState(false)

    const {getMetamaskAccount} = useEthers();
    const {
        ongoingTransaction: {
            isOngoingTransaction,
            setIsOngoingTransaction
        },
        pendingTransaction: {
            isPendingTransaction
        }
    } = useContext(AppContext)
    const toggleModal = () => setIsOpen(!isOpen);

    const checkPaymentGateStatus = async () => {
        const result = await userApiController.checkPaymentGateStatus(clientSecret);
        return result.substring(1, result.length-1);
    }

    const handleOpenModal = useCallback(async () => {
        setIsOngoingTransaction(true);
        setIsPacman(true);
        try {
            const paymentGateStatus = await checkPaymentGateStatus();
            if (paymentGateStatus === "DISABLED") {
                toast.error("Your Payment Gate is Disabled. You can activate it in admin.");
                setTimeout(() => {
                    setIsPacman(false)
                    setIsOngoingTransaction(false)
                }, 5500)
            } else if (paymentGateStatus === 'Can\'t find paymentGate with that id'){
                toast.error("There is no such Payment Gate. Can't make transactions without Payment Gate!");
                setTimeout(() => {
                    setIsPacman(false)
                    setIsOngoingTransaction(false)
                }, 5500)
            }
            else {
                toggleModal()
                await getMetamaskAccount(clientSecret);
                setIsPacman(false);
            }
        }
        catch (error) {
            throw new Error(error)
        }
    }, [checkPaymentGateStatus])

    return (
        <div className='wrapper'>
            <button className='button'
                    onClick={() => handleOpenModal()}
                    disabled={isOpen && isOngoingTransaction && isPendingTransaction}>
                <img className='button__logo' src={Ethereum} alt='ethereum logo' />
                {!isPendingTransaction && !isOngoingTransaction ? 'Send Ether' : ''}
                {isOngoingTransaction && !isPendingTransaction ? 'Transaction is in progress' : ''}
                {isPendingTransaction ? 'Transaction has been confirmed, please wait while it is being completed' : ''}
            </button>
            {isPacman ?
                <div className="button--pacman">
                    <PacmanLoader loading={isPacman} color='#f1c40f'/>
                </div>
                :
                null
            }
            <Modal show={isOpen}
                   title='Send Ether'
                   close={toggleModal}>
                <Form close={toggleModal} clientSecret={clientSecret} />
            </Modal>
            <ToastContainer position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover />
        </div>
    )
}

export default Button;
