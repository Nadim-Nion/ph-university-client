/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useEffect, type ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const { reset } = methods;

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form> */}
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
