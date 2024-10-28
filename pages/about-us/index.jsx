'use client'

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
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Banner from '../../components/banner'
import Category from '../../components/category/index'
import FeaturedPost from '../../components/featuredPost/index'
import Content from '../../components/content/index'
import ImageBanner from '../../components/imagebanner'
import ListAuthor from '../../components/listAuthors'
import Footer from '../../components/footer'
export default class index extends Component  {
  render () {
		return (<> 
	<Navbar/>
    <ChakraProvider>
   
	 <Footer/>
	 </ChakraProvider></>)
  }
}


index.layout = Template