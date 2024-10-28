'use client'

import React, { Component } from 'react'
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
 ChakraProvider,
} from '@chakra-ui/react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Banner from '../../components/banner'
import Category from '../../components/category/index'
import FeaturedPost from '../../components/featuredPost/index'
import Content from '../../components/content/index'
import ImageBanner from '../../components/imagebanner'
import ListAuthor from '../../components/listAuthors'
import Footer from '../../components/footer'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
export default class index extends Component  {
  render () {
		return (<><Navbar/>
  <ChakraProvider>
    <Container maxW="full" height={'800px'} mt={0} centerContent overflow="hidden" mb={10} position={'relative'} top={-6}>
        <Box
          bg="#ffffff"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
           
            <Box color={'#000000'} p={6} textAlign={'center'}>   <Text fontSize={'xl'}>CONTACT US</Text>
            <Text> Let's Start a Conversation</Text>
            <Text> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </Text> </Box>
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
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button variant="solid" width={'100%'} bg="#ffb509" color="white" _hover={{}}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
         
          </Box>
        </Box>

    </Container>
	<Footer/>
	 </ChakraProvider></>)
  }
}


index.layout = Template