import React from "react";
import ReactDOM from "react-dom";
import './Modal.scss';
import Ethereum from '../../assets/img/ethereum-brands.svg'
import useEthers from "../../hooks/useEthers";
import useCurrencyModal from "../../hooks/useCurrencyModal";

interface IModalProps {
    show: boolean;
    title: string;
    close: () => void;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ show, title, close, children }) => {

    const { getAccount, getBalance, sendCoins } = useEthers();

    return ReactDOM.createPortal(
        <>
            {
                show ?
                    <div className="container">
                        <div className="modal" >
                            <header className="modal__header">
                                <div className="modal__header__title">
                                    <img className="modal__header__logo" src={Ethereum} />
                                    <h2>{title}</h2>
                                </div>
                                <div className="modal__header__close" onClick={() => close()}>X</div>
                            </header>
                            <main className="modal__content">
                                {children}
                            </main>
                            <button onClick={getAccount}> get account</button>
                            <button onClick={getBalance}> get balance</button>
                            <button onClick={sendCoins}> send </button>
                        </div>
                    </div>
                    : <div />
            }
        </>
    ,
        modalRoot);
}

export default Modal;
