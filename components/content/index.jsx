'use client'

import React from 'react'
import {Box, Text,ChakraProvider, Grid, GridItem, Image, CardHeader, Heading, CardBody, Card, Button, Stack, StackDivider } from '@chakra-ui/react'

const Content = () => {
   return (<ChakraProvider>
      <Box width={'100%'} height={'auto'} w={'100%'} position={'relative'} backgroundColor={'#f4f0f8'}>
		<Box  m={'10%'} >
		<Box width={'80%'} height={"400"}  margin={'auto'} pt={'8%'}>
		<Box w={'100%'} padding={"10px"}>
        <Grid
		h='200px'
		templateRows='repeat(2, 1fr)'
		templateColumns='repeat(6, 1fr)'
		gap={1}
		>
		<GridItem colSpan={3}  > 

			<Box margin={"auto"} p={2}  >  
                 <Text fontSize='sm'  mb={2} >About Us</Text>
				<Text fontWeight={600} mt={2}>  We are a community of content writers who share their learnings </Text>
				<Text mt={4} fontSize={10}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
				<Text colorScheme='teal' size='lg' fontFamily="sans-serif" mt={4} borderRadius={0} color={'#ffd050'} w={40} fontSize={14}>
					Read More <span>&gt;</span>
				</Text>
			</Box>
		
		</GridItem>
		<GridItem colSpan={3}  >
           	<Box margin={"auto"} p={2}  >  
                 <Text fontSize='sm'  mb={2} >Our mision</Text>
				<Text fontWeight={600} mt={2}>  We are a community of content writers who share their learnings </Text>
				<Text mt={4} fontSize={10}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
				
			</Box>
        </GridItem>

		</Grid>
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>)
}

export default Content