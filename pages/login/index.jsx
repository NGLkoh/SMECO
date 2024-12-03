'use client';

import React, { useState } from 'react';
import {
  Box,
  Text,
  ChakraProvider,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
  Input,
  Flex,
  Spacer,
  Button,
  useToast,
} from '@chakra-ui/react';
import '../../resources/css/style.css';
import { FaGoogle } from 'react-icons/fa';
import CaptionCarousel from '../../components/carousel';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    const res = await axios.post('/api/users/login', { username, password });

    if (res.data.message === 'false') {
      toast({
        title: 'Login Failed, Incorrect password',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } else if (res.data.message === 'true') {
      if (res.data.result[0].active) {
        let origin = window.location.origin;
        window.location.href = `${origin}/dashboard`;
        toast({
          title: 'Login Success',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });

      } else {
        toast({
          title: 'Please wait for email verification',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <ChakraProvider>
      <Box bg="#232536" minHeight="100vh" color="white" display="flex" alignItems="center" justifyContent="center" >
        <Grid
          templateRows="1fr"
          templateColumns="repeat(6, 1fr)"
          maxWidth="1200px"
          width="100%"
          margin="auto"
          p={{ base: 4, md: 20 }}
          gap={0}
        >
          {/* Left Section */}
          <GridItem
            colSpan={{ base: 6, md: 3 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
			bg="#232536"
			borderRadius="16px"
			borderBottomRightRadius= "0px"
			borderTopRightRadius= "0px"
			border="2px solid"
			borderColor="white"
              borderRight="0"
              padding={10}
              width="100%"
              height="100%"
              maxWidth="530px"
              textAlign="left"
            >
              <Image src="logo.png" className="logo" w="150px" marginBottom={6} />
              <Text fontSize="2xl" fontWeight={800} mb={4}>
                Sign in
              </Text>
              <Text mb="8px">Email</Text>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                bg="#FFFFFF"
                color="#4A5568"
                borderRadius={8}
                placeholder="example@gmail.com"
                size="sm"
                mb={4}
              />
              <Text mb="8px">Password</Text>
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                bg="#FFFFFF"
                color="#4A5568"
                borderRadius={8}
                placeholder="******"
                size="sm"
                mb={4}
              />
              <Flex justifyContent="space-between" mb={4}>
                <Spacer />
                <Text as="a" href="/forgot-password" color="blue.400">
                  Forgot Password?
                </Text>
              </Flex>
              <Button
                colorScheme="teal"
                width="100%"
                bg="#FFD050"
                onClick={handleLogin}
                mb={4}
              >
                Sign in
              </Button>
              <Box className="at-sep custom-cursor-default-hover" mb={4}>
                <Text className="devider custom-cursor-default-hover">OR</Text>
              </Box>
              <Button
                leftIcon={<FaGoogle />}
                width="100%"
                color="#000000"
                bg="#ffffff"
                mb={4}
              >
                Continue with Google
              </Button>
              <Box textAlign="center">
                <Text display="inline">Don’t have an account?</Text>
                <Text
                  as="a"
                  href="/register"
                  color="#FFD050"
                  display="inline"
                  ml={2}
                >
                  Create Now
                </Text>
              </Box>
            </Box>
          </GridItem>

          {/* Right Section */}
          <GridItem
            colSpan={{ base: 6, md: 3 }}
            bg={useColorModeValue('#FFD050', 'gray.800')}
            color="#ffffff"
            display="flex"
            alignItems="center"
            justifyContent="center"
			borderRadius="16px"
			borderBottomLeftRadius= "0px"
			borderTopLeftRadius= "0px"
			border="2px solid"
			borderColor="white"
          >
            <Box
              borderRadius="16px" // Same border radius as the left section
              overflow="hidden" // Ensure the carousel fits within the rounded box
            >
              <CaptionCarousel />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
