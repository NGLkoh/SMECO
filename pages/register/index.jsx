
'use client'

import React, {useState} from 'react'
import {Box, Text, ChakraProvider, PinInputField, Image,useColorModeValue, PinInput, Flex, Center, Heading  , Button, Stack, FormControl  , useToast, HStack  } from '@chakra-ui/react'

import { FaGoogle} from 'react-icons/fa'; 
import CaptionCarousel from '../../components/carousel'; 
import axios from "axios";
import Navbar from '../../components/nabvar';
import InputCustom from '../../components/inputs/index'
import  { useRouter} from 'next/router'
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

const Register = () => {
	const [firstName, setFirstname] = useState(String)
	const [lastName, setlastName] = useState(String)
	const [email,setEmail] = useState(String)
 	const [password, setPassword] = useState(String)
    const [next, setNext] = useState(1)
	const router = useRouter()
	const [file, setFile] = useState(null);
    const [code1, setCode1] = useState(Number)
	const [code2, setCode2] = useState(Number)  
	const [code3, setCode3] = useState(Number)  
	const [code4, setCode4] = useState(Number)  
    const [code, setCode] = useState(Number)  
	const handleChange = (file) => {
		console.log(file)
		setFile(file);
	};

	let fields = [
		{
			function: setFirstname,
			title: 'Enter Fist Name',
			placeholder: 'Juan',
			value: firstName
		},
		{
			function: setlastName,
			title: 'Enter Last Name',
			placeholder: 'Dela Cruz',
			value: lastName
		},
		{
			function: setEmail,
			title: 'Enter Business E-email',
			placeholder: 'business@gmail.com',
			value: email
		},
		{
			function: setPassword,
			title: 'Create your Password',
			placeholder: '@!#$$%',
			value: password
		}
	]
	const toast = useToast()

	const handelRegister = async () => {
        // const res = await axios.post('/api/email/sendEmail', { email: "ianmedina9090@gmail.com" })
		//  setNext(2)
       
	 }

	const handleSendingEmail =  async () => {
		let val = Math.floor(1000 + Math.random() * 9000);
		console.log(val);
		 const res = await axios.post('/api/users/create', {username: email, password: password, email: email, firstName: firstName, lastName: lastName, code: val  })
		if(res.data.message === 'true') {
		 const emailRes = await axios.post('/api/email/sendEmail', { email:  email, code: val})
		 setCode(val)
          toast({
          title: 'Successfully Email Send',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
         } else {
	       toast({
          title: 'Error server',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
		}
		 setNext(3)
    }
	const handleVerify = async () => {
		 const res = await axios.post('/api/users/verify', {code: parseFloat(`${code1}${code2}${code3}${code4}`)})
		if(res.data.message === 'true') {
        
          toast({
			title: 'Successfully Verfiy',
			status: 'success',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})

	      router.push('/dashboard')
         } else {
  			toast({
			title: 'Incorrect Code!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		 }
	}
   return (<Box><ChakraProvider>
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
	   <Navbar page='register'/>
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
		<Box colSpan={3} bg={useColorModeValue('#232536', 'gray.800')} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 
		   
			    { next == 1  ? (  <Box pl={'25%'} pr={'25%'}>  <Text fontSize='4xl' fontWeight={600}  mb={2} textAlign={'center'}>Register</Text>	     
				{ fields.map(row => (<InputCustom data={row}/> ))}
			  
                <Box textAlign={'center'} mt={4} >
				<Button colorScheme='teal' isDisabled={firstName && lastName && email && password ? false : true} mt={2} width={'98%'} bg={'#FFD050'} variant='solid' onClick={(e) =>  setNext(2)}>
						Next
				</Button>
				<Box textAlign={'center'}  padding={2}>
				<Box className="at-sep custom-cursor-default-hover"><Text className="devider custom-cursor-default-hover">OR</Text></Box>
				   <Button leftIcon={<FaGoogle />} width={'100%'} color={'#000000'} bg='#ffffff' >
					Continue with Google
				   </Button>
					<Box textAlign={'center'} mt={4} position={'relative'}>
				     	<Text  mt={2} mb={'8px'} display={'inline'}>Alreay have an account? </Text><Text ml={2} color={'#FFD050'} display={'inline'}>Sign in now</Text>
				  </Box>
				</Box>
               </Box></Box>) : next == 2 ?  (
			     <Box pl={'30%'} pr={'30%'}  color={'#000000'}> 
                 <Box bg={'#ffff'} borderRadius={6}> 
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }} fontWeight={600} pt={4} mb={1} textAlign={'center'}>Upload the following documents</Text>	     
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>1. Updated Business Permit </Text>	     
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>2. Barangay Clearance</Text>
				   
				   <Box pl={'15%'} pr={'15%'} pb={'15%'} mt={4}> 
					<Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Business Permit</Text>
				     <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
					  <Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Barangay Clearance</Text>
                      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                     
					<Text mt={4} opacity={0.7} fontSize={{ base: '10px', md: 'xsm', lg: 'xsm' }} className='req-text'> Formats accepted are .pdf, .jpg, and .png </Text>
					<Text mt={4} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}> If you do not have a file you can use the sample below: </Text>
					<Box mt={2}mr={'20%' }> 
						<Image src="first.png" className="logo" w="150px" mb={2}/>
						<Image src="second.png" className="logo" w="150px"/>
					</Box>

					<Box  mt={6}> 
					<Button   onClick={(e) => setNext(1)}  margin={2} colorScheme='teal' mt={2} width={'auto'} bg={'#fffff'} border={'1px solid #000000'} color={'#000000'} variant='solid'>
						Back
					</Button> 
					<Button margin={2}  onClick={(e) => handleSendingEmail(e)} colorScheme='teal' mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
						Continue
					</Button>
			 	</Box>
				</Box>
				</Box>
	`			</Box>
					) : (<>
                   <Flex
			minH={'90vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('#232536', 'gray.800')}>
			<Stack
				spacing={4}
				w={'100%'}
				h={'xl'}
				maxW={'xl'}
				bg={useColorModeValue('white', 'gray.700')}
				rounded={'xl'}
				boxShadow={'lg'}
				p={10}
				my={10}>
				<Center>
				<Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '4xl' }} color={'#000000'}>
					Enter Verification Code
				</Heading>
					
				</Center>
				<Center
				fontSize={{ base: 'sm', sm: 'md' }}
				color={useColorModeValue('gray.800', 'gray.400')}>
					Please check your email
				</Center>
				{/* <Center
				fontSize={{ base: 'sm', sm: 'md' }}
				fontWeight="bold"
				color={useColorModeValue('gray.800', 'gray.400')}>
				username@mail.com
				</Center> */}
				<FormControl>
				<Center>
					<HStack my={'20'}>
					<PinInput>
						<PinInputField  height={'20'} width={'20'} fontSize={'50'} color={'#000000'} onChange={(e) => setCode1(e.target.value)}/>
						<PinInputField  height={'20'} width={'20'} fontSize={'50'}  color={'#000000'} onChange={(e) => setCode2(e.target.value)}/>
						<PinInputField  height={'20'} width={'20'} fontSize={'50'}  color={'#000000'} onChange={(e) => setCode3(e.target.value)}/>
						<PinInputField  height={'20'} width={'20'} fontSize={'50'}  color={'#000000'}onChange={(e) => setCode4(e.target.value)}/>
					</PinInput>
					</HStack>
				</Center>
				</FormControl>
					<Stack spacing={6}>
						<Button
							bg={'#FFD050'} 
							mx={'30'}
							color={'white'}
							onClick={(e) => handleVerify(e)}
							_hover={{
							bg: '#232536',
							}}>
							Verify
						</Button>
						</Stack>
					</Stack>
					</Flex>
					</>)
					}
				</Box>
			</Box>
			</Box>
			</Box>
		</Box>
</ChakraProvider>
</Box>)

}

export default Register