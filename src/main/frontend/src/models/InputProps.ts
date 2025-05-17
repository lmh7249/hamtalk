import React from "react";

export interface InputProps {
    placeholder: string;
    name: string;
    type : string;
    value : string;
    min ?: number;
    max ?: number;
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus ?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
}

