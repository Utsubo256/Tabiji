import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

export function Profile() {
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
              <Text fontSize="lg">Utsubo</Text>
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
            <Text my={2}>
              ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
            </Text>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
}
