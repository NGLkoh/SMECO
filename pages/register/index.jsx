
'use client'


import ReCAPTCHA from "react-google-recaptcha";
import React, {StrictMode, useState} from 'react'
import {Box, Text, Input,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure ,ChakraProvider, PinInputField, useMediaQuery, Image, PinInput, Flex, Center, Heading  , Button, Stack, FormControl  , useToast, HStack, InputGroup, InputRightElement  } from '@chakra-ui/react'
import ModalImage from '../../components/modal/viewModalImage'

import axios from "axios";
import Navbar from '../../components/nabvar';
import InputCustom from '../../components/inputs/index'
import  { useRouter} from 'next/router'
import { FileUploader } from "react-drag-drop-files";
import '../../resources/css/register.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import SaveGoolgeLogin  from '../../components/modal/register'
import { FaEye, FaLock } from "react-icons/fa";
const fileTypes = ["JPG", "PNG", "GIF"];
const CLIENT_ID = "512275838388-jal64cg1khdpl58kt7ba9c1k2ge0u041.apps.googleusercontent.com"


const Register = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
 const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
	const [firstName, setFirstname] = useState(String)
	const [lastName, setlastName] = useState(String)
	const [ID, setID] = useState(String)
    const [businessPermit, setBusinessPermit] = useState(String)
	const [barangayClearance, setBarangayClearabce] = useState(String)
	const [email,setEmail] = useState(String)
 	const [password, setPassword] = useState(String)
	 const [password1, setPassword1] = useState(String)
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
    const [ btn , setBtn1] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [modalRegisterLogin, setModalRegisterLogin] = useState(false);
  const [decodeCredentials, setDecodeCredentials] = useState({});
	let fields = [
		{
			function: setFirstname,
			title: 'Enter your First Name',
			placeholder: 'Juan',
			value: firstName
		},
		{
			function: setlastName,
			title: 'Enter your Last Name',
			placeholder: 'Dela Cruz',
			value: lastName
		},
		{
			function: setEmail,
			title: 'Enter your Business Email',
			placeholder: 'business@gmail.com',
			value: email
		}
	]
  const closeModalRegisterLogin = () =>  {
      setModalRegisterLogin(false )
  }


	const toast = useToast()

  const handleOpenModal = (title, source) => {
      setOpen(true)
      setTitle(title)
      setSource(source)
   }


   const onCloseModal = () => {
     setOpen(false)
    }
	const handleChangeID = async (file)  => {
		let r = (Math.random() + 1).toString(36).substring(7)
			 setFilenameBP(`${r}-${file.name}`)
		   new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => {
				  setID(reader.result)
				 resolve(reader.result)
				}
				reader.onerror = reject
			})
		};

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

        setBtn1(true)
		if(res.data.message === 'true') {
           setBtn1(false)
         try{ await axios.post('/api/email/sendEmail', { email:  email, code: val})
          toast({
          title: 'Verification code has been sent to your Email Successfullly',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
       }catch(e) {console.log(e)}
		 
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
    const handleLoginGoogle = async (credentialRes) => {
    const creds = jwtDecode(credentialRes.credential)
    try{ const res = await axios.post('/api/users/login', { username: creds.email, password: 'google' });
    if (res.data.message === 'false') {
    setModalRegisterLogin(true)
    setDecodeCredentials(jwtDecode(credentialRes.credential)) 
    } else if (res.data.message === 'true') {
      if (res.data.result[0].active) {
         toast({
          title: `You can't sign in using mobile`,
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });

      } else {

        toast({
          title: 'Please wait for admin verification',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
	}} catch(e) { console.log(e)}
  }
	const handleVerify = async () => {
        try{ const res = await axios.post('/api/users/verify', {code: parseFloat(`${code1}${code2}${code3}${code4}`)})
	
		if(res.data.message === 'true') {
        
          toast({
			title: 'Successfully Verfied',
			status: 'success',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})

	      isLargerThan980 ? router.push('/dashboard') :  router.push('/')
         } else {
  			toast({
			title: 'Incorrect Code!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		 }	} catch(e){console.log(e)}
	}

  const onChangeRecapcha = () => {
 setRecaptchaVerified(true); 
 }
  const handleNext = async() => {
     const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    try{ const res = await axios.post('/api/users/checker', {email : email})
     
     if(res.data.message !== 'true') { 
		if (password.length < 8 ) {

      	toast({
			title: 'Password must be at least 8 characters long!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		} else if (!specialCharRegex.test(password)) {
          	toast({
			title: 'Password must contain at least one special character!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		} else if (password !== password1) {
			toast({
				title: 'Password does not match!',
				status: 'warning',
				position: 'top-right',
				duration: 9000,
				isClosable: true,
			})
		} else {
		setNext(2)
		}
      
    } else {
	toast({
			title: 'Email already existed!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
   }}catch(e){console.log(e)}
  }
   return (<StrictMode> <GoogleOAuthProvider clientId={CLIENT_ID}> <Box><ChakraProvider>
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
	   <Navbar page='register'/>
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
		<Box colSpan={3} bg={'#232536'} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 
		   
			    { next == 1  ? (  
            <Box pl={isLargerThan980 ? '25%' : 5} pr={ isLargerThan980 ? '25%' : 5}> 
              <Text fontSize='4xl' fontWeight={600}  mb={2} textAlign={'center'}>Register</Text>	     
  { fields.map((row, index) => (<InputCustom key={index} data={row}/>))  }
                    <Box margin={"auto"} p={2}>  
								<Box mt={2} >
					<Text mb="8px">Password</Text>
					<InputGroup>
					 <Input
						value={password}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
                        maxLength={30}
						placeholder="******"
						pt={'3px'}
						size="sm"
                        
						mb={0}
					/>
					
					<InputRightElement pb={'6px'}>
					 { showPassword ? <FaLock   color='black' onClick={() => setShowPassword(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword(true)}/>}
					</InputRightElement>
				</InputGroup>
				</Box>
				</Box>

				<Box margin={"auto"} p={2}>  
								<Box mt={1} >
					<Text mb="8px">Confirm Password</Text>
					<InputGroup>
					 <Input
						value={password1}
						type={showPassword1 ? "text" : "password"}
						onChange={(e) => setPassword1(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
                        maxLength={30}
						placeholder="******"
						pt={'3px'}
						size="sm"
                        
						mb={4}
					/>
					
					<InputRightElement pb={'6px'}>
					 { showPassword1 ? <FaLock   color='black' onClick={() => setShowPassword1(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword1(true)}/>}
					</InputRightElement>
				</InputGroup>
				</Box>
				</Box>

                <Box textAlign={'center'} mt={4} >

				<Box margin={"auto"} pl={ isLargerThan980 ? '34%' : '6%'} mb={"20px"}>
					<ReCAPTCHA
					sitekey="6LfoxpYqAAAAAP27JqB_GiMEWoDby8gSfV_ujAeP"
					onChange={ () => onChangeRecapcha()}
     				 /></Box>
				<Button  isDisabled={firstName && lastName && email && password ? false : true} mt={2} width={'98%'} bg={'#FFD050'} variant='solid' onClick={() =>  {if (!recaptchaVerified) {
				toast({
					title: "Please complete the reCAPTCHA",
					description: "Warning",
					status: "warning",
					duration: 2000,
					isClosable: true,
					});
				return;
				} else { handleNext()}}}>
						Next
				</Button>
             <Box  className="google-container"
				mb={4}
                mt={10}
				sx={{
					display: 'flex',
					justifyContent: 'center', // Centers horizontally
					alignItems: 'center',      // Centers vertically           // Make the Box take full height of its parent (if needed)
				}}>
               <GoogleLogin width={'100% !important'} marginBottom={6} onSuccess={(credentialRes) => handleLoginGoogle(credentialRes)} onError={() => console.log('login error')}/>
           </Box>
				<Box textAlign={'center'}  padding={2}>
			
				</Box>
               </Box></Box>) : next == 2 ?  (
			     <Box pl={isLargerThan980 ? '30%': 5} pt={isLargerThan980 ? 0 : 5} pr={isLargerThan980 ? '30%': 5}  color={'#000000'}> 
                 <Box bg={'#ffff'} borderRadius={6}> 
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }} fontWeight={600} pt={4} mb={1} textAlign={'center'}>Upload the following documents:</Text>	     
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>1. Valid Identification Card </Text>	
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>2. Updated Business Permit </Text>	       
				 <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}   textAlign={'center'}>3. Barangay Clearance</Text>
				   
				   <Box pl={'15%'} pr={'15%'} pb={'15%'} mt={4}> 
					  <Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Valid Identification Card</Text>
				      <FileUploader     classes="custom-fileUploader" handleChange={(e) => handleChangeID(e)} name="file" types={fileTypes} />
					  <Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Business Permit</Text>
                      <FileUploader     classes="custom-fileUploader" handleChange={(e) => handleChangeBusinessPermit(e)} name="file" types={fileTypes} />
					  <Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Barangay Clearance</Text>
                      <FileUploader     classes="custom-fileUploader" handleChange={(e) => handleChangeBarangayClearance(e)} name="file" types={fileTypes} />
                     
					<Text mt={4} opacity={0.7} fontSize={{ base: '10px', md: 'xsm', lg: 'xsm' }} className='req-text'> Formats accepted are .pdf, .jpg, and .png </Text>
					<Text mt={4} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}> If you do not have a file you can use the sample below: </Text>
					<Box mt={2} mr={'20%'} > 
					<Text mt={4} mb={'5%'}  fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}> Upload Passport, Driver's License, National ID etc. <Text fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }} onClick={() => handleOpenModal('ID Sample','document/idsample.png')} b={2}><b>View Sample</b></Text></Text>
						<Image onClick={() => handleOpenModal('Business Permit','document/business-permit.png')} src="first.png" className="logo" w="150px" mb={2}/>
						<Image onClick={() =>  handleOpenModal('Barangay Clearance','document/business-clearance-sample.png')} src="second.png" className="logo" w="150px"/>
					</Box>
					{/* Privacy Policy Section */}
					<Box mt={4} display="flex" alignItems="center">
							<Text fontSize="sm" mr={2}>
							By proceeding, you agree to the{' '}
							<Text
								as="span"
								color="blue.500"
								cursor="pointer"
								onClick={() => onOpen()}
								fontWeight="bold"
							>
								Privacy Policy
							</Text>{' '}
							and consent to the collection of data in accordance with the 
							<Text
								as="span"
								color="blue.500"
								cursor="pointer"
								onClick={() => onOpen()}
								fontWeight="bold"
							>
								{' '}Privacy Policy Act in the Philippines.
							</Text>
							</Text>
						</Box>
					<Box  mt={6}> 
					<Button   onClick={() => setNext(1)}  margin={2} mt={2} width={'auto'} bg={'#fffff'} border={'1px solid #000000'} color={'#000000'} variant='solid'>
						Back
					</Button> 
					<Button margin={2} isDisabled={ btn  ? false : businessPermit && barangayClearance ? false : true }  onClick={(e) => handleSendingEmail(e)}  mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
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
   <SaveGoolgeLogin modalRegisterLogin={modalRegisterLogin} closeModalRegisterLogin={closeModalRegisterLogin} decodeCredentials={decodeCredentials}/>
 {/* Modal for Privacy Policy */}
<Modal  width={900} isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  
  <ModalContent maxWidth="1300px" width="1300px" p={10}>
    <ModalHeader>Privacy Policy for Markadong Pinoy</ModalHeader>
    <ModalBody>
      <Text fontSize="14px">
        <b>Introduction:</b> At Markadong Pinoy, we are committed to protecting the privacy of our users. This Privacy Policy outlines the types of personal data we collect, how it is used, and the steps we take to ensure its security. By using our platform, you agree to the collection and use of data in accordance with this policy.

        <br /><br />
        <b>1. Data Collection:</b> We collect personal data to facilitate services provided through the Markadong Pinoy platform. This includes:
        <ul>
          <li>Personal details such as name, contact information, and identification documents.</li>
          <li>Transactional data, including interactions within the platform.</li>
          <li>Browsing data such as IP addresses, cookies, and device details to improve user experience.</li>
        </ul>

        <br />
        <b>2. Use of Data:</b> The data we collect is used for the following purposes:
        <ul>
          <li>To provide and improve our platform services.</li>
          <li>To verify the identity and credentials of users for security purposes.</li>
          <li>For communication regarding account updates, services, or promotional materials related to Markadong Pinoy.</li>
          <li>To analyze platform usage and enhance the functionality and experience of users.</li>
        </ul>

        <br />
        <b>3. Data Protection:</b> We employ various technical and administrative measures to safeguard the confidentiality, integrity, and availability of your personal data. These measures include:
        <ul>
          <li>Secure encryption of sensitive data during transfer and storage.</li>
          <li>Regular audits and checks on our data storage systems.</li>
          <li>Implementing access control measures to ensure only authorized personnel can access personal data.</li>
        </ul>

        <br />
        <b>4. Third-party Sharing:</b> We do not sell, trade, or otherwise transfer your personal data to third parties, except in the following circumstances:
        <ul>
          <li>With trusted third-party service providers who assist in the operation of our platform and who have agreed to maintain confidentiality.</li>
          <li>When required by law or governmental authorities to comply with legal processes, subpoenas, or other legal obligations.</li>
        </ul>

        <br />
        <b>5. User Rights:</b> As a user, you have rights under the Data Privacy Act of 2012 (Republic Act No. 10173). These include:
        <ul>
          <li>The right to access your personal data that we store.</li>
          <li>The right to rectify inaccurate or outdated data.</li>
          <li>The right to object to the processing of your data for specific purposes.</li>
          <li>The right to request deletion of your personal data, subject to certain conditions under the law.</li>
        </ul>

        <br />
        <b>Data Privacy Act Compliance:</b> In compliance with the Data Privacy Act of 2012 in the Philippines, Markadong Pinoy ensures that all your data is handled with the utmost care and in accordance with legal requirements. We are committed to protecting your personal information and ensuring that it is never misused or accessed without your consent.

        <br /><br />
        If you have any questions regarding our privacy practices or your personal data, you can contact us at our support team for further clarification.

      </Text>
    </ModalBody>

    <ModalFooter>
      <Button onClick={onClose}>
        Agree & Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
</ChakraProvider>
</Box></GoogleOAuthProvider></StrictMode>)

    
}

export default Register