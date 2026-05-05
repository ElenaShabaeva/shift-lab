import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: string;
  children: ReactNode;
};

const Button = ({
  className,
  variant = "primary",
  children,
  ...props
}: Props) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
