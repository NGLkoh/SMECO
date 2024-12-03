'use client'

import React, { useState, useEffect } from 'react'
import {Box, Text,ChakraProvider, Grid, GridItem, Image, Heading, CardBody, Card, Button, Stack, Link } from '@chakra-ui/react'
import axios from 'axios'
import '../../resources/css/featured.css'
const FeaturedPost = () => {
const [template , setTemplateState] = useState([])
const [selectedKey , setSelectedKey] = useState(0)
 useEffect(() => {
    getTemplate()
  }, [])

const getTemplate = async () => {
    const res = await axios.post('/api/template/all')
    setTemplateState(res.data.result)
    console.log(res.data.result)
  }

const selectedTemplate = (key) => {
         setSelectedKey(key)
}

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
			  {template.map((row, key) => ( key == selectedKey ? <Box margin={"auto"} p={2} >  
				<Image src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.fileName}`}/>
				{/* <Text fontSize={9} mt={4}>  By Juan Dela Cruz   l   May 23, 2024 </Text> */}
				<Text fontWeight={600} mt={4}> 	{row.title} </Text>
				<Text mt={4} fontSize={10}>     {row.description} </Text>
				<Link href={`/blog-client/${row._id}`}><Button colorScheme='teal' size='lg' fontFamily="sans-serif" mt={4} borderRadius={0} backgroundColor={'#ffd050'} w={40} color={"#000000"} fontSize={14}>
					Read More <Text ml={1.5} position={'relative'} fontSize={16} bottom={'0px'}>&gt;</Text>
				</Button></Link>
			</Box> : ""))}
		
		</GridItem>
		<GridItem colSpan={2}  >
            <Text  fontSize='2xl' fontFamily="sans-serif" ml={2} mb={6} fontWeight={600}>All Posts</Text>
			<Card boxShadow={'unset'} >
			<CardBody pt={'0px'} border={'unset'}>
				<Stack  spacing='4' className='feature-scroll'>
                {template.map((row, key) => (<Box cursor={'pointer'} p={4} background={ key == selectedKey ? '#eee' : ""} key={row._id} onClick={(e) => selectedTemplate(key)}>
					<Text size='sm' fontSize={9} textTransform='uppercase'>
					{row.title}
					</Text>
					<Heading pt='2' fontSize='12px'>
				    {row.description}
					</Heading>
				</Box>))}
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