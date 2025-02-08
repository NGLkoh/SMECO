'use client';

import React, {useState, useEffect} from 'react';
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
  Image,  // Import Image from Chakra UI
} from '@chakra-ui/react';
import Navbar from '../../components/nabvar';
import Footer from '../../components/footer';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import axios from 'axios';
const ContactPage = () => {
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
    <>
      <Navbar />
      
      <ChakraProvider>
        <Container
          maxW="full"
          height="auto"
          mt={20}
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
                {/* Add the logo image above the heading */}
                <Image
                  src="cape-logo.png" // Path to your logo image
                  alt="CAPE Logo"
				  margin={'auto'}
                  boxSize="150px" // Adjust the size as needed
                  objectFit="contain"
                  mb={4} // Margin at the bottom of the logo
                />
                <Heading size="2xl">CONTACT US</Heading>
                <Text fontSize="lg" mt={4}>
                  Cavite Association of Producers & Entrepreneurs - CAPE
                </Text>
                <Text mt={4}>
                  <b>Address:</b> {web.contactAddress}<br />
                  <b>Mobile:</b> {web.contactMobile} <br />
                  <b>Email:</b> {web.contactEmail}<br />
                  <b>Facebook:</b>
                  <Link href={web.contactfacebook} color="blue.500" isExternal>
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
                  <Button
                    to='bdmpkitsolution24@gmail.com'
                    onClick={(e) => {
                      window.location.href = "mailto:bdmpkitsolution24@gmail.com";
                      e.preventDefault();
                    }}
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
      </ChakraProvider>
      <Footer />
    </>
  );
};

export default ContactPage;
