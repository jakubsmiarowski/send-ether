import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import './Form.scss';
import useCurrencyModal from "../../hooks/useCurrencyModal";
import FormFooter from "./FormFooter/FormFooter";
import FormInputs from "./FormInputs/FormInputs";

interface IFormProps {
    inputPlaceholder: string;
    close: () => void;
}

const currencies = ['Ether', 'ERC20'];
const transactionSpeed = ['Low', 'Medium', 'High']

const Form: React.FC<IFormProps> = ({inputPlaceholder, close}) => {

    const {state,
           actions: {
               handleSubmit,
               handleAmountInput,
               handleAddressInput,
               handleCurrency,
               handleSpeed
           }
    } = useCurrencyModal()

    return (
        <form onSubmit={handleSubmit}>
            {/*osobny komponent*/}
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
            {/*<FormInputs inputPlaceholder={inputPlaceholder} currencies={currencies} transactionSpeed={transactionSpeed} />*/}
            {/*osobny komponent*/}
            {state.currency === 'ERC20' ?
                <input type="text"
                       name="receiversAddress"
                       placeholder="Receivers Address"
                       value={state.receiversAddress}
                       onChange={handleAddressInput}/>
                :
                null
            }
            {/*osobny komponent*/}
            <footer className="form__footer">
                <button className="form-close" onClick={() => close()}>Cancel</button>
                <button className="submit" onClick={() => console.log(state)}>Submit</button>
            </footer>
            {/*<FormFooter close={close} />*/}
        </form>
    )
};

export default Form;
