

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, Select, useDisclosure, Flex, useToast, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import AddSubUserIndex from './add'
import { FaTrash, FaEye  } from 'react-icons/fa'; 
import ModalImage from '../modal/viewModalImage'
import moment from 'moment';
const AddSubUserAdmin = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const [ title, setTitle] = useState("")
   const [ source, setSource] = useState('')
   const [ open, setOpen] = useState(false)
   const [ add, setAdd ] = useState(false)
   
    const [users, setUsers] = useState([])

	useEffect(() => {
      getUser()
	}, [])

   const onCloseModal = () => {
     setOpen(false)
    }
   const getUser = async () => {
	try {
		const res = await axios.post('/api/users/users')
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

		getUser()
	}
   const handleOpenModal = (title, source) => {
      setOpen(true)
      setTitle(title)
      setSource(source)
   }

   const handleConfirmUser = async (id, value, name) =>  {
    console.log(id, value)
     const res = await axios.post('/api/users/verify-user', {id: id, value: value})
       toast({
          title: `Successfully Update Status for: ` + name,
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
		  })
	 console.log(res)
     getUser()
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
            <Box fontSize={'xl'} fontWeight={'600'}>View Users</Box>
          </HStack>
          <Flex alignItems={'center'}>
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='striped' >
    <Thead>
      <Tr  background='#232536' color={'white'}>
        <Th  color={'white'}>Name</Th>
		<Th  color={'white'}>Email</Th>
        <Th  color={'white'}>Business Permit</Th>
        <Th  color={'white'}>Barangay Clearance</Th>
        <Th  color={'white'}>User Type</Th>
        <Th  color={'white'}>Date Created</Th>
        <Th  color={'white'}>Verify</Th>
        <Th  color={'white'} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>

	{ users ? users.map((e) => (e.userType !== "admin" && <Tr key={e._id}>
		<Td >{e.firstName} {e.lastName}</Td>
		<Td >{e.email}</Td>
        <Td ><Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
	          onClick={ ()  => handleOpenModal('Business Permit', e.businessPermit)}
              mr={4}>
               <FaEye/>
            </Button></Td>
		<Td ><Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
	          onClick={ ()  => handleOpenModal('Barangay Clerance', e.barangayClearance)}
              mr={4}>
               <FaEye/>
            </Button></Td>
		<Td >{e.userType}</Td>
        <Td >{moment(e.dateCreated).calendar()}</Td>
	    <Td > <Select placeholder='Select option'  onChange={(r) => handleConfirmUser(e._id, r.target.value, `${e.firstName} ${e.lastName}`)} value={e.active} width={'150px'}>
				<option value={false}> unverify</option> 
				<option value={true}> verified</option> 
			</Select></Td>

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
 <ModalImage open={open} onCloseModal={onCloseModal} source={source} title={title}/>
</ChakraProvider>) 
}

export default AddSubUserAdmin