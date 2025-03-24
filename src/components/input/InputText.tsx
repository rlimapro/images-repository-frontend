import React from "react"

interface InputTextProps {
    style?: string;
    placeholder ?: string;
    onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void; 
}

const InputText = ({ style, ...outrasProps } : InputTextProps) => {
    return (
        <input type="text" 
               {...outrasProps}
               className={`${style} border px-4 py-2 rounded-lg text-gray-900`} />
    );
}

export default InputText;