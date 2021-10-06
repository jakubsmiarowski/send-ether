import {Reducer, useReducer, useCallback, useState} from "react";
import {FormStateType} from "../assets/types/formStateType";
import {FormActions} from "../assets/types/formActions";

const ACTIONS = {
    AMOUNT_UPDATE: 'amount-update',
    CURRENCY_UPDATE: 'currency-update',
    PRODUCT_UPDATE: 'product-update',
    ADDRESS_UPDATE: 'address-update',
    TOKEN_ADDRESS_UPDATE: 'token_address-update',
    SPEED_UPDATE: 'speed-update',
    SUBMIT_FORM: 'submit-form',
    RESET_FORM: 'reset-form',
}

export const initialState: FormStateType = {
    amount: '',
    currency: 'Ether',
    receiversAddress: '',
    transactionSpeed: '',
    tokenAddress: '',
    product: ''
}

export const reducer: Reducer<FormStateType, FormActions> = (state, action) => {
    const {type, payload = ''} = action;
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
        case ACTIONS.PRODUCT_UPDATE:
            return {
                ...state,
                product: payload
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
            return {...state}
        case ACTIONS.RESET_FORM:
            return state = initialState
        default:
            return state
    }
}

function useCurrencyModal() {
    const [formFields, dispatch] = useReducer(reducer, initialState);
    const [isOngoingTransaction, setIsOngoingTransaction] = useState<boolean>(false);
    const [isPendingTransaction, setIsPendingTransaction] = useState<boolean>(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({type: ACTIONS.SUBMIT_FORM});
    }, [])

    const handleReset = useCallback(() => {
        dispatch({type: ACTIONS.RESET_FORM})
    }, [])

    const handleAmountInput = useCallback((e) => {
        dispatch({type: ACTIONS.AMOUNT_UPDATE, payload: e.target.value});
    }, [])

    const handleAddressInput = useCallback((e) => {
        dispatch({type: ACTIONS.ADDRESS_UPDATE, payload: e.target.value});
    }, [])

    const handleProductInput = useCallback((e) => {
        dispatch({type: ACTIONS.PRODUCT_UPDATE, payload: e.target.value});
    }, [])
    const handleTokenAddressInput = useCallback((e) => {
        dispatch({type: ACTIONS.TOKEN_ADDRESS_UPDATE, payload: e.target.value});
    }, [])

    const handleCurrency = useCallback((e) => {
        dispatch({type: ACTIONS.CURRENCY_UPDATE, payload: e});
    }, [])

    const handleSpeed = useCallback((e) => {
        dispatch({type: ACTIONS.SPEED_UPDATE, payload: e});
    }, [])

    return {
        state: formFields,
        actions: {
            handleSubmit,
            handleAmountInput,
            handleAddressInput,
            handleTokenAddressInput,
            handleCurrency,
            handleSpeed,
            handleProductInput,
            handleReset
        },
        ongoingTransaction: {
            isOngoingTransaction,
            setIsOngoingTransaction,
        },
        pendingTransaction: {
            isPendingTransaction,
            setIsPendingTransaction
        }
    };
}

export default useCurrencyModal;
