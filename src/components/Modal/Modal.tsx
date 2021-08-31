import React from "react";
import ReactDOM from "react-dom";
import './Modal.scss';

interface IModalProps {
    show: boolean;
    title: string;
    close: () => void;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ show, title, close, children }) => {
    return ReactDOM.createPortal(
        <>
            {
                show ?
                    <div className="modalContainer">
                        <div className="modal" >
                            <header className="modal_header">
                                <h2 className="modal_header-title">{title}</h2>
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
