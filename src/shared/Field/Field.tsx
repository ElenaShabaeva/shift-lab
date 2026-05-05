import type { ReactNode } from "react";
import styles from "./Field.module.scss";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

const Field = ({ id, label, error, children }: Props) => {
  return (
    <div className={`${styles.field}`}>
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
