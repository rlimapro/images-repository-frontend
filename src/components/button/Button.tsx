import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event : any) => void;
    type ?: "submit" | "button" | "reset" | undefined
}

const Button = ({ style, label, onClick, type } : ButtonProps) => {
    return (
        <button className={`${style} text-white font-bold px-4 py-2 rounded-lg cursor-pointer ${style}`} 
                onClick={onClick}
                type={type}>
            {label}
        </button>
    );
}

export default Button;