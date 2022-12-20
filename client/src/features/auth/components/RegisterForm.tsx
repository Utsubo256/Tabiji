import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { InputField } from '@/components/Form';
import { Link } from '@/components/Elements/Link';
import { Form } from '@/components/Form/Form';

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  type IFormInput = {
    name: string;
    email: string;
    password: string;
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

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
          p={8}
        >
          <Form<RegisterValues>
            onSubmit={onSubmit}
            options={{
              shouldUnregister: true,
            }}
          >
            {({ register }) => (
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>名前</FormLabel>
                  <InputField type="text" registration={register('name')} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>メールアドレス</FormLabel>
                  <InputField type="email" registration={register('email')} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>パスワード</FormLabel>
                  <InputGroup>
                    <InputField
                      type={showPassword ? 'text' : 'password'}
                      registration={register('password')}
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
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    isLoading={false}
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
