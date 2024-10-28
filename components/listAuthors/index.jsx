'use client'

import React from 'react'
import {Box, Text,ChakraProvider, Avatar, Card, SimpleGrid, Heading, CardBody} from '@chakra-ui/react'
import { FaFacebook, FaInstagram , FaTwitter, FaLinkedin, FaPersonBooth} from 'react-icons/fa'; 

 let CardJson = [
   {  title: "Juan Dela Cruz",
	  sub: "Content Writer @Company",
      image: "1.png"
	},
 { title: "Juan Dela Cruz",
	  sub: "Content Writer @Company",
      image: "1.png"
	},
 { title: "Juan Dela Cruz",
	  sub: "Content Writer @Company",
      image: "1.png"
	},
 { title: "Juan Dela Cruz",
	  sub: "Content Writer @Company",
      image: "1.png"
	}
 ]

const ListAuthor = () => {
   return (<ChakraProvider>
      <Box width={'100%'} height={"523px"} w={'100%'} >
       <Box m={'10%'}>  
       <Box width={'80%'}  margin={'auto'} >
		<Text align="center" fontSize='30px' fontFamily="sans-serif" fontWeight={600} marginBottom={10}>List of Authors</Text>
		<Box w={'100%'} padding={"10px"} textAlign={'center'}>
         <SimpleGrid display="inline-flex"  w={'100%'}  spacing={4}  templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
			{
              CardJson.map((e,index) => (<Card  key={index} w={'100%'} display={'inline-block'}>
				<CardBody>
                <Avatar mb={2} name='Segun Adebayo' src={e.image} />
				<Heading mb={2} size='md' fontWeight={600}> {e.title}</Heading>
				<Text fontSize={'10px'} >{e.sub}</Text> 
				<Box textAlign={'center'} position={'relative'} mt={2} w={'100%'}>
						<Text display={'inline-block'} m={1}> <FaFacebook/></Text>  
						<Text display={'inline-block'} m={1}> <FaTwitter/></Text>
						<Text display={'inline-block'} m={1}> <FaInstagram/></Text>
						<Text display={'inline-block'} m={1}> <FaLinkedin/></Text>
                </Box>
				</CardBody>
			</Card>))
	       }  
       </SimpleGrid>
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>)
}

export default ListAuthor