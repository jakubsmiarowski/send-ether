import {FormStateType} from "./formStateType";
import {FormContextActions} from "./formContextActions";
import {DropdownContextType} from "./currencyContextType";
import {OngoingTransactionType} from "./ongoingTransactionType";
import {PendingTransactionType} from "./pendingTransactionType";

export interface AuthContextType{
    state: FormStateType,
    actions: FormContextActions,
    dropdownOptions: DropdownContextType,
    ongoingTransaction: OngoingTransactionType,
    pendingTransaction: PendingTransactionType
}
