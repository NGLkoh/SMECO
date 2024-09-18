'use client'

import React from 'react'
import {Box, Text,ChakraProvider, Grid, GridItem, Image, CardHeader, Heading, CardBody, Card, Button, Stack, StackDivider } from '@chakra-ui/react'

const FeaturedPost = () => {
   return (<ChakraProvider>
      <Box width={'100%'} height={'auto'} w={'100%'} position={'relative'} >
		<Box m={'10%'}>
		<Box width={'80%'} height={"723"}  margin={'auto'} >
		<Box w={'100%'} padding={"10px"}>
        <Grid
		h='200px'
		templateRows='repeat(2, 1fr)'
		templateColumns='repeat(5, 1fr)'
		gap={1}
		>
		<GridItem colSpan={3} bg='white' > 
			<Text fontSize='2xl' fontFamily="sans-serif" mb={6} fontWeight={600}>Featured Post</Text>
			<Box margin={"auto"} p={2}  >  
				<Image src="feature_post.png"/>
				<Text fontSize={9} mt={4}>  By Juan Dela Cruz   l   May 23, 2024 </Text>
				<Text fontWeight={600} mt={4}>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </Text>
				<Text mt={4} fontSize={10}> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. </Text>
				<Button colorScheme='teal' size='lg' fontFamily="sans-serif" mt={4} borderRadius={0} backgroundColor={'#ffd050'} w={40} color={"#000000"} fontSize={14}>
					Read More <Text ml={1.5} position={'relative'} fontSize={16} bottom={'0px'}>&gt;</Text>
				</Button>
			</Box>
		
		</GridItem>
		<GridItem colSpan={2}  >
            <Text  fontSize='2xl' fontFamily="sans-serif" ml={2} mb={6} fontWeight={600}>All Posts</Text>
			<Card boxShadow={'unset'} >
			<CardBody pt={'0px'} border={'unset'}>
				<Stack  spacing='4'>
				<Box p={4}>
					<Text size='sm' fontSize={9} textTransform='uppercase'>
					 By Juan Dela Cruz  Aug 23, 2024 
					</Text>
					<Heading pt='2' fontSize='2xl'>
				    8 Enterpsrises design systems that you can download for free today.
					</Heading>
				</Box>
				<Box backgroundColor={'#fbf6ea'} p={4} >
					<Text size='sm'  fontSize={9} textTransform='uppercase'>
					 By Juan Dela Cruz  Aug 23, 2024 
					</Text>
					<Heading pt='2' fontSize='2xl'>
				    8 Enterpsrises design systems that you can download for free today.
					</Heading>
				</Box>
				<Box p={4}>
					<Text size='sm'  fontSize={9} textTransform='uppercase'>
					 By Juan Dela Cruz  Aug 23, 2024 
					</Text>
					<Heading pt='2' fontSize='2xl'>
				    8 Enterpsrises design systems that you can download for free today.
					</Heading>
				</Box>
	            <Box p={4}>
					<Text size='sm'  fontSize={9} textTransform='uppercase'>
					 By Juan Dela Cruz  Aug 23, 2024 
					</Text>
					<Heading pt='2' fontSize='2xl'>
				    8 Enterpsrises design systems that you can download for free today.
					</Heading>
				</Box>
	        
				</Stack>
			</CardBody>
			</Card>
        </GridItem>

		</Grid>
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>)
}

export default FeaturedPost