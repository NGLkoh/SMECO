'use client'

import React from 'react'
import {Box, Avatar, Flex, CardHeader,Card, Text, Heading, CardBody, ChakraProvider} from '@chakra-ui/react'

const FeaturedBlog = () => {
   return (
	<Box marginLeft={'auto'} marginRight={'auto'} marginBottom={16}  marginTop={16} width={'50%'} p={'10px'} >
     <ChakraProvider>
       <Box height={'auto'}  w={'100%'}>
		<Card maxW='md' margin={'auto'}>
		<CardHeader>
			<Flex spacing='4'>
			<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
				<Avatar name='Segun Adebayo' />

				<Box>
				<Heading size='sm'>Segun Adebayo</Heading>
				<Text>Creator, Chakra UI</Text>
				</Box>
			</Flex>
			
			</Flex>
		</CardHeader>
		<CardBody position={'relative'} bottom={5}>
			<Text fontSize={'xl'} fontWeight={600}>
		         Step-by-step guide to choosing great font pairs
			</Text>
		</CardBody>
	
		</Card>
    </Box> </ChakraProvider></Box>)
}

export default FeaturedBlog