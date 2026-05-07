import Field from "@/shared/Field";
import Input from "@/shared/Input";
import styles from "@/components/form/Form.module.scss";
import Button from "@/shared/Button";
import { useNavigate } from "react-router-dom";
import { useUserID, useUserPhone } from "@/store/user";

const UserForm = () => {
  const navigate = useNavigate()
  const userPhone = useUserPhone();
  const userID = useUserID();

  const handleClick = () => {
    navigate('/')
    localStorage.removeItem('user-storage')
  }

  return (
    <form className={`${styles.form}`}>
      <h1 className="h2">Профиль</h1>
      <p className="p-16">Пользователь: {userID}</p>
      <Field id="phone-field" label="Телефон">
        <Input type="tel" id="phone-field" defaultValue={userPhone} disabled />
      </Field>
      <Button type="button" className={`${styles.formButton}`} onClick={handleClick}>
        Выйти
      </Button>
    </form>
  );
};

export default UserForm;
