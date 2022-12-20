import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

type InputFieldProps = {
  type: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
};

export function InputField(props: InputFieldProps) {
  const { type = 'text', registration } = props;
  return <Input type={type} {...registration} />;
}
