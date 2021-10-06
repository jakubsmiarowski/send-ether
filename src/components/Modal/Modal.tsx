import React, {useContext} from "react";
import ReactDOM from "react-dom";
import {PacmanLoader} from "react-spinners";
import {AppContext} from "../../AppContext";
import Ethereum from '../../assets/img/ethereum-brands.svg'
import './Modal.scss';

interface IModalProps {
    show: boolean;
    title: string;
    close: () => void;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ({show, title, close, children}) => {

    const {
        ongoingTransaction: {
            setIsOngoingTransaction
        },
        pendingTransaction: {
            isPendingTransaction,
            setIsPendingTransaction
        }
    } = useContext(AppContext);

    const handlePropsActions = () => {
        close();
        setIsOngoingTransaction(false);
        setIsPendingTransaction(false);
    }

    return ReactDOM.createPortal(
        <>
            {
                show ?
                    <div className="container">
                        <div className="modal">
                            <header className="modal__header">
                                <div className="modal__header__title">
                                    <img className="modal__header__logo" src={Ethereum} alt='ethereum logo'/>
                                    <h2>{title}</h2>
                                </div>
                                <div className="modal__header__close" onClick={() => handlePropsActions()}>X</div>
                            </header>
                            <main className="modal__content">
                                {children}
                            </main>
                            {isPendingTransaction ?
                                <div className="modal--pacman">
                                    <PacmanLoader loading={isPendingTransaction} color='#f1c40f'/>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    : <div/>
            }
        </>
        ,
        modalRoot);
}

export default Modal;

