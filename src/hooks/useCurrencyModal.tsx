import {Reducer, useReducer, useState} from "react";
import {FormState} from "./FormState";

type CurrencyActions = {
    type: string;
    payload?: string;
}

// export const reducer: Reducer<FormState, CurrencyActions> = (state, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case 'UPDATE_FORM':
//             return {
//                 ...state,
//             };
//         case 'SUBMIT_FORM':
//             return null;
//     }
// }

const initialState: FormState = {
    amount: '',
    currency: '',
    receiversAddress: '',
    transactionSpeed: '',
}

function useCurrencyModal() {
//     const [formFields, dispatch] = useReducer(reducer, initialState);
//     const [currency, setCurrency] = useState<string>('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch({ type: 'SUBMIT_FORM' })
//     }
//
//     const inputsHandler = (e: any) => {
//         dispatch({ type: 'UPDATE_FORM'})
//     }
//
//     return formFields;
}

export default useCurrencyModal;
