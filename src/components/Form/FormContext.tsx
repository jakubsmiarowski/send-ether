import React from "react";
import useCurrencyModal, {initialState} from "../../hooks/useCurrencyModal";
import {FormState} from "../../assets/types/formState";
import {FormContextActions} from "../../assets/types/formContextActions";
import {CurrencyContextType} from "../../assets/types/currencyContextType";

const currencies = ['Ether', 'ERC20'];
const transactionSpeed = ['Low', 'Medium', 'High'];

export const FormContext = React.createContext<{state: FormState}>({state: initialState});

export const FormUpdateContext = React.createContext<{actions: FormContextActions}>({} as { actions: FormContextActions });

export const CurrencyContext = React.createContext<CurrencyContextType>({ currencies: [], transactionSpeed: []})

const ThemeProvider: React.FC = ({ children }) => {

    const {state, actions} = useCurrencyModal();

    return (
        <FormContext.Provider value={{state}} >
            <FormUpdateContext.Provider value={{actions}}>
                <CurrencyContext.Provider value={{currencies, transactionSpeed}}>
                    {children}
                </CurrencyContext.Provider>
            </FormUpdateContext.Provider>
        </FormContext.Provider>
    )
}

export default ThemeProvider;
