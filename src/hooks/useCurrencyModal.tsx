import {Reducer, useReducer, useCallback} from "react";
import {FormState} from "../assets/types/formState";
import {FormActions} from "../assets/types/formActions";
import useUpdateLogger from "./useUpdateLogger";

const ACTIONS = {
    AMOUNT_UPDATE: 'amount-update',
    CURRENCY_UPDATE: 'currency-update',
    ADDRESS_UPDATE: 'address-update',
    TOKEN_ADDRESS_UPDATE: 'token_address-update',
    SPEED_UPDATE: 'speed-update',
    SUBMIT_FORM: 'submit-form',
    RESET_FORM: 'reset-form',
}

export const initialState: FormState = {
    amount: '',
    currency: '',
    receiversAddress: '',
    transactionSpeed: '',
    tokenAddress: ''
}

export const reducer: Reducer<FormState, FormActions> = (state, action) => {
    const { type, payload = '' } = action;
    switch (type) {
        case ACTIONS.AMOUNT_UPDATE:
            return {
                ...state,
                amount: payload
            };
        case ACTIONS.CURRENCY_UPDATE:
            return {
                ...state,
                currency: payload
            };
        case ACTIONS.ADDRESS_UPDATE:
            return {
                ...state,
                receiversAddress: payload
            };
        case ACTIONS.TOKEN_ADDRESS_UPDATE:
            return {
                ...state,
                tokenAddress: payload
            }
        case ACTIONS.SPEED_UPDATE:
            return {
                ...state,
                transactionSpeed: payload
            }
        case ACTIONS.SUBMIT_FORM:
            return { ...state }
        case ACTIONS.RESET_FORM:
            return state = initialState
        default:
            return state
    }
}

function useCurrencyModal() {
    const [formFields, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.SUBMIT_FORM });
    },[])

    const handleAmountInput = useCallback((e) => {
        dispatch({ type: ACTIONS.AMOUNT_UPDATE, payload: e.target.value });
    },[])

    const handleAddressInput = useCallback((e) => {
        dispatch({ type: ACTIONS.ADDRESS_UPDATE, payload: e.target.value });
    }, [])

    const handleTokenAddressInput = useCallback((e) => {
        dispatch({ type: ACTIONS.TOKEN_ADDRESS_UPDATE, payload: e.target.value });
    }, [])

    const handleCurrency = useCallback((e) => {
        dispatch({ type: ACTIONS.CURRENCY_UPDATE, payload: e});
    },[])

    const handleSpeed = useCallback((e) => {
        dispatch({ type: ACTIONS.SPEED_UPDATE, payload: e});
    },[])

    return {
        state: formFields,
        actions:{
            handleSubmit,
            handleAmountInput,
            handleAddressInput,
            handleTokenAddressInput,
            handleCurrency,
            handleSpeed
        }
    };
}

export default useCurrencyModal;
