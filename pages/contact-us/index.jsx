'use client';

import React from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  ChakraProvider,
  Link,
} from '@chakra-ui/react';
import Navbar from '../../components/nabvar';
import Footer from '../../components/footer';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <ChakraProvider>
        <Container
          maxW="full"
          height="auto"
          mt={0}
          centerContent
          overflow="hidden"
          mb={10}
          position="relative"
          top={-6}
        >
          <Box
            bg="#ffffff"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
            boxShadow="md"
          >
            <Box p={4}>
              {/* Header */}
              <Box color="#000000" p={6} textAlign="center">
                <Heading size="2xl">CONTACT US</Heading>
                <Text fontSize="lg" mt={4}>
                  Cavite Association of Producers & Entrepreneurs - CAPE
                </Text>
                <Text mt={4}>
                  <b>Address:</b> InBox FoodHub, Bayan Luma 8, Emilio Aguinaldo Hi-way, City of Imus <br />
                  <b>Mobile:</b> +63936 9940234 <br />
                  <b>Email:</b> capeest.2021@gmail.com <br />
                  <b>Facebook:</b>{' '}
                  <Link href="https://www.facebook.com/profile.php?id=100065009122013" color="blue.500" isExternal>
                    CAPE on Facebook
                  </Link>
                </Text>
                <Text mt={4} fontSize="lg">
                  Let&apos;s Start a Conversation
                </Text>
              </Box>

              {/* Form */}
              <Box mt={8} ml={8} mr={8} color="#0B0E3F">
                <VStack spacing={5}>
                  <FormControl id="name">
                    <FormLabel>Your Name</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <BsPerson color="gray.800" />
                      </InputLeftElement>
                      <Input type="text" size="md" placeholder="Enter your name" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdOutlineEmail color="gray.800" />
                      </InputLeftElement>
                      <Input type="email" size="md" placeholder="Enter your email" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="message">
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      borderColor="gray.300"
                      _hover={{ borderColor: 'gray.400' }}
                      placeholder="Your message here"
                    />
                  </FormControl>
                  <Button
                    variant="solid"
                    width="100%"
                    bg="#ffb509"
                    color="white"
                    _hover={{ bg: '#e89b07' }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Container>
       
      </ChakraProvider> <Footer />
    </>
  );
};

export default ContactPage;
