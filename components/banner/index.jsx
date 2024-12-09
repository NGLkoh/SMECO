'use client';

import React from 'react';
import { Box, Stack, Flex, Button, Text, VStack, ChakraProvider, Link, useMediaQuery } from '@chakra-ui/react';

const Banner = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)'); // Added for better handling on smaller screens

  return (
    <ChakraProvider>
      <Box w="100%" backgroundSize="cover">
        <Flex
          w="full"
          h={isLargerThan980 ? '100vh' : isLargerThan600 ? '70vh' : '50vh'} // Adjust height based on resolution
          backgroundImage="url('bg1.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <VStack
            w="full"
            justify="center"
            px={{ base: 4, md: 8 }}
            align="flex-start"
          >
            <Stack
              maxW={isLargerThan980 ? '6xl' : isLargerThan600 ? '4xl' : '2xl'}
              align="flex-start"
              spacing={6}
            >
              <Text
                fontWeight={700}
                lineHeight={1.2}
                fontSize={{
                  base: '2xl',
                  sm: '3xl',
                  md: '6xl',
                  lg: '8xl', // Scales up for larger screens
                }}
                color="white"
              >
                Elevate your business marketing game
              </Text>
              <Text
                fontWeight={700}
                lineHeight={1.2}
                fontSize={{
                  base: 'md',
                  sm: 'lg',
                  md: 'xl',
                  lg: '3xl',
                }}
                color="white"
              >
                "Discover innovative strategies and tools to boost your brand's visibility and engagement."
              </Text>

              <Stack direction={isLargerThan600 ? 'row' : 'column'} spacing={4}>
                {isLargerThan980 ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        bg="#ffd050"
                        color="black"
                        borderRadius={0}
                        w={150}
                        _hover={{ bg: 'whiteAlpha.500' }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        borderRadius={0}
                        bg="#ffd050"
                        w={150}
                        color="black"
                        _hover={{ bg: 'whiteAlpha.500' }}
                      >
                        Join Now
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/register">
                    <Button
                      borderRadius={0}
                      bg="#ffd050"
                      w={150}
                      color="black"
                      _hover={{ bg: 'whiteAlpha.500' }}
                    >
                      Join Now
                    </Button>
                  </Link>
                )}
              </Stack>
            </Stack>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Banner;
