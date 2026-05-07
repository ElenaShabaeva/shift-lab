import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { usePhone } from "@/store/auth";
import { useValidCode } from "@/hooks/useAuth";
import Button from "@/shared/Button";
import Field from "@/shared/Field";
import Input from "@/shared/Input";
import Timer from "../Timer";
import styles from "@/components/form/Form.module.scss";
import inputStyles from "@/shared/Input/Input.module.scss";

export type CodeData = {
  code: string;
};

const CodeForm = () => {
  const phone = usePhone();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeData>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const validCodeMutation = useValidCode();
  const onSubmit: SubmitHandler<CodeData> = (data) => {
    validCodeMutation.mutate({ phone: phone, code: data.code });
  };

  const getCodeError = () => {
    if (errors.code?.message) return errors.code.message;
    return undefined;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
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
        <Controller
          name="code"
          control={control}
          rules={{
            required: "Код должен содержать 6 цифр",
            minLength: {
              value: 6,
              message: "Код должен содержать 6 цифр",
            },
          }}
          render={({ field }) => (
            <Field
              id="code-field"
              label="Код подтверждения"
              error={getCodeError()}
            >
              <IMaskInput
                className={`${inputStyles.input}`}
                mask="000000"
                value={field.value}
                onAccept={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                type="text"
                id="code-field"
                placeholder="000000"
              />
            </Field>
          )}
        />

        <Button type="submit" className={`${styles.formButton}`}>
          Войти
        </Button>
      </form>
      <Timer />
    </>
  );
};

export default CodeForm;
