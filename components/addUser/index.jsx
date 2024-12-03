

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, Select,ModalOverlay, ModalContent,ModalHeader, ModalBody, ModalFooter, Lorem, ModalCloseButton, useDisclosure, Flex, useToast, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Text, Input  } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, ContentState, convertFromHTML } from 'draft-js'
import axios from "axios";
import moment from 'moment' 
import AddSubUserIndex from './add'
import { FaPen, FaTrash, FaTexT, FaImage, HiBarsArrowDown, FaCode, FaEye  } from 'react-icons/fa'; 
import ModalImage from '../modal/viewModalImage'

const AddSubUserAdmin = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const [ title, setTitle] = useState("")
   const [ source, setSource] = useState('')
   const [ open, setOpen] = useState(false)
   const [ add, setAdd ] = useState(false)
   const [ editorState, setEditorState] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>My initial content.</p>')
        )
      ))
  
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
	} catch (e) { }
    }
	
	const handleDelete = async (data) => {
		const res = await axios.post('/api/users/remove', {id: data})
		
          toast({
          title: 'Successfully Delete',
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
          title: `Successfully Update Status` + name,
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
            <Box fontSize={'xl'} fontWeight={'600'}>Create User</Box>
          </HStack>
          <Flex alignItems={'center'}>
			{add  ? <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => setAdd(false)}>
              Back
            </Button> </> : <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => setAdd(true)}>
              Add
            </Button></> }
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='striped' colorScheme='$F7FAFC'>
    <Thead>
      <Tr  background='#232536' color={'white'}>
        <Th  color={'white'}>Name</Th>
		<Th  color={'white'}>Email</Th>
        <Th  color={'white'}>Business Permit</Th>
        <Th  color={'white'}>Barangay Clearance</Th>
        <Th  color={'white'}>User Type</Th>
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
	          onClick={ (row)  => handleOpenModal('Business Permit', e.businessPermit)}
              mr={4}>
               <FaEye/>
            </Button></Td>
		<Td ><Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
	          onClick={ (row)  => handleOpenModal('Barangay Clerance', e.barangayClearance)}
              mr={4}>
               <FaEye/>
            </Button></Td>
		<Td >{e.userType}</Td>

	    <Td > <Select placeholder='Select option'  onChange={(r) => handleConfirmUser(e._id, r.target.value, `${e.firstName} ${e.lastName}`)} value={e.active} width={'150px'}>
				<option value={false}> unverify</option> 
				<option value={true}> verified</option> 
			</Select></Td>

		<Td position={'relative'}><Box display={'inline'}>
			</Box><Box display={'inline'}>	
			<Button
			bg={'black'} variant='solid'
			onClick={(event) => handleDelete(e._id)}
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