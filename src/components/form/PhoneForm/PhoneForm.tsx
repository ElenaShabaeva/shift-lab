import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { IMaskInput } from "react-imask";
import Button from "@/shared/Button";
import Field from "@/shared/Field";
import styles from "@/components/form/Form.module.scss";
import inputStyles from "@/shared/Input/Input.module.scss";
import { useGetCode } from "@/hooks/useAuth";

export type PhoneData = {
  phone: string;
};

const PhoneForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneData>({
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });

  const getCodeMutation = useGetCode();
  const onSubmit: SubmitHandler<PhoneData> = (data) => {
    getCodeMutation.mutate(data.phone);
  };

  const getPhoneError = () => {
    if (errors.phone?.message) return errors.phone.message;
    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
      <h1 className="h2">Вход</h1>
      <p className="p-16">
        Введите номер телефона для входа <br /> в личный кабинет
      </p>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Поле является обязательным",
          minLength: {
            value: 16,
            message: "Введите полный номер телефона",
          },
        }}
        render={({ field }) => (
          <Field id="phone-field" label="Телефон" error={getPhoneError()}>
            <IMaskInput
              className={`${inputStyles.input}`}
              mask="+7 000 000 00 00"
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              type="tel"
              id="phone-field"
              placeholder="+7 000 000 00 00"
            />
          </Field>
        )}
      />
      <Button type="submit" className={`${styles.formButton}`}>
        Войти
      </Button>
    </form>
  );
};

export default PhoneForm;
