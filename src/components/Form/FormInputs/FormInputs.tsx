import React from "react";
import useCurrencyModal from "../../../hooks/useCurrencyModal";
import Dropdown from "../../Dropdown/Dropdown";

interface IFormInputs {
    inputPlaceholder: string;
    currencies: string[];
    transactionSpeed: string[];
}

const FormFooter: React.FC<IFormInputs> = ({ inputPlaceholder, currencies, transactionSpeed }) => {
    const {state, actions: { handleAmountInput, handleCurrency, handleSpeed}} = useCurrencyModal();
    return (
        <div className="form__content">
            <div>
                <input name='amount'
                       placeholder={inputPlaceholder}
                       value={state.amount}
                       onChange={handleAmountInput}/>
            </div>
            <div>
                <Dropdown items={currencies} callback={handleCurrency} title='Currency'/>
            </div>
            <div>
                <Dropdown items={transactionSpeed} callback={handleSpeed} title="Speed"/>
            </div>
        </div>
    )
}

export default FormFooter;
