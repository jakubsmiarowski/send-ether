import React, {useState} from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

const Button: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen)
    return (
        <div>
            <button onClick={() => toggle()}>Send Ether</button>

            <Modal show={isOpen} title={'My Modal'} close={toggle}>
                <Form inputPlaceholder={'Amount'} dropdownPlaceholder={'Choose currency'} />
            </Modal>
        </div>
    )
}

export default Button;
