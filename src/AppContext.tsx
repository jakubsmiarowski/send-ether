import React from "react";
import useCurrencyModal, {initialState} from "./hooks/useCurrencyModal";
import {FormStateType} from "./assets/types/formStateType";
import {FormContextActions} from "./assets/types/formContextActions";
import {DropdownContextType} from "./assets/types/currencyContextType";
import {OngoingTransactionType} from "./assets/types/ongoingTransactionType";
import {PendingTransactionType} from "./assets/types/pendingTransactionType";

const dropdownOptions: DropdownContextType = {
    currencies: ['Ether', 'ERC20'],
    transactionSpeed: ['Low', 'Medium', 'High']
}

export const AppContext = React.createContext<{
    state: FormStateType,
    actions: FormContextActions,
    dropdownOptions: DropdownContextType,
    ongoingTransaction: OngoingTransactionType,
    pendingTransaction: PendingTransactionType
}>({
    state: initialState,
    actions: {} as FormContextActions,
    dropdownOptions: { currencies: [], transactionSpeed: []},
    ongoingTransaction: {} as OngoingTransactionType,
    pendingTransaction: {} as PendingTransactionType
    }
)

const AppProvider: React.FC = ({ children }) => {

    const {state, actions, ongoingTransaction, pendingTransaction} = useCurrencyModal();

    return (
        <AppContext.Provider value={{state, actions, dropdownOptions, ongoingTransaction, pendingTransaction}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
