import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  return <input {...props} className={`${styles.input} p-16`} />;
};

export default Input;
