import React, {useContext} from "react";
import {AppContext} from "../../AppContext";

interface IInputProps {
    name: string;
    placeholder: string;
    value: string | undefined;
    action: (e: any) => void;
}

const Input:React.FC<IInputProps> = ({ name, placeholder, value, action}) => {

    const { pendingTransaction: { isPendingTransaction }} = useContext(AppContext);

    return (
        <input name={name}
               placeholder={placeholder}
               value={value}
               onChange={action}
               disabled={isPendingTransaction}/>
    )
}
export default Input;
