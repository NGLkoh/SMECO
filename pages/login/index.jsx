'use client';

import React, { useState, StrictMode } from 'react';
import {
  Box,
   InputGroup,
  Text,
  ChakraProvider,
InputRightElement,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
  Input,
  Flex,
  Spacer,
  Button,
  useToast,
	useMediaQuery,Link,
} from '@chakra-ui/react';
import '../../resources/css/style.css';
import { FaEye, FaGoogle, FaLock } from 'react-icons/fa';
import CaptionCarousel from '../../components/carousel';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import SaveGoolgeLogin from '../../components/modal/register'
const CLIENT_ID = "512275838388-jal64cg1khdpl58kt7ba9c1k2ge0u041.apps.googleusercontent.com"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [decodeCredentials, setDecodeCredentials] = useState({});
  const [modalRegisterLogin, setModalRegisterLogin] = useState(false);
  const toast = useToast();

  const closeModalRegisterLogin = () =>  {
      setModalRegisterLogin(false )
  }
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const handleLoginGoogle = async (credentialRes) => {
    const creds = jwtDecode(credentialRes.credential)
   console.log(creds, "email")
    const res = await axios.post('/api/users/login', { username: creds.email, password: 'google' });

    if (res.data.message === 'false') {
    setModalRegisterLogin(true)
    setDecodeCredentials(jwtDecode(credentialRes.credential)) 
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
          title: 'Please wait for admin verification',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
	}
  }

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
<StrictMode>
<GoogleOAuthProvider clientId={CLIENT_ID}>
    <ChakraProvider>
      <Box bg="#232536" minHeight="100vh" color="white" display="flex" alignItems="center" justifyContent="center" >
        <Grid
          templateRows="1fr"
          templateColumns="repeat(6, 1fr)"
          maxWidth="1200px"
          width="100%"
          margin="auto"
          p={{ base: 2, md: 20 }}
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
			borderBottomRightRadius= {isLargerThan980 ? "0px" : 16}
			borderTopRightRadius= {isLargerThan980 ? "0px" : 16}
			border="2px solid"
			borderColor="white"
              borderRight={isLargerThan980 ? "" : "2"}
              padding={10}
              width="100%"
              height="100%"
              maxWidth="530px"
              textAlign="left"
            >
              <Link href='/'><Image  src="logo.png" className="logo" w="150px" marginBottom={6} /></Link>
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
                 <InputGroup>
					 <Input
						value={password}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
						placeholder="******"
                        pt={'3px'}
						size="sm"
						mb={4}
					/>
					<InputRightElement pb={'6px'}>
					 { showPassword ? <FaLock   color='black' onClick={() => setShowPassword(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword(true)}/>}
					</InputRightElement>
				</InputGroup>
              
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
             <Box  className="google-container"
				mb={4}
				sx={{
					display: 'flex',
					justifyContent: 'center', // Centers horizontally
					alignItems: 'center',      // Centers vertically           // Make the Box take full height of its parent (if needed)
				}}>
              <GoogleLogin width={'100% !important'} marginBottom={6} onSuccess={(credentialRes) => handleLoginGoogle(credentialRes)} onError={() => console.log('login error')}/>
             </Box>
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
			borderBottomLeftRadius= {isLargerThan980 ? "0px" : 16}
			borderTopLeftRadius= {isLargerThan980 ? "0px" : 16}
			border="2px solid"
			borderColor="white"
          >
            <Box
              borderRadius="16px" // Same border radius as the left section
              overflow="hidden" // Ensure the carousel fits within the rounded box
            >
              <CaptionCarousel  />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
    <SaveGoolgeLogin modalRegisterLogin={modalRegisterLogin} closeModalRegisterLogin={closeModalRegisterLogin} decodeCredentials={decodeCredentials}/>
   </GoogleOAuthProvider >
   </StrictMode>
  );
};

export default Login;
