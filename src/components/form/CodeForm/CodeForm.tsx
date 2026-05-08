import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useConfirmCode } from "@/hooks/useConfirmCode";
import { usePhone } from "@/store/auth";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Timer from "@/components/Timer";
import styles from "@/components/form/Form.module.scss";
import inputStyles from "@/components/ui/Input/Input.module.scss";

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

  const validCodeMutation = useConfirmCode();
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
