import React, {useState} from "react";
import Dropdown from "../Dropdown/Dropdown";
import './Form.scss';
import useCurrencyModal from "../../hooks/useCurrencyModal";
import { FormState } from "../../hooks/FormState";


interface IFormProps {
    inputPlaceholder: string;
    dropdownPlaceholder: string
}

const currencies = ['Ether', 'ERC20'];
const transactionSpeed = ['Slow', 'Medium', 'Fast']

const Form: React.FC<IFormProps> = ({inputPlaceholder, dropdownPlaceholder}) => {

    // do wywalenia
    const [currency, setCurrency] = useState<string>('');
    const [speed, setSpeed] = useState<string>('');
    // use reducer
    const [formFields, setFormFields] = useState<FormState>({
        amount: '',
        currency: '',
        receiversAddress: '',
        transactionSpeed: ''
    })

    //useCurrencyModal

    const inputsHandler = (e: any) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: any) => {
        setFormFields({...formFields, currency, transactionSpeed: speed})
        console.log(formFields);
        e.preventDefault()
    }

    const handleCurrencyCallback = (childData: string) => {
        setCurrency(childData);
    };
    const handleSpeedCallback = (childData: string) => {
        setSpeed(childData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="test">
                <div>
                    <input name='amount'
                           placeholder={inputPlaceholder}
                           value={formFields.amount}
                           onChange={inputsHandler}/>
                </div>
                <div>
                    <Dropdown items={currencies} callback={handleCurrencyCallback} title={dropdownPlaceholder}/>
                </div>
                <div>
                    <Dropdown items={transactionSpeed} callback={handleSpeedCallback} title="Speed"/>
                </div>
            </div>
            {formFields.currency === 'ERC20' ?
                <input type="text"
                       name="receiversAddress"
                       placeholder="Receivers Address"
                       value={formFields.receiversAddress}
                       onChange={inputsHandler}/>
                :
                null
            }
            <button className="submit">Submit</button>
        </form>
    )
}

export default Form;
