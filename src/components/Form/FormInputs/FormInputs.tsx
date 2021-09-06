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
        },
        pendingTransaction: { isPendingTransaction }
    } = useContext(AppContext)

    return (
        <div className="form__content">
            <div className="form__content--input">
                <Input name='amount'
                       placeholder='Amount'
                       value={amount}
                       action={handleAmountInput}
                       isPendingTransaction={isPendingTransaction}/>
                <Input name="receiversAddress"
                       placeholder="Receivers Address"
                       value={receiversAddress}
                       action={handleAddressInput}
                       isPendingTransaction={isPendingTransaction} />
                {currency === 'ERC20' ?
                    <Input name="tokenAddress"
                           placeholder="Token Address"
                           value={tokenAddress}
                           action={handleTokenAddressInput}
                           isPendingTransaction={isPendingTransaction}/>
                    :
                    null
                }
            </div>
            <div className="form__content--dropdown">
                <Dropdown items={currencies} callback={handleCurrency} title='Currency' isPendingTransaction={isPendingTransaction}/>
                <Dropdown items={transactionSpeed} callback={handleSpeed} title="Speed" isPendingTransaction={isPendingTransaction}/>
            </div>
        </div>
    )
}

export default FormInputs;
