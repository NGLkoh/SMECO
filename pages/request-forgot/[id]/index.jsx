
'use client'

import React, {useState, useEffect} from 'react'
import {Box, Text, ChakraProvider, InputGroup ,Input,InputRightElement , Button, useMediaQuery, useToast } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import InputCustom from '../../../components/inputs/index'
import axios from 'axios'
import { FaEye, FaLock } from 'react-icons/fa'

const RequestForgot = () => {
const toast = useToast()
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
const [newPassword , setNewPassword] = useState("")
const [confirmPassword , setConfirmPassword] = useState("")
const [showPassword, setShowPassword] = useState(false);
const [showPassword1, setShowPassword1] = useState(false);

const handleUpdatePassword = async () => {
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if(newPassword == confirmPassword) {
      	if (newPassword.length < 8 && newPassword.length < 8) {

      	toast({
			title: 'Password must be at least 8 characters long!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		} else if (!specialCharRegex.test(newPassword)) {
          	toast({
			title: 'Password must contain at least one special character!',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
           })
		} else {
        const params = window.location.href.split('/')
        try{ 
      const res = await axios.post('/api/users/reset-password-update', {token : params[4], password: newPassword})

      window.location.href = "/login"
          toast({
			title: "Success",
			description: "Success reset password",
			status: "success",
			duration: 2000,
			isClosable: true,
		  });  

      } catch(e) {console.log(e)}
   
	}

     } else {
	toast({
		title: "Password Not match",
		description: "Please check password.",
		status: "warning",
		duration: 2000,
		isClosable: true,
		}); 
     }
        
}


   return (<Box><ChakraProvider>
         <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
	   <Navbar page='register'/>
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
		<Box colSpan={3} bg={'#232536'} color={'#ffffff'}  height={'100%'} minHeight="100vh"> 
       <Box pl={isLargerThan980 ? '25%' : 5} pr={ isLargerThan980 ? '25%' : 5}> 
               <Box margin={"auto"} p={2}>  
								<Box mt={2} >
					<Text mb="8px">Change Password</Text>
					<InputGroup>
					 <Input
						value={newPassword}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setNewPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
						placeholder="******"
						pt={'3px'}
						size="sm"
                      maxLength={8}
						mb={4}
					/>
					<InputRightElement pb={'6px'}>
					 { showPassword ? <FaLock   color='black' onClick={() => setShowPassword(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword(true)}/>}
					</InputRightElement>
                </InputGroup>
                </Box>
              </Box>
               <Box margin={"auto"} p={2}>  
				<Box mt={2} >
              	<Text mb="8px">Confirm Password</Text>
					<InputGroup>
					 <Input
						value={confirmPassword}
						type={showPassword1 ? "text" : "password"}
						onChange={(e) => setConfirmPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
						placeholder="******"
						pt={'3px'}
						size="sm"
                         maxLength={8}
						mb={4}
					/>
					<InputRightElement pb={'6px'}>
					 { showPassword1 ? <FaLock   color='black' onClick={() => setShowPassword1(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword1(true)}/>}
					</InputRightElement>
                </InputGroup>
                </Box>
              </Box>
             <Button margin={2} onClick={() => handleUpdatePassword()}  mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
						Send
			 </Button>
       </Box>
        
   </Box>
  </Box>
 </Box>
 </Box>
 </Box>
  </ChakraProvider>	
</Box>)

}

export default RequestForgot