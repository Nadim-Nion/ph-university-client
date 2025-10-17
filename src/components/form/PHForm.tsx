import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}  & TFormConfig;

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
}

const PHForm = ({ onSubmit, children, defaultValues }: TFormProps) => {

    const formConfig: TFormConfig = {}

    if(defaultValues){
        formConfig['defaultValues'] = defaultValues
    }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
