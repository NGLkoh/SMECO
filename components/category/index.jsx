'use client'

import React from 'react'
import {Box, Text,ChakraProvider, Avatar, Card, SimpleGrid, CardHeader, Heading, CardBody, CardFooter, Button} from '@chakra-ui/react'

 let CardJson = [
   {  title: "Food",
	  sub: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      image: "1.png"
	},
 { title: "Technology",
	  sub: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      image: "1.png"
	},
 { title: "Clothing",
	  sub: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      image: "1.png"
	},
 { title: "Agriculture",
	  sub: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      image: "1.png"
	}
 ]

const Category = () => {
   return (<ChakraProvider>
      <Box width={'100%'} height={"523px"} w={'100%'} >
       <Box m={'10%'}>  
    <Box width={'80%'}  margin={'auto'} >
		<Text align="center" fontSize='30px' fontFamily="sans-serif" fontWeight={600} marginBottom={10}>Choose A Category</Text>
		<Box w={'100%'} padding={"10px"}>
         <SimpleGrid display="inline-flex" spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
			{
              CardJson.map((e => (<Card  w={'100%'} display={'inline-block'}>
				<CardBody key={e.title}>
                <Avatar mb={2} name='Segun Adebayo' src={e.image} />
				<Heading mb={2} size='md' fontWeight={600}> {e.title}</Heading>
				<Text>{e.sub}</Text>
				</CardBody>
			</Card>)))
	       }  
       </SimpleGrid>
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>)
}

export default Category