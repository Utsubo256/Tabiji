import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import { User } from '../types';
import { getUser } from '../api/getUser';

export function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    introduction: null,
    createdAt: null,
    updatedAt: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const result = await getUser({ userId });
    setUser(result);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (!user) return null;

  return (
    <Center>
      <Box
        w={{ base: '500px', md: '800px' }}
        bg="teal.400"
        p="10"
        my="80px"
        bgColor="gray.100"
        borderRadius="10px"
        boxShadow="md"
      >
        <Stack spacing={8} p="2">
          <Flex justify="center" align="center">
            <Stack textAlign="center">
              <Image
                borderRadius="full"
                boxSize={{ base: '100px', md: '150px' }}
                src="https://source.unsplash.com/random"
                alt="dog"
              />
              <Text fontSize="lg">{user.name}</Text>
            </Stack>
            <Box px={{ base: 5, md: 100 }} py={50}>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                Tabiji投稿数：{64}
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                合計いいね数：{128}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Heading as="u" size={{ base: 'sm', md: 'md' }}>
              自己紹介
            </Heading>
            <Text my={2}>{user.introduction}</Text>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
}
