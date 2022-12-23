import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

type InputFieldProps = {
  type: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
  error: FieldError | undefined;
};

export function InputField(props: InputFieldProps) {
  const { type = 'text', registration, error } = props;
  return (
    <>
      <Input type={type} {...registration} />
      {error?.message && <div>{error.message}</div>}
    </>
  );
}
