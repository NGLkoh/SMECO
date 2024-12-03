'use client'

import React from 'react'
import { Flex, Box, useColorModeValue, Image, ChakraProvider, Stack, Text, InputRightElement, Input, InputGroup} from '@chakra-ui/react'
import Header  from '../header/index'
import { Search2Icon } from '@chakra-ui/icons'

const Navbar = (data) => {

   return (<ChakraProvider>
  <Header/>
   <Flex
	bg={useColorModeValue('#232536', 'gray.800')}
    color={useColorModeValue('gray.600', 'white')}
	minH={'60px'}
    py={{base: 2}}
	px={{base: 2}}
	borderStyle={'solid'}
	borderColor={useColorModeValue('gray.200', 'gray.900')}
	align={'center'}>
		<Flex 
		 flex={{base: 1, mid: 'auto'}}
         ml={{ base:-2}}
		 display={{
			base: 'flex',
			md: 'none'
         }}
       >
		</Flex>

	   <Flex 
		flex={{base:1}}
		justify={{base:'center', md: 'start'}}>
			<Box>
				<Image src="http://localhost:3000/logo.png" className="logo" w="150px"/>
			</Box>
		</Flex>

       <Stack
		 flex={{base: 1, md: 1}}
		 justify={'flex-end'}
		 width="100%"
	    paddingRight="20px"
		 direction={"row"}
		 spacing={4}>

			{
           data.page != "register" ? (<Box textAlign="right" flex="1">
				<Text display="inline" color="white" p={4}><a href='/../homepage'>Home</a></Text>
			    <Text display="inline" color="white" p={4}><a href='/../blog'>Blog</a></Text>
			    <Text display="inline" color="white" p={4}><a href='/../about-us'>About Us</a></Text>
			    <Text display="inline" color="white" p={4}><a href='/../contact-us'>Contact Us</a></Text>
                 <Box display="inline" color="white">
				<InputGroup w="150px" display="inline-block" backgroundColor={"white"} borderRadius={5}>
					<Input placeholder='Search' height={6} fontSize={14} paddingBottom={1} textColor={'black'}/>
					<InputRightElement>
					<Search2Icon color='gray.500' position={'relative'} top={'-7px'} height={16} left={1} />
					</InputRightElement>
				</InputGroup>
             </Box>
		  </Box>) : ""
            }
			
     </Stack>
	</Flex>


</ChakraProvider>)
}

export default Navbar