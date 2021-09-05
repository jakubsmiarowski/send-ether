import React from "react";

interface IInputProps {
    name: string;
    placeholder: string;
    value: string | undefined;
    action: (e: any) => void;
}

const Input:React.FC<IInputProps> = ({ name, placeholder, value, action}) => {
    return (
        <input name={name} placeholder={placeholder} value={value} onChange={action}/>
    )
}
export default Input;
