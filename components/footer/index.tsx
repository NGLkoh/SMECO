import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link,
  useToast,
  HStack,
  useMediaQuery,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios, { AxiosResponse } from 'axios';

const DetailFooter = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleAddSubscribe = async () => {
    try {
      if (email) {
        // Email regex for validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
        if (!emailRegex.test(email)) {
          toast({
            title: 'Invalid Email Address',
            description: 'Please enter a valid email address.',
            status: 'warning',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
          return; // Exit if email is not valid
        }
  
        const checker: AxiosResponse<{ message: string }> = await axios.post(
          '/api/subscribe/searchByEmail',
          { email }
        );
        if (checker.data.message === 'true') {
          toast({
            title: 'Email already subscribed',
            status: 'warning',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } else {
          const res = await axios.post('/api/subscribe/create', {
            email,
            sub: 1,
          });
          toast({
            title: 'Successfully Subscribed to Newsletter',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Enter Email please',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error subscribing',
        description: 'An error occurred while subscribing. Please try again.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="footer" backgroundColor="#232436" color="white" py={8}>
      <Box maxW="1200px" mx="auto" px={4} pb={10}>
        {/* Navigation Links */}
        <Flex
          justifyContent={isLargerThan980 ? 'flex-end' : 'center'}
          mb={6}
        >
          <HStack spacing={6} fontSize={isLargerThan980 ? 'md' : '13px'}>
            <Link href="/">Home</Link>
            <Link href="/../blog">Blog</Link>
            <Link href="/../about-us">About Us</Link>
            <Link href="/../contact-us">Contact Us</Link>
            <Link href="/../privacy-policy">Privacy Policy</Link>
          </HStack>
        </Flex>

        {/* Subscription Section */}
        <Box
          bg="#2e303f"
          py={6}
          px={6}
          borderRadius="md"
          textAlign="center"
          mb={10}
        >
          <Flex
            align="center"
            justifyContent="space-between"
            direction={isLargerThan980 ? 'row' : 'column'}
          >
            <Text
              pt={ isLargerThan980 ? 20 : 10}
              pb={ isLargerThan980 ? 20 : 10}
              fontSize={isLargerThan980 ? '40px' : '27px'}
              fontWeight="600"
              mb={isLargerThan980 ? 0 : 4}
            >
              Subscribe to our newsletter to get the latest updates and news
            </Text>
            <InputGroup maxW="400px">
              <Input
                placeholder="Enter Your Email"
                bg="white"
                color={'black'}
                borderColor="gray.400"
                onChange={(e) => setEmail(e.target.value)}
                _placeholder={{ color: 'gray.500' }}
                size="md"
              />
              <Button
                ml={2}
                bg="#ffcf4f"
                color="black"
                size="md"
                fontWeight="normal"
                onClick={handleAddSubscribe}
              >
                Subscribe
              </Button>
            </InputGroup>
          </Flex>
        </Box>

        {/* Footer Information */}
        <Box textAlign={isLargerThan980 ? 'left' : 'center'} mb={8}>
          <Text mb={4}>
            The District Imus<br />
            2/F Alagang Ayala Land Center, E. Aguinaldo Highway cor. Daang Hari
            Road, Anabu II-D, Imus, Cavite 4103
          </Text>
        </Box>

        {/* Social Media and Copyright */}
        <Flex
          flexDirection={isLargerThan980 ? 'row' : 'column'}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="sm" mb={isLargerThan980 ? 0 : 4}>
            © 2024 Cavite Association of Producers & Entrepreneurs - CAPE. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="https://www.facebook.com/profile.php?id=100065009122013"
              aria-label="Facebook"
              icon={<FaFacebookF />}
              color="#ffce52"
              variant="ghost"
              target="_blank"
            />
            <IconButton
              as="a"
              href="https://x.com/OllocalPH"
              aria-label="Twitter"
              icon={<FaTwitter />}
              color="#ffce52"
              variant="ghost"
              target="_blank"
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/ollocalph/"
              aria-label="Instagram"
              icon={<FaInstagram />}
              color="#ffce52"
              variant="ghost"
              target="_blank"
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailFooter;
