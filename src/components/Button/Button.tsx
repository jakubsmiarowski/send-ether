import React, {useState} from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import Ethereum from '../../assets/img/ethereum-brands.svg'
import './Button.scss';

const Button: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen)
    return (
        <div className='wrapper'>
            <button className='button' onClick={() => toggle()} disabled={isOpen}>
                <img className='button_logo' src={Ethereum} alt='ethereum logo' />
                Send Ether
            </button>
            <Modal show={isOpen} title={'Send Ether'} close={toggle}>
                <Form inputPlaceholder={'Amount'} close={toggle} />
            </Modal>
        </div>
    )
}

export default Button;


