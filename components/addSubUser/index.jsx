

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, useDisclosure, Flex, useToast, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td  } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import moment from 'moment' 
import AddSubUserIndex from './add'
import { FaTrash } from 'react-icons/fa'; 

const AddSubUser = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const [ add, setAdd ] = useState(false)
    const [users, setUsers] = useState([])

	useEffect(() => {
      getTemplate()
	}, [])

 
   const getTemplate = async () => {
	try {
      
		const res = await axios.post('/api/users/subUser', {ids: user._id})
	   setUsers(res.data.result)
		console.log(res)
	} catch (e) { console.log(e) }
    }
	
	const handleDelete = async (data) => {
	      await axios.post('/api/users/remove', {id: data})
		
          toast({
          title: 'Successfully Deleted ',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
		  })

		getTemplate()
	}

   return (
	<ChakraProvider>
   <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize={'xl'} fontWeight={'600'}>View Accounts</Box>
          </HStack>
          <Flex alignItems={'center'}>
			{add  ? <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={() => setAdd(false)}>
              Back
            </Button> </> : <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={() => setAdd(true)}>
              Add
            </Button></> }
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='striped'>
    <Thead>
      <Tr  background='#232536' color={'white'}>
        <Th  color={'white'}>Name</Th>
		<Th  color={'white'}>Email</Th>
		<Th  color={'white'}>date</Th>
        <Th  color={'white'}>User Type</Th>
        <Th  color={'white'} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>

	{ users ? users.map((e) => (<Tr key={e._id}>
		<Td >{e.firstName} {e.lastName}</Td>
		<Td >{e.email}</Td>
		<Td >{moment(e.date).calendar()}</Td>
	    <Td >{e.userType}</Td>
		<Td position={'relative'}><Box display={'inline'}>
			</Box><Box display={'inline'}>	
			<Button
			bg={'black'} variant='solid'
			onClick={() => handleDelete(e._id)}
			color={'#ffffff'}
			size={'md'}
			mr={4}>
			<FaTrash/>
			</Button>
		</Box></Td>
	</Tr>)) : ""
    }
      
    </Tbody>
   
  </Table>
</TableContainer>) : (
  <>  
	<Box position={'relative'}  height={'auto'} >
			<AddSubUserIndex user={user} getTemplate={getTemplate} setAdd={setAdd}/>
   </Box>
  </>)
}
 
</ChakraProvider>) 
}

export default AddSubUser