import {
  Box,
  Stack,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  // Checkbox,
  Button,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { useAuth } from '@/global_states/auth/useAuth';

import { Form, InputField } from '@/components/Form';
import { Link } from '@/components/Elements';

const schema = z.object({
  auth: z.object({
    email: z.string().min(1, 'メールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
  }),
  });

type LoginValues = {
  auth: {
    email: string;
    password: string;
  };
};

export function LoginForm() {
  const navigate = useNavigate();

  const [{ login, isLoggingIn }] = useAuth();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">ログイン</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Form<LoginValues, typeof schema>
            onSubmit={async (values) => {
              await login(values);
              navigate('/users');
            }}
            schema={schema}
          >
            {({ register, formState }) => (
              <Stack spacing={4}>
                <FormControl
                  id="email"
                  // isRequired
                  isInvalid={!!formState.errors.auth?.email}
                >
                  <FormLabel htmlFor="email">メールアドレス</FormLabel>
                  <InputField
                    id="email"
                    type="email"
                    error={formState.errors.auth?.email}
                    registration={register('auth.email')}
                  />
                  <FormErrorMessage>
                    {formState.errors.auth?.email?.message &&
                      formState.errors.auth?.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  // isRequired
                  isInvalid={!!formState.errors.auth?.password}
                >
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <InputField
                    id="password"
                    type="password"
                    error={formState.errors.auth?.password}
                    registration={register('auth.password')}
                  />
                  <FormErrorMessage>
                    {formState.errors.auth?.password?.message &&
                      formState.errors.auth?.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={3}>
                  {/* <Checkbox>ログイン状態を保持する</Checkbox> */}
                  <Button
                    type="submit"
                    isLoading={isLoggingIn}
                    loadingText="ログイン中..."
                    size="lg"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: 'blue.500' }}
                  >
                    ログイン
                  </Button>
                  {/* <Link to="/signup" color="blue.400">パスワードをお忘れですか？</Link> */}
                  <Text>
                    まだアカウントをお持ちでない場合{' '}
                    <Link to="/signup" color="blue.400">
                      ユーザー登録
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
