import React, {useContext} from "react";
import Dropdown from "../../Dropdown/Dropdown";
import {AppContext} from "../../../AppContext";
import Input from "../../Input/Input";
import './FormInputs.scss';
import PacmanLoader from "react-spinners/PacmanLoader";

interface IFormInputsProps {
    isPendingTransaction: boolean
}

const FormInputs: React.FC<IFormInputsProps> = ({isPendingTransaction}) => {

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
                <Input name='amount' placeholder='Amount' value={amount} action={handleAmountInput} isPendingTransaction={isPendingTransaction}/>
                <Input name="receiversAddress" placeholder="Receivers Address" value={receiversAddress} action={handleAddressInput} isPendingTransaction={isPendingTransaction} />
                {currency === 'ERC20' ?
                    <Input name="tokenAddress" placeholder="Token Address" value={tokenAddress} action={handleTokenAddressInput} isPendingTransaction={isPendingTransaction}/>
                    :
                    null
                }
            </div>
            <div className="form__content--dropdown">
                <Dropdown items={currencies} callback={handleCurrency} title='Currency'/>
                <Dropdown items={transactionSpeed} callback={handleSpeed} title="Speed"/>
            </div>
            <div className="form__content--pacman">
                <PacmanLoader loading={isPendingTransaction} color='#8C8C8C'/>
            </div>
        </div>
    )
}

export default FormInputs;
