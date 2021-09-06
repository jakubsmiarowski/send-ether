import React, {useContext} from "react";
import FormFooter from "./FormFooter/FormFooter";
import FormInputs from "./FormInputs/FormInputs";
import {AppContext} from '../../AppContext';

interface IFormProps {
    close: () => void;
}

const Form: React.FC<IFormProps> = ({ close }) => {

    const { actions: {handleSubmit} } = useContext(AppContext);
    return (
        <form onSubmit={handleSubmit} >
            <FormInputs/>
            <FormFooter close={close} />
        </form>
    )
};

export default Form;
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
