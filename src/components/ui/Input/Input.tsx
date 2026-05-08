import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = ({ className = "", ...props }: Props) => {
  return <input {...props} className={`${styles.input} ${className} p-16`} />;
};

export default Input;
