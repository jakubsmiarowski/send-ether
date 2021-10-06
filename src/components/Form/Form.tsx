import React, {useContext} from "react";
import {AppContext} from '../../AppContext';
import FormFooter from "./FormFooter/FormFooter";
import FormInputs from "./FormInputs/FormInputs";

interface IFormProps {
    close: () => void;
    clientSecret: string | undefined;
}

const Form: React.FC<IFormProps> = ({close, clientSecret}) => {

    const {actions: {handleSubmit}} = useContext(AppContext);
    return (
        <form onSubmit={handleSubmit}>
            <FormInputs/>
            <FormFooter close={close} clientSecret={clientSecret}/>
        </form>
    )
};

export default Form;

