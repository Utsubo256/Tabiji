import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Form, InputField } from '@/components/Form';
import { Link } from '@/components/Elements';
import { useAuth } from '@/lib/auth';

const schema = z
  .object({
    user: z.object({
      name: z
        .string()
        .min(1, '名前を入力してください')
        .max(15, '15文字以下で入力してください'),
      email: z
        .string()
        .min(1, 'メールアドレスを入力してください')
        .max(255, '255文字以下で入力してください')
        .regex(
          /[\w+\-.]+@[a-z\d\-.]+\.[a-z]+/i,
          'フォーマットが正しくありません'
        ),
      password: z
        .string()
        .min(6, '6文字以上で入力してください')
        .max(72, '72文字以下で入力してください'),
      passwordConfirmation: z.string(),
    }),
  })
  .refine((data) => data.user.password === data.user.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['user.passwordConfirmation'],
  });

type RegisterValues = {
  user: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
};

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const navigate = useNavigate();

  const { register, isRegistering } = useAuth();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            ユーザー登録
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={10}
        >
          <Form<RegisterValues, typeof schema>
            onSubmit={async (values) => {
              await register(values);
              navigate('/users');
            }}
            schema={schema}
            options={{
              shouldUnregister: true,
            }}
          >
            {({ register, formState }) => (
              <Stack spacing={4}>
                <FormControl
                  id="name"
                  // isRequired
                  isInvalid={!!formState.errors.user?.name}
                >
                  <FormLabel htmlFor="name">名前</FormLabel>
                  <InputField
                    id="name"
                    type="text"
                    error={formState.errors.user?.name}
                    registration={register('user.name')}
                  />
                  <FormErrorMessage>
                    {formState.errors.user?.name?.message &&
                      formState.errors.user?.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="email"
                  // isRequired
                  isInvalid={!!formState.errors.user?.email}
                >
                  <FormLabel htmlFor="email">メールアドレス</FormLabel>
                  <InputField
                    id="email"
                    type="email"
                    error={formState.errors.user?.email}
                    registration={register('user.email')}
                  />
                  <FormErrorMessage>
                    {formState.errors.user?.email?.message &&
                      formState.errors.user?.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  // isRequired
                  isInvalid={!!formState.errors.user?.password}
                >
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <InputGroup>
                    <InputField
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      error={formState.errors.user?.password}
                      registration={register('user.password')}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {formState.errors.user?.password?.message &&
                      formState.errors.user?.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="passwordConfirmation"
                  // isRequired
                  isInvalid={!!formState.errors.user?.passwordConfirmation}
                >
                  <FormLabel htmlFor="passwordConfirmation">
                    パスワード確認
                  </FormLabel>
                  <InputGroup>
                    <InputField
                      id="passwordConfirmation"
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      error={formState.errors.user?.passwordConfirmation}
                      registration={register('user.passwordConfirmation')}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowPasswordConfirmation(
                            (showPasswordConfirmation) =>
                              !showPasswordConfirmation
                          )
                        }
                      >
                        {showPasswordConfirmation ? (
                          <ViewIcon />
                        ) : (
                          <ViewOffIcon />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {formState.errors.user?.passwordConfirmation?.message &&
                      formState.errors.user?.passwordConfirmation.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    isLoading={isRegistering}
                    loadingText="登録中..."
                    size="lg"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: 'blue.500' }}
                  >
                    登録する
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align="center">
                    すでにアカウントをお持ちの場合{' '}
                    <Link to="/login" color="blue.400">
                      ログイン
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            )}
          </Form>
        </Box>
      </Stack>
    </Flex>
  );
}
