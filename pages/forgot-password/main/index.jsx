'use client'

import React, { useState } from 'react'
import {Box, ChakraProvider, useToast, Text, useMediaQuery, Button } from '@chakra-ui/react'
import InputCustom from '../../../components/inputs/index'
import axios from 'axios'
const InputComponent = () => {

const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
const [email, setEmail] = useState("")
const toast = useToast()
const fields = [{
			function: setEmail,
			title: 'Registered email',
			placeholder: 'Enter Email',
			value: email
		}]
const handleResetPassword = async () => {
 if(email){
 try{
  setEmail('')
  const res = await axios.post('/api/users/reset-password', {email : email})
  toast({
      title: "Success",
      description: "Please check the link sent to your email.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });  
  } catch (e) {
   console.log(e) 
  }

  } else {
  toast({
      title: "Incomplete",
      description: "Please add email.",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });   
  }
      
   }
  
 return (<> 
    <Box><ChakraProvider>
      
         <Box pl={isLargerThan980 ? '25%' : 5} pr={ isLargerThan980 ? '25%' : 5}> 
              <Text fontSize='4xl' fontWeight={600}  mb={2} textAlign={'center'}>Forgot Password</Text>	

             { fields.map((row, index) => (<InputCustom key={index} data={row}/> ))}
      
             <Button margin={2} onClick={() => handleResetPassword()} colorScheme='teal' mt={2} display={'inline-block'} width={'auto'} bg={'#FFD050'} variant='solid'>
						Send
			 </Button>
         </Box>
</ChakraProvider>
</Box></>)
}


export default InputComponent