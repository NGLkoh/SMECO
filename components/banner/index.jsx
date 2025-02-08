'use client';
import React, { useEffect, useState } from 'react';
import { Box, Stack, Flex, Button, Text, VStack, Link, useMediaQuery } from '@chakra-ui/react';
import LazyLoad from 'react-lazyload';
import axios from 'axios';
const Banner = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)'); // Added for better handling on smaller screens
  const [web, setWeb] = useState([])
  useEffect(() => {
      initialGetWeb()
  }, []);

 const initialGetWeb = async() => {
      const res = await axios.post('/api/web/all')
         console.log(res.data.result)
        setWeb(...res.data.result)
  }
  return (
      <Box w="100%" backgroundSize="cover">
        <LazyLoad height={1200}>
        <Flex
          w="full"
          h={isLargerThan980 ? '85vh' : isLargerThan600 ? '70vh' : '50vh'} // Adjust height based on resolution
          backgroundImage={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${web.featuredBanner}`}
          backgroundSize="cover"
          backgroundPosition="center"
          position="relative" // Enable positioning for the overlay
        >
          {/* Color Mask */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            bg="blackAlpha.600" // Semi-transparent black overlay
            zIndex="1"
          />

          <VStack
            w="full"
            justify="center"
            px={{ base: 4, md: 8 }}
            align="flex-start"
            position="relative"
            zIndex="2" // Ensure content is above the overlay
            spacing={6} // Added spacing between stack items
            minHeight="100%" // Prevent content from shifting
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
                textAlign="left" // Ensure text doesn't shift horizontally
              >
                {web.featuredTitle}
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
                textAlign="left"
              >
                {web.featuredDecs}
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
       </LazyLoad>
      </Box>
  );
};

export default Banner;
