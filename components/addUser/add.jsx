

'use client'

import React, {useState} from 'react'
import {Box,  Button, useToast } from '@chakra-ui/react'
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
			title: 'Enter Business your Email',
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
		 const res = await axios.post('/api/users/create', {ids: user, username: email, password: password, email: email, firstName: firstName, lastName: lastName  })
		if(res.data.message === 'true') {
          toast({
          title: 'Successfully Email Sent',
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
					onClick={() => handleVerify()}
					_hover={{
					bg: '#232536',
					}}>
					Create
				</Button>
         </Box> 
	
  </>)
}

export default AddSubUserIndex