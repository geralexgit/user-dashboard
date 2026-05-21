import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'default';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  disabled = false,
  className = '',
}) => {
  const buttonClass = `${styles.button} ${
    type === 'primary' ? styles.primaryButton : styles.defaultButton
  } ${disabled ? styles.disabled : ''} ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;