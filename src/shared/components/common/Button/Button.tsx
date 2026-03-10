import React from 'react';
import Loader from  "../Loader/Loader";
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  minWidth?: number;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className = '',
  disabled,
  style,
  minWidth,
  ...props
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${styles.button} ${className}`}
      style={{ minWidth: minWidth ? `${minWidth}px` : undefined, ...style }}
    >
      {loading && <Loader size="s" className="ChangeColor" />}
      {children}
    </button>
  );
};

export default Button;