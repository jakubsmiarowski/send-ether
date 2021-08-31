import React, {useState} from "react";
import Dropdown from "../Dropdown/Dropdown";
import './Form.scss';

interface IFormProps {
    inputPlaceholder: string;
    dropdownPlaceholder: string
}

const Form: React.FC<IFormProps> = ({inputPlaceholder, dropdownPlaceholder}) => {

    const [currency, setCurrency] = useState<string>('');
    const [formFields, setFormFields] = useState({
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
        // console.log(currency);
        // console.log(childData);
        setCurrency(childData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="test">
                <input name='amount' placeholder={inputPlaceholder} value={formFields.amount} onChange={inputsHandler}/>
                <Dropdown callback={handleCallback} title={dropdownPlaceholder}/>
            </div>
            {formFields.currency === 'ERC20' ? <input type="text" placeholder="Receivers Address"/> : null}
            <button className="submit">Submit</button>
        </form>
    )
}

export default Form;
