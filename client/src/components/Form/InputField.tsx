import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

type InputFieldProps = {
  id: string;
  type: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
  error: FieldError | undefined;
};

export function InputField(props: InputFieldProps) {
  const { id, type = 'text', registration } = props;
  return (
    <>
      <Input id={id} type={type} {...registration} />
    </>
  );
}
