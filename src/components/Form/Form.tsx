import React from "react";
import './Form.scss';
import useCurrencyModal from "../../hooks/useCurrencyModal";
import FormFooter from "./FormFooter/FormFooter";
import FormInputs from "./FormInputs/FormInputs";
import useEthers from "../../hooks/useEthers";
import FormProvider from './FormContext'

interface IFormProps {
    close: () => void;
}

const Form: React.FC<IFormProps> = ({ close }) => {

    const { actions } = useCurrencyModal();
    const { sendCoins } = useEthers();

    return (
        <FormProvider>
            <form onSubmit={actions.handleSubmit}>
                <FormInputs />
                <FormFooter close={close} />
            </form>
        </FormProvider>
    )
};

export default Form;
