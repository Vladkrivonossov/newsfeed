import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, loading = false, onClick, ...resProps }: ButtonProps) => {
  return (
    <button {...resProps} className="button" onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img className="button__spinner" src={require('../../images/loader.svg')} alt="spinner" />
        </span>
      )}
    </button>
  );
};
