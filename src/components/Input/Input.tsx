import React from "react";

interface IInputProps {
    name: string;
    placeholder: string;
    value: string | undefined;
    action: (e: any) => void;
    isPendingTransaction: boolean;
}

const Input:React.FC<IInputProps> = ({ name, placeholder, value, action, isPendingTransaction}) => {
    return (
        <input name={name} placeholder={placeholder} value={value} onChange={action} disabled={isPendingTransaction}/>
    )
}
export default Input;
