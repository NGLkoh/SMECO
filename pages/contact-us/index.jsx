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
} from '@chakra-ui/react';
import Navbar from '../../components/nabvar';
import Footer from '../../components/footer';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <ChakraProvider>
        <Container
          maxW="full"
          height="800px"
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
          >
            <Box p={4}>
              {/* Header */}
              <Box color="#000000" p={6} textAlign="center">
                <Text fontSize="xl">CONTACT US</Text>
                <Text>Let&apos;s Start a Conversation</Text>
                <Text>
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </Text>
              </Box>

              {/* Form */}
              <Box ml={8} mr={8} color="#0B0E3F">
                <VStack spacing={5}>
                  <FormControl id="name">
                    <FormLabel>Your Name</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <BsPerson color="gray.800" />
                      </InputLeftElement>
                      <Input type="text" size="md" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Mail</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdOutlineEmail color="gray.800" />
                      </InputLeftElement>
                      <Input type="email" size="md" />
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
        <Footer />
      </ChakraProvider>
    </>
  );
};

export default ContactPage;
