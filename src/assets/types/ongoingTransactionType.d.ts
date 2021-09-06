import {Dispatch, SetStateAction} from "react";

export interface OngoingTransactionType {
    isOngoingTransaction: boolean;
    setIsOngoingTransaction: Dispatch<SetStateAction<boolean>>;
}
