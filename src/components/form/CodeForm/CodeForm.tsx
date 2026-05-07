import { usePhone } from "@/store/auth";
import Button from "@/shared/Button";
import Field from "@/shared/Field";
import Input from "@/shared/Input";
import styles from "@/components/form/Form.module.scss";
import Timer from "../Timer";

const CodeForm = () => {

  const phone = usePhone();

  return (
    <>
      <form action="" className={`${styles.form}`}>
        <h1 className="h2">Вход</h1>
        <p className="p-16">
          Введите проверочный код для входа <br />в личный кабинет
        </p>
        <Field id="phone-field" label="Телефон">
          <Input
            placeholder="+7 000 000 00 00"
            id="phone-field"
            defaultValue={phone}
            disabled
          />
        </Field>
        <Field id="code-field" label="Код подтверждения">
          <Input placeholder="000000" id="code-field" />
        </Field>
        <Button type="submit" className={`${styles.formButton}`}>
          Войти
        </Button>
      </form>
      <Timer/>
    </>
  );
};

export default CodeForm;
