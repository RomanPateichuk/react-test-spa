import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>;
export type ButtonType = DefaultButtonPropsType & {
    onClick: () => void
};


export const Button: React.FC<ButtonType> = React.memo(({children, onClick}) => {


    return (
        <button className={s.noteButton} onClick={onClick}>{children}</button>
    )
})
