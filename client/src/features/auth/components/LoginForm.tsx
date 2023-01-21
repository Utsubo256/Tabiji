import {
  Box,
  Stack,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from '@/components/Elements';

export function LoginForm() {
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
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>パスワード</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={3}>
              {/* <Checkbox>ログイン状態を保持する</Checkbox> */}
              <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
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
        </Box>
      </Stack>
    </Flex>
  );
}
