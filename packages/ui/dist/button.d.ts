import React from 'react';

interface ButtonProps {
    variant: "primary" | "secondary";
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
declare function Button({ variant, onClick, children, }: ButtonProps): JSX.Element;

export { Button };
