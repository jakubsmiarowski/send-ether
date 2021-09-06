import React, {Dispatch, SetStateAction} from "react";
import ReactDOM from "react-dom";
import './Modal.scss';
import Ethereum from '../../assets/img/ethereum-brands.svg'

interface IModalProps {
    show: boolean;
    title: string;
    close: () => void;
    setIsPendingTransaction: Dispatch<SetStateAction<boolean>>;
    setIsOngoingTransaction: Dispatch<SetStateAction<boolean>>;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ show, title, close, setIsPendingTransaction, setIsOngoingTransaction, children }) => {

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
                        <div className="modal" >
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
                        </div>
                    </div>
                    : <div />
            }
        </>
    ,
        modalRoot);
}

export default Modal;
