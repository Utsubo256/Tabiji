import * as React from 'react';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options: UseFormProps<TFormValues>;
};

export function Form<
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({ onSubmit, children, options }: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
}
