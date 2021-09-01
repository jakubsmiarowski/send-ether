import React from "react";
import ReactDOM from "react-dom";
import './Modal.scss';
import Ethereum from '../../assets/img/ethereum-brands.svg'


interface IModalProps {
    show: boolean;
    title: string;
    close: () => void;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ show, title, close, children }) => {

    // const childrenWithProps = React.Children.map(children, ((child, index) => {
    //     return React.cloneElement((child), {close, index})
    // }))

    //children clone with props
    // close wprowadzić do children
    return ReactDOM.createPortal(
        <>
            {
                show ?
                    <div className="modalContainer">
                        <div className="modal" >
                            <header className="modal_header">
                                <div className="modal_header-title">
                                    <img className="modal_header-logo" src={Ethereum} />
                                    <h2>{title}</h2>
                                </div>
                                <div className="close" onClick={() => close()}>X</div>
                            </header>
                            <main className="modal_content">
                                {children}
                            </main>
                            <footer className="modal_footer">
                                <button className="modal-close" onClick={() => close()}>
                                    Cancel
                                </button>
                                <button className="submit">Submit</button>
                            </footer>
                        </div>
                    </div>
                    : null
            }
        </>
    ,
        modalRoot);
}

export default Modal;
// <img className="logo" src={Ethereum} />
