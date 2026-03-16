import React from 'react';

import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  className = '',
  ...props
}) => {
  const handleChange = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={handleChange}
      className={`${styles.checkbox} ${disabled ? styles.disabled : ''} ${className}`}
      {...props}
    />
  );
};

export default CheckBox;
