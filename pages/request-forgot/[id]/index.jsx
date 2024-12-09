
'use client'

import React, {useState, useEffect} from 'react'
import {Box, Text, ChakraProvider, Button, useMediaQuery, useToast } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import InputCustom from '../../../components/inputs/index'
import axios from 'axios'

const RequestForgot = () => {
const toast = useToast()
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
const [newPassword , setNewPassword] = useState("")
const [confirmPassword , setConfirmPassword] = useState("")

const fields = [{
			function: setNewPassword,
			title: 'Enter New Password',
			placeholder: 'Enter new password',
            type: 'password',
			value: newPassword
}, 
{
			function: setConfirmPassword,
			title: 'Confirm New Password',
			placeholder: 'Confirm New Password',
             type: 'password',
			value: confirmPassword
}]

const handleUpdatePassword = async () => {
      if(newPassword == confirmPassword) {
        const params = window.location.href.split('/')
        const res = await axios.post('/api/users/reset-password-update', {token : params[4], password: newPassword})
        window.location.href = "/login"
          toast({
			title: "Success",
			description: "Success reset password",
			status: "success",
			duration: 2000,
			isClosable: true,
		  });  

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
           { fields.map((row, index) => (<InputCustom key={index} data={row}/> ))}
          <Button margin={2} onClick={() => handleUpdatePassword()} colorScheme='teal' mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
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