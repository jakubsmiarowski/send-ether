import React from "react";
import useCurrencyModal, {initialState} from "./hooks/useCurrencyModal";
import {FormState} from "./assets/types/formState";
import {FormContextActions} from "./assets/types/formContextActions";
import {DropdownContextType} from "./assets/types/currencyContextType";

const dropdownOptions: DropdownContextType = {
    currencies: ['Ether', 'ERC20'],
    transactionSpeed: ['Low', 'Medium', 'High']
}

export const AppContext = React.createContext<{
    state: FormState,
    actions: FormContextActions,
    dropdownOptions: DropdownContextType
}>({
    state: initialState,
    actions: {} as FormContextActions,
    dropdownOptions: { currencies: [], transactionSpeed: []}
    }
)

const AppProvider: React.FC = ({ children }) => {

    const {state, actions} = useCurrencyModal();

    return (
        <AppContext.Provider value={{state, actions, dropdownOptions}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
