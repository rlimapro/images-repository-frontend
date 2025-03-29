import React from "react"

interface InputTextProps {
    id?: string;
    style?: string;
    placeholder ?: string;
    value?: string;
    type?: string;
    onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void; 
}

const InputText = ({ style, type ="text", ...outrasProps } : InputTextProps) => {
    return (
        <input type={type} 
               {...outrasProps}
               className={`${style} border px-4 py-2 rounded-lg text-gray-900`} />
    );
}

export default InputText;