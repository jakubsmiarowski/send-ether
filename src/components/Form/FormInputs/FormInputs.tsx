import React, {useContext} from "react";
import Dropdown from "../../Dropdown/Dropdown";
import {AppContext} from "../../../AppContext";
import Input from "../../Input/Input";
import './FormInputs.scss';

const FormInputs: React.FC = () => {

    const {
        state: {
            amount,
            currency,
            receiversAddress,
            tokenAddress
        },
        actions: {
            handleAmountInput,
            handleAddressInput,
            handleTokenAddressInput,
            handleCurrency,
            handleSpeed
        },
        dropdownOptions: {
            currencies,
            transactionSpeed
        }
    } = useContext(AppContext)

    return (
        <div className="form__content">
            <div className="form__content--input">
                <Input name='amount'
                       placeholder='Amount'
                       value={amount}
                       action={handleAmountInput}/>
                <Input name="receiversAddress"
                       placeholder="Receivers Address"
                       value={receiversAddress}
                       action={handleAddressInput} />
                {currency === 'ERC20' ?
                    <Input name="tokenAddress"
                           placeholder="Token Address"
                           value={tokenAddress}
                           action={handleTokenAddressInput}/>
                    :
                    null
                }
            </div>
            <div className="form__content--dropdown">
                <Dropdown items={currencies}
                          callback={handleCurrency}
                          title='Currency'/>
                <Dropdown items={transactionSpeed}
                          callback={handleSpeed}
                          title="Speed" />
            </div>
        </div>
    )
}

export default FormInputs;
