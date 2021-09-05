import React, {useContext} from "react";
import Dropdown from "../../Dropdown/Dropdown";
import {CurrencyContext, FormContext, FormUpdateContext} from "../FormContext";
import useUpdateLogger from "../../../hooks/useUpdateLogger";
import Input from "../../Input/Input";

const FormInputs: React.FC = () => {

    const { state } = useContext(FormContext);
    const { actions } = useContext(FormUpdateContext);
    const { currencies, transactionSpeed } = useContext(CurrencyContext);
    useUpdateLogger(state);

    return (
        <div className="form__content">
            <div className="form__content--flex">
                <Input name='amount' placeholder='Amount' value={state.amount} action={actions.handleAmountInput} />
                <Input name="receiversAddress" placeholder="Receivers Address" value={state.receiversAddress} action={actions.handleAddressInput} />
                {state.currency === 'ERC20' ?
                    <Input name="tokenAddress" placeholder="Token Address" value={state.tokenAddress} action={actions.handleTokenAddressInput} />
                    :
                    null
                }
            </div>
            <div className="form__content--dropdown">
                <Dropdown items={currencies} callback={actions.handleCurrency} title='Currency'/>
                <Dropdown items={transactionSpeed} callback={actions.handleSpeed} title="Speed"/>
            </div>
        </div>
    )
}

export default FormInputs;
