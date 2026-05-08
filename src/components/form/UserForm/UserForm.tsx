import { useNavigate } from "react-router-dom";
import { logout, useUser } from "@/store/user";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/components/form/Form.module.scss";

const UserForm = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleClick = () => {
    navigate("/");
    logout()
  };

  return (
    <form className={`${styles.form}`}>
      <h1 className="h2">Профиль</h1>
      <p className="p-16">Пользователь: {user.id}</p>
      <Field id="phone-field" label="Телефон">
        <Input type="tel" id="phone-field" defaultValue={user.phone} disabled />
      </Field>
      <Button
        type="button"
        className={`${styles.formButton}`}
        onClick={handleClick}
      >
        Выйти
      </Button>
    </form>
  );
};

export default UserForm;
