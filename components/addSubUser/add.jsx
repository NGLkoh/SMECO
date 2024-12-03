

'use client'

import Head from 'next/head'

import React, {useState} from 'react'
import {Box, Text, ChakraProvider, PinInputField, Image,useColorModeValue, PinInput, Flex, Center, Heading  , Button, Stack, FormControl  , useToast, HStack  } from '@chakra-ui/react'
import axios from 'axios'
import InputCustom from '../../components/inputs/index'


const AddSubUserIndex = ({user, getTemplate, setAdd}) => {
   const toast = useToast()
	const [firstName, setFirstname] = useState(String)
	const [lastName, setlastName] = useState(String)
	const [email,setEmail] = useState(String)
 	const [password, setPassword] = useState(String)

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

 const handleVerify = async () => {
		 const res = await axios.post('/api/users/add-subUser', 
		{   
            ids: user,
            username: email,
            password: password,
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
			code: 1234, 
            businessPermit: user.businessPermit, 
            barangayClearance: user.barangayClearance  })

	if(res.data.message === 'true') {
          toast({
          title: 'Successfully Email Send',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
			setAdd(false)
			getTemplate()
         } else {
	       toast({
          title: 'Error server',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
		}
 }

   return ( <>
	  <Box >      
				{ fields.map(row => (<InputCustom data={row} key={row.title}/> ))}
				<Button
					bg={'#FFD050'} 
					w={'100%'}
					color={'white'}
					onClick={(e) => handleVerify(e)}
					_hover={{
					bg: '#232536',
					}}>
					Create
				</Button>
         </Box> 
	
  </>)
}

export default AddSubUserIndex