
'use client'

import React, {useState} from 'react'
import {Box, Text, ChakraProvider, PinInputField, useMediaQuery, Image, PinInput, Flex, Center, Heading  , Button, Stack, FormControl  , useToast, HStack  } from '@chakra-ui/react'
import ModalImage from '../../components/modal/viewModalImage'
import axios from "axios";
import Navbar from '../../components/nabvar';
import InputCustom from '../../components/inputs/index'
import  { useRouter} from 'next/router'
import { FileUploader } from "react-drag-drop-files";
import '../../resources/css/register.css'
const fileTypes = ["JPG", "PNG", "GIF"];

const Register = () => {
 const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
	const [firstName, setFirstname] = useState(String)
	const [lastName, setlastName] = useState(String)
    const [businessPermit, setBusinessPermit] = useState(String)
	const [barangayClearance, setBarangayClearabce] = useState(String)
	const [email,setEmail] = useState(String)
 	const [password, setPassword] = useState(String)
    const [next, setNext] = useState(1)
	const router = useRouter()
    const [code1, setCode1] = useState(Number)
	const [code2, setCode2] = useState(Number)  
	const [code3, setCode3] = useState(Number)  
	const [code4, setCode4] = useState(Number)  
    const [filenameBP, setFilenameBP] = useState()  
    const [filenameBC, setFilenameBC] = useState()  
	const [ title, setTitle] = useState("")
	const [ source, setSource] = useState('')
	const [ open, setOpen] = useState(false)
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
  const handleOpenModal = (title, source) => {
      setOpen(true)
      setTitle(title)
      setSource(source)
   }

   const onCloseModal = () => {
     setOpen(false)
    }
  const handleChangeBusinessPermit = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFilenameBP(`${r}-${file.name}`)
       new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setBusinessPermit(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};
	const handleChangeBarangayClearance = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFilenameBC(`${r}-${file.name}`)
        new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setBarangayClearabce(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

	const handleSendingEmail =  async () => {
		let val = Math.floor(1000 + Math.random() * 9000);
		console.log(val);
         try{ await axios.post('/api/s3/upload', {filename: filenameBP, base64: businessPermit})}
         catch(e) { console.log(e)}
         try{ await axios.post('/api/s3/upload', {filename: filenameBC, base64: barangayClearance}) } 
         catch(row) {console.log(row) }

		 const res = await axios.post('/api/users/create', 
		{   username: email,
            password: password,
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
			code: val, 
            businessPermit: filenameBP, 
            barangayClearance: filenameBC  })
		if(res.data.message === 'true') {
		 await axios.post('/api/email/sendEmail', { email:  email, code: val})
          toast({
          title: 'Code has been sent to your Email Successfullly',
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
			title: 'Successfully Verfied',
			status: 'success',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})

	      isLargerThan980 ? router.push('/dashboard') :  router.push('/homepage')
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
		<Box colSpan={3} bg={'#232536'} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 
		   
			    { next == 1  ? (  
            <Box pl={isLargerThan980 ? '25%' : 5} pr={ isLargerThan980 ? '25%' : 5}> 
              <Text fontSize='4xl' fontWeight={600}  mb={2} textAlign={'center'}>Register</Text>	     
				{ fields.map((row, index) => (<InputCustom key={index} data={row}/> ))}
			  
                <Box textAlign={'center'} mt={4} >
				<Button colorScheme='teal' isDisabled={firstName && lastName && email && password ? false : true} mt={2} width={'98%'} bg={'#FFD050'} variant='solid' onClick={() =>  setNext(2)}>
						Next
				</Button>
				<Box textAlign={'center'}  padding={2}>
			
				</Box>
               </Box></Box>) : next == 2 ?  (
			     <Box pl={isLargerThan980 ? '30%': 5} pt={isLargerThan980 ? 0 : 5} pr={isLargerThan980 ? '30%': 5}  color={'#000000'}> 
                 <Box bg={'#ffff'} borderRadius={6}> 
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }} fontWeight={600} pt={4} mb={1} textAlign={'center'}>Upload the following documents</Text>	     
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>1. Updated Business Permit </Text>	     
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>2. Barangay Clearance</Text>
				   
				   <Box pl={'15%'} pr={'15%'} pb={'15%'} mt={4}> 
					<Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Business Permit</Text>
				      <FileUploader     classes="custom-fileUploader" handleChange={(e) => handleChangeBusinessPermit(e)} name="file" types={fileTypes} />
					  <Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Barangay Clearance</Text>
                      <FileUploader     classes="custom-fileUploader" handleChange={(e) => handleChangeBarangayClearance(e)} name="file" types={fileTypes} />
                     
					<Text mt={4} opacity={0.7} fontSize={{ base: '10px', md: 'xsm', lg: 'xsm' }} className='req-text'> Formats accepted are .pdf, .jpg, and .png </Text>
					<Text mt={4} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}> If you do not have a file you can use the sample below: </Text>
					<Box mt={2}mr={'20%' }> 
						<Image onClick={() => handleOpenModal('Business Permit','document/business-permit.png')} src="first.png" className="logo" w="150px" mb={2}/>
						<Image onClick={() =>  handleOpenModal('Barangay Clearance','document/business-clearance-sample.png')} src="second.png" className="logo" w="150px"/>
					</Box>

					<Box  mt={6}> 
					<Button   onClick={() => setNext(1)}  margin={2} colorScheme='teal' mt={2} width={'auto'} bg={'#fffff'} border={'1px solid #000000'} color={'#000000'} variant='solid'>
						Back
					</Button> 
					<Button margin={2} disabled={ businessPermit && barangayClearance ? false : true }  onClick={(e) => handleSendingEmail(e)} colorScheme='teal' mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
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
				bg={'#232536'}>
			<Stack
				spacing={4}
				w={isLargerThan980 ? '100%' : '85%'}
				h={ isLargerThan980 ? 'xl' : "sm"}
				maxW={'xl'}
				bg={'white'}
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
				color={'gray.800'}>
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
					<HStack my={ isLargerThan980 ? '20' : 10}>
					<PinInput>
						<PinInputField  height={isLargerThan980 ? '20' : '10'} width={isLargerThan980 ? '20' : '10'} fontSize={isLargerThan980 ? '50' : '25'} color={'#000000'} onChange={(e) => setCode1(e.target.value)}/>
						<PinInputField  height={isLargerThan980 ? '20' : '10'} width={isLargerThan980 ? '20' : '10'} fontSize={isLargerThan980 ? '50' : '25'} color={'#000000'} onChange={(e) => setCode2(e.target.value)}/>
						<PinInputField   height={isLargerThan980 ? '20' : '10'} width={isLargerThan980 ? '20' : '10'} fontSize={isLargerThan980 ? '50' : '25'}  color={'#000000'} onChange={(e) => setCode3(e.target.value)}/>
						<PinInputField   height={isLargerThan980 ? '20' : '10'} width={isLargerThan980 ? '20' : '10'} fontSize={isLargerThan980 ? '50' : '25'} color={'#000000'}onChange={(e) => setCode4(e.target.value)}/>
					</PinInput>
					</HStack>
				</Center>
				</FormControl>
					<Stack spacing={isLargerThan980 ? 6 : 2}>
						<Button
							bg={'#FFD050'} 
							mx={isLargerThan980  ? '30' : '10'}
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
 <ModalImage open={open} onCloseModal={onCloseModal} source={source} title={title}/>
</ChakraProvider>
</Box>)

}

export default Register