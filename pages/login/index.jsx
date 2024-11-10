
'use client'

import React, {useState} from 'react'
import {Box, Text, ChakraProvider, Grid, GridItem, Image,useColorModeValue, Input, Flex, CardBody, Spacer , Button, Stack, StackDivider , useToast, position } from '@chakra-ui/react'
import '../../resources/css/style.css'
import { FaGoogle} from 'react-icons/fa'; 
import CaptionCarousel from '../../components/carousel'; 
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState(String)
	const [password, setPassword] = useState(String)
	const toast = useToast()
	const  handelLogin = async ()  => {
		const res = await axios.post('/api/users/login', {username: username, password: password})
	     
        if(res.data.message === 'false') {
          toast({
          title: 'Login Failed, Incorrect password', 
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
        } else if ((res.data.message === 'true') ) { 
          if(res.data.result[0].active) {
		  let origin = window.location.origin
		  window.location.href = `${origin}/dashboard`
          toast({
          title: 'Login Succces',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
         } else {
	       toast({
          title: 'Please wait email to verify your account',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
		}
        }
		
	 	console.log(username)
		console.log(password)
   }

   return (<Box><ChakraProvider>
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
        <Grid
		
		templateRows='repeat(2, 1fr)'
		templateColumns='repeat(6, 1fr)'
		 height={'100%'}
		minHeight="100vh"
		>
		<GridItem colSpan={3} bg={useColorModeValue('#232536', 'gray.800')} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 
			<Box margin={"auto"} p={2}  >  

                <Image src="logo.png" className="logo" w="150px"/>
				<Box padding={8}>
				<Box mt={2} >
					<Text fontSize='xl' fontWeight={800} fontStyle={'Helvetica Neue'} mb={2} >Sign in</Text>
					<Text mb='8px'>Email</Text>
					<Input
						value={username}
						// value={value}
						// onChange={handleChange}
						bg={'#FFFFFF'}
						onChange={(e) =>  setUsername(e.target.value)}
						color={'#4A5568'}
						borderRadius={8}
						placeholder='example@.gmail.com'
						size='sm'
					/>
				   </Box>
  
				  <Box mt={2}>
					<Text mb='8px'>Password</Text>
					<Input
						value={password}
						// onChange={handleChange}
						type='password'
					    onChange={(e) =>  setPassword(e.target.value)}
						bg={'#FFFFFF'}
						color={'#4A5568'}
						borderRadius={8}
						placeholder='@#*%'
						size='sm'
					/>
                    </Box>
						<Box>
					<Flex>
					<Box p='4'>
				
					</Box>
					<Spacer />
					<Box p='4' >
						Forgot Password? 
					</Box>
					</Flex>
					</Box>
				  <Button colorScheme='teal' mt={2} width={'100%'} bg={'#FFD050'} variant='solid' onClick={handelLogin}>
					Sign in
				  </Button>
				  <Box className="at-sep custom-cursor-default-hover"><Text className="devider custom-cursor-default-hover">OR</Text></Box>
				   <Button leftIcon={<FaGoogle />} width={'100%'} color={'#000000'} bg='#ffffff' >
					Continue with Google
				   </Button>
					<Box textAlign={'center'} mt={4} position={'relative'}>
				     	 <Text  mt={2} mb={'8px'} display={'inline'}>Don’t have an account?</Text><Text ml={2} color={'#FFD050'} display={'inline'} ><a href='/../register'>Create Now</a></Text>
				    </Box>
				</Box>
			</Box>
		
		</GridItem>
		<GridItem colSpan={3} bg={useColorModeValue('#FFD050', 'gray.800')} color={'#ffffff'}  height={'100%'} minHeight="100vh">
           <CaptionCarousel/>
        </GridItem>
		</Grid>
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>
</Box>)

}

export default Login