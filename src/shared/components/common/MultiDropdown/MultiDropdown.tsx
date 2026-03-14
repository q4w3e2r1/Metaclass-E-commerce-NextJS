"use client";
import React from 'react';
import Input from '../Input';
import ArrowDownIcon from '../ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  onClose?: () => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className = '',
  options,
  value,
  onChange,
  disabled,
  getTitle,
  onClose,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const hasSelectedOptions = value.length > 0;
  const titleText = getTitle(value);

  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    setSearch('');
    onCloseRef.current?.();
  }, []);

  const isOptionSelected = (option: Option): boolean =>
    value.some((selected) => selected.key === option.key);

  const handleOptionClick = (option: Option) => {
    const selected = isOptionSelected(option);

    if (selected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
    setSearch('');
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  );

  const inputValue = isOpen
    ? search
    : hasSelectedOptions
    ? titleText
    : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onBlur={(e) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        close();
      }}
    >
      <Input
        value={inputValue}
        onChange={(value: string) => {
          if (!isOpen) return;
          setSearch(value);
        }}
        onFocus={() => {
          if (disabled) return;
          setIsOpen(true);
        }}
        afterSlot={<ArrowDownIcon color="secondary" />}
        disabled={disabled}
        placeholder={hasSelectedOptions ? titleText : getTitle([])}
        cursor='pointer'
      />

      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          {filteredOptions.map((option) => {
            const selected = isOptionSelected(option);

            return (
              <button
                key={option.key}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
                className={`${styles.option} ${
                  selected ? styles.selected : ''
                }`}
              >
                {option.value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;