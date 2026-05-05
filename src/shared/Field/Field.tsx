import type { ReactNode } from "react";
import styles from "./Field.module.scss";

type Props = {
  className?: string;
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

const Field = ({ className = "", id, label, error, children }: Props) => {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={id} className={`visually-hidden p-14`}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={`${styles.error} p-14`}>{error}</span>}
    </div>
  );
};

export default Field;
