'use client'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import {Box, ChakraProvider, Text } from '@chakra-ui/react'

import InputComponent from './main/index'
export default class index extends Component  {



  render () {
		return (<> 
    <Box><ChakraProvider>
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
	   <Navbar page='register'/>
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
		<Box colSpan={3} bg={'#232536'} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 

        <InputComponent/>
	      </Box>
			</Box>
			</Box>
			</Box>
		</Box>
</ChakraProvider>
</Box></>)
  }
}


index.layout = Template