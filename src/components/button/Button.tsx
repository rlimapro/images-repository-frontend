import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event : any) => void;
}

const Button = ({ style, label, onClick } : ButtonProps) => {
    return (
        <button className={`${style} text-white font-bold px-4 py-2 rounded-lg cursor-pointer ${style}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;