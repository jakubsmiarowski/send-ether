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
            tokenAddress,
            product
        },
        actions: {
            handleAmountInput,
            handleAddressInput,
            handleTokenAddressInput,
            handleCurrency,
            handleSpeed,
            handleProductInput
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
                <Input name="product"
                       placeholder="Product"
                       value={product}
                       action={handleProductInput} />
                {currency === 'ERC20' ?
                    // <Input name="tokenAddress"
                    //        placeholder="Token Address"
                    //        value={tokenAddress}
                    //        action={handleTokenAddressInput}/>
                    <div className="feature">This feature is not ready yet, keep an eye out!</div>
                    :
                    null
                }
            </div>
            <div className="form__content--dropdown">
                <Dropdown items={currencies}
                          callback={handleCurrency}
                          defaultValue='Ether'/>
                <Dropdown items={transactionSpeed}
                          callback={handleSpeed}
                          defaultValue='High'/>
            </div>
        </div>
    )
}

export default FormInputs;
