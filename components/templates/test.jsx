

import React, { useState , useEffect} from 'react'
import {TableContainer , Table, Select, useDisclosure, Flex, ListItem, List,ListIcon  , AccordionIcon , AccordionPanel, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Text, Input  } from '@chakra-ui/react'
import Head from 'next/head'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";
import { FaPen, FaTrash, FaTexT, FaImage, HiBarsArrowDown, FaCode, FaEye  } from 'react-icons/fa'; 
const fileTypes = ["JPG", "PNG", "GIF"];
import { GoRows } from "react-icons/go";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
 import dynamic from 'next/dynamic';
import {EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
import SaveTemplate from '../modal/saveTemplate'
import axios from "axios";
import moment from 'moment' 
import HtmlModalTemplate from '../modal/htmlCode'
const Editor = dynamic(
	async () => {
	const mod = await import('react-draft-wysiwyg');
	return { default: mod.Editor };
	},
	{ ssr: false }
);

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

const Template = ({user}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [ category, setCategoryState] = useState([])
   const [ imagesUpload, setUploadedImagesData] = useState()
   const [ modalTemplate, setModalTemplate] = useState(false)
   const [ modalHtmlTemplate, setModalHtmlTemplate] = useState(false)
   const [ open, setOpen] = useState(false)
   const [ html, setRawHtml] = useState('')
   const [ editorState, setEditorState] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>My initial content.</p>')
        )
      ))
  
    const [templateState, setTemplateState] = useState()

	useEffect(() => {
      getTemplate()
	  getCategory()
	}, [])

   const handleTemplateSave = () => {
    setModalTemplate(true)
   }

   const getCategory = async () => {
	try {
		let checking = user.ids ? user.ids : user._id
		const res = await axios.post('/api/category/search', {id: checking})
	   setCategoryState(res.data.result)
		console.log(res)
	} catch (e) { }
    }
   const getTemplate = async () => {
   let checking = user.ids ? user.ids : user._id
       const res = await axios.post('/api/template/search', {id: checking})
	   setTemplateState(res.data.result)
		console.log(res)
   }

   const onEditorStateChange = (editorState) => {
		// let html = convertToHTML(editorState.getCurrentContent());
		let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		console.log(html)
		setRawHtml(html);
		setEditorState(editorState)

   }
   const openHtmlModal = () =>{setModalHtmlTemplate(true)}
   const closeModalHtml = () =>{setModalHtmlTemplate(false)}
   const closeModal = () =>{setModalTemplate(false)}
   const handleSaveHtml = () => {
		console.log(html)

		setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(
          convertFromHTML(html)
        )))
   }
   const uploadImageCallBack = (file) =>{
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.
    
   // Make sure you have a uploadImages: [] as your default state
	let uploadedImages = []
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject);

    setUploadedImagesData(uploadedImages)
     
    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  }
  const handleView = (data) => {
         window.open(`http://localhost:3000/blog-client/${data._id}`);
  }

  const handleChangeCategory = async (value, id) => {
          console.log(value, id)
          const res = await axios.post('/api/template/update-template-category', {category_id: value,id: id })
          console.log(res)
  }

  const [ add, setAdd ] = useState(false)

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
            <Box fontSize={'xl'} fontWeight={'600'}>Create Template</Box>
          </HStack>
          <Flex alignItems={'center'}>
			{add  ? <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => setAdd(false)}>
              Back
            </Button> <Button
              bg={'#FFD050'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => handleTemplateSave()}>
              Save Template
            </Button></> : <><Button
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
        <Th  color={'white'}>Category</Th>
        <Th  color={'white'}>Date Created</Th>
        <Th  color={'white'} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>

	{ templateState ? templateState.map((e) => (<Tr key={e._id}>
			<Td >{e.title}</Td>
			<Td > <Select placeholder='Select option' value={e.category_id} onChange={(r) => handleChangeCategory(r.target.value, e._id)}>
            {
              category.map((e) => <option key={e._id} value={e._id}> {e.title}</option> )
            }
			</Select></Td>
            <Td >{moment(e.date).calendar()}</Td>
			<Td position={'relative'}><Box display={'inline'}>
			<Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}>
              <FaPen/>
            </Button>
            </Box><Box display={'inline'}>	
			<Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}>
                   <FaTrash/>
            </Button>
			<Button
              bg={'black'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
	          onClick={ (row)  =>handleView(e)}
              mr={4}>
               <FaEye/>
            </Button>
         </Box></Td>
		</Tr>)) : ""
    }
      
    </Tbody>
  </Table>
</TableContainer>) : (
  <>  
	<Box position={'relative'} border={'2px solid #000000'} height={'auto'} padding={2}>
	<Button
        leftIcon={<FaCode />} 
        mb={2}
	    onClick={(e) => openHtmlModal()}
		bg={'gray'} variant='solid'
		color={'#ffffff'}
		size={'md'}
		mr={4}>
		Html Code
	</Button>

	 <Editor
        editorState={editorState}
		editorStyle={{
		 padding: 10
        }}
        customStyleMap={styleMap}
	    toolbar={{
        image: {
			uploadCallback: uploadImageCallBack,
			previewImage: true,
			alt: { present: true, mandatory: false },
			inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
		}}}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(e) => onEditorStateChange(e)}
      />
   </Box>
  </>)
}
<HtmlModalTemplate modalHtmlTemplate={modalHtmlTemplate} setRawHtml={setRawHtml} html={html} handleSaveHtml={handleSaveHtml} closeModalHtml={closeModalHtml}/>
<SaveTemplate closeModal={closeModal} html={html} user={user} modalTemplate={modalTemplate}/>
</ChakraProvider>) 
}

export default Template