

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, useDisclosure, Flex, useToast, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Text, Input  } from '@chakra-ui/react'
import Head from 'next/head'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";
import { FaTrash, faCode, FaTexT, FaImage, HiBarsArrowDown  } from 'react-icons/fa'; 
const fileTypes = ["JPG", "PNG", "GIF"];
import { GoRows } from "react-icons/go";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
 import dynamic from 'next/dynamic';
import {EditorState, ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
import SaveTemplate from '../modal/saveTemplate'
import axios from "axios";
import moment from 'moment' 

const Editor = dynamic(
	async () => {
	const mod = await import('react-draft-wysiwyg');
	return { default: mod.Editor };
	},
	{ ssr: false }
);

const TemplateCategory = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const [ title, setTitle] = useState("")
   const [ add, setAdd ] = useState(false)
   const [ html, setRawHtml] = useState('')
   const [ editorState, setEditorState] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p className="gago ka">My initial content.</p>')
        )
      ))
  
    const [templateState, setTemplateState] = useState()

	useEffect(() => {
      getTemplate()
	}, [])

   const handleTemplateSave = async () => {
let checking = user.ids ? user.ids : user._id
       const res = await axios.post('/api/category/create', {
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
            <Box fontSize={'xl'} fontWeight={'600'}>Create Category</Box>
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
			mr={4}>
			Update
			</Button>
			</Box><Box display={'inline'}>	
			<Button
			bg={'black'} variant='solid'
			color={'#ffffff'}
			size={'md'}
			mr={4}>
			Delete
			</Button>
		</Box></Td>
	</Tr>)) : ""
    }
      
    </Tbody>
   
  </Table>
</TableContainer>) : (
  <>  
	<Box position={'relative'}  height={'auto'} padding={2}>
		<Input placeholder='Please type your Title ' mb={2} onChange={(e) => setTitle(e.target.value)}/>
		<Button
              bg={'#FFD050'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => handleTemplateSave()}>
              Save Category
        </Button>
   </Box>
  </>)
}
 
</ChakraProvider>) 
}

export default TemplateCategory