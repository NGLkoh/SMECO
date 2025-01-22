

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, useDisclosure, Flex, useToast, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Input  } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertFromHTML } from 'draft-js'
import axios from "axios";
import moment from 'moment' 

const TemplateCategory = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const [ title, setTitle] = useState("")
   const [ add, setAdd ] = useState(false)
   const [ edit, setEdit] = useState(false)
   const [ updateState, setUpdateState] = useState()
   const [templateState, setTemplateState] = useState()
	useEffect(() => {
      getTemplate()
	}, [])

   const handleTemplateSave = async () => {
     let checking = user.ids ? user.ids : user._id
       await axios.post('/api/category/create', {
			"id": checking,
			"title": title
		})

        toast({
          title: 'Category Created Succces',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
        setAdd(false)
		getTemplate()
   }
   const getTemplate = async () => {
	try {
		let checking = user.ids ? user.ids : user._id
		const res = await axios.post('/api/category/search', {id: checking})
	   setTemplateState(res.data.result)
		console.log(res)
	} catch (e) { }
    }
  
  const handleEdit = async (data) => {
      setAdd(true)
      setEdit(true)
      setUpdateState(data)
    }

    const handleAdd = async () => {
      setAdd(true)
      setEdit(false)
	}
   const handleDelete = async(data) => {
		try { 
		await axios.post('/api/category/remove', {
						"id": data._id ,
			})
			toast({
					title: 'Category Deleted Succces',
					status: 'success',
					position: 'top-right',
					duration: 9000,
					isClosable: true,
					})
       getTemplate()
		}  catch (e) { 
           	toast({
			title: 'Category Not Succces',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})
		}
         
   }

	const handleTemplateUpdate = async() => {
	try {
		   await axios.post('/api/category/update', {
				"id": updateState._id,
				"title": updateState.title
			})
	
			toast({
			title: 'Category Updated Succces',
			status: 'success',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})
			getTemplate()
            setAdd(false)
            setEdit(false)
		} catch (e) { 
           	toast({
			title: 'Category Not Succces',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})
		}
	}

  const onChangeTitle = (event) => { 
     setUpdateState({...updateState, title: event.target.value})
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
            <Box fontSize={'xl'} fontWeight={'600'}>{edit ? "Update Category" : "Categories" } </Box>
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
			 onClick={() => handleAdd()}>
              Add
            </Button></> }
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='striped'>
    <Thead>
      <Tr  background='#232536' color={'white'}>
        <Th  color={'white'}>Title</Th>
        <Th  color={'white'}>Date Created</Th>
        <Th  color={'white'} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>

	{ templateState ? templateState.map((e) => (<Tr key={e._id}>
		<Td >{e.title}</Td>
		<Td >{moment(e.date).calendar()}</Td>
		<Td position={'relative'}><Box display={'inline'}>
			<Button
			bg={'black'} variant='solid'
			color={'#ffffff'}
			size={'md'}
			mr={4}
            onClick={() => handleEdit(e)}
         >
			Update
			</Button>
			</Box><Box display={'inline'}>	
			<Button
			bg={'black'} variant='solid'
			color={'#ffffff'}
			size={'md'}
			mr={4}
            onClick={() => handleDelete(e)}
            >
			Delete
			</Button>
		</Box></Td>

	</Tr>)) : ""
    }
      
    </Tbody>
   
  </Table>

</TableContainer>) : (
  <>  
   {edit ?  <> <Input placeholder='Please type your Title ' mb={2} defaultValue={updateState.title} onChange={(e) => onChangeTitle(e)}/>
		<Button
              bg={'#FFD050'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={() => handleTemplateUpdate()}>
              Update Category
        </Button></> : <Box position={'relative'}  height={'auto'} padding={2}>
		<Input placeholder='Please type your Title ' mb={2}  onChange={(e) => setTitle(e.target.value)}/>
		<Button
              bg={'#FFD050'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={() => handleTemplateSave()}>
              Save Category
        </Button>
   </Box>}

  </>)
}
 
</ChakraProvider>) 
}

export default TemplateCategory