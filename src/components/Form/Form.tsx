import React, {useState} from "react";
import Dropdown from "../Dropdown/Dropdown";
import './Form.scss';

interface IFormProps {
    inputPlaceholder: string;
    dropdownPlaceholder: string
}

type FormFields = {
    amount: string;
    currency: string;
    receiversAddress?: string;
}

const Form: React.FC<IFormProps> = ({inputPlaceholder, dropdownPlaceholder}) => {

    const [currency, setCurrency] = useState<string>('');
    const [formFields, setFormFields] = useState<FormFields>({
        amount: '',
        currency: '',
        receiversAddress: ''
    })

    const inputsHandler = (e: any) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: any) => {
        setFormFields({...formFields, currency})
        console.log(formFields);
        e.preventDefault()
    }

    const handleCallback = (childData: string) => {
        setCurrency(childData);
        console.log(currency);
        console.log(childData);
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
                    <Dropdown callback={handleCallback} title={dropdownPlaceholder}/>
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
