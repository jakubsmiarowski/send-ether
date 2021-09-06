import React, {Dispatch, SetStateAction, useContext} from "react";
import FormFooter from "./FormFooter/FormFooter";
import FormInputs from "./FormInputs/FormInputs";
import {AppContext} from '../../AppContext';


interface IFormProps {
    close: () => void;
    setIsOngoingTransaction: Dispatch<SetStateAction<boolean>>;
    setIsPendingTransaction: Dispatch<SetStateAction<boolean>>
    isPendingTransaction: boolean
}

const Form: React.FC<IFormProps> = ({ close, setIsOngoingTransaction, setIsPendingTransaction, isPendingTransaction }) => {

    const { actions: {handleSubmit} } = useContext(AppContext);
    return (
        <form onSubmit={handleSubmit} >
            <FormInputs isPendingTransaction={isPendingTransaction}/>
            <FormFooter close={close}
                        setIsOngoingTransaction={setIsOngoingTransaction}
                        setIsPendingTransaction={setIsPendingTransaction}/>
        </form>
    )
};

export default Form;
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
