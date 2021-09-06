import {Dispatch, SetStateAction} from "react";

export interface PendingTransactionType {
    isPendingTransaction: boolean;
    setIsPendingTransaction: Dispatch<SetStateAction<boolean>>
}
