import React, { useState, useEffect } from 'react'
import {
  TableContainer, Table, Select, useDisclosure, Flex, ListItem, List, useToast,
  AccordionIcon, AccordionPanel, Thead, IconButton, HStack, Box, Tr, Th, Button, 
  ChakraProvider, Tbody, Td, Text, Input
} from '@chakra-ui/react'
import Head from 'next/head'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";
import { FaPen, FaTrash, FaText, FaImage, HiBarsArrowDown, FaCode, FaEye } from 'react-icons/fa';
const fileTypes = ["JPG", "PNG", "GIF"];
import { GoRows } from "react-icons/go";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
import SaveTemplate from '../modal/saveTemplate'
import axios from "axios";
import moment from 'moment'
import HtmlModalTemplate from '../modal/htmlCode'
import ImageInsertTemplate from '../modal/ImageTemplate'
import { Editor } from '@tinymce/tinymce-react';

const Template = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [category, setCategoryState] = useState([])
  const [imagesUpload, setUploadedImagesData] = useState()
  const [modalTemplate, setModalTemplate] = useState(false)
  const [modalHtmlTemplate, setModalHtmlTemplate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [html, setRawHtml] = useState('')
  const [templateId, setTemplateId] = useState('')
  const [editorState, setEditorState] = useState('<p>My initial content.</p>')

  const [templateState, setTemplateState] = useState()

  useEffect(() => {
    getTemplate()
    getCategory()
  }, [])

  const [image, setImage ] = useState([]) 
  const toast = useToast()

   const handleInset = () => {
        //  let data = <img src="https://www.yttags.com/blog/wp-content/uploads/2023/02/image-urls-for-testing.webp" alt="" style="height: auto;width: auto"/>
        let imageString = ''
        image.map(row => {
        imageString += `<img src="https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row}"  alt="test" style="height: 100%;width: 100%"/>`
                
       })
        console.log(html)
        let res =  imageString.concat(html);
        console.log(res)
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(
        convertFromHTML(res)
      )))

      setImage([])
     setImageModal(false)
        console.log(res, "insert")
       console.log(image, "insert")
   }

  const handleTemplateSave = () => {
    setModalTemplate(true)
  }

  const getCategory = async () => {
    try {
      let checking = user.ids ? user.ids : user._id
      const res = await axios.post('/api/category/search', { id: checking })
      setCategoryState(res.data.result)
      console.log(res)
    } catch (e) { }
  }

  const getTemplate = async () => {
    let checking = user.ids ? user.ids : user._id
    const res = await axios.post('/api/template/search', { id: checking })
    setTemplateState(res.data.result)
    console.log(res)
  }

  const onEditorStateChange = (e) => {
   console.log(e.target.getContent())
    setRawHtml(e.target.getContent());
    setEditorState(e.target.getContent())
  }

  const openHtmlModal = () => { setModalHtmlTemplate(true) }
  const closeModalHtml = () => { setModalHtmlTemplate(false) }
  const closeModal = () => { setModalTemplate(false) }

  const handleSaveHtml = () => {
    console.log(html)
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(
      convertFromHTML(html)
    )))
  }

  const handleView = (data) => {
    window.open(`http://localhost:3000/blog-client/${data._id}`);
  }

  const handleChangeCategory = async (value, id) => {
    console.log(value, id)
    const res = await axios.post('/api/template/update-template-category', { category_id: value, id: id })
    console.log(res)
  }

  const closeModalImage = () => {
    setImageModal(false)
  }

  const openImageModal = () => {
    setImageModal(true)
  }

  const [add, setAdd] = useState(false)


  // Handle delete with toast confirmation
  const handleDelete = (postId) => {
    toast({
      title: "Are you sure?",
      description: "Do you really want to delete this post?",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: 'top',
      render: () => (
        <Box color="white" p={3} bg="red.500" borderRadius="md">
          <Button onClick={() => confirmDelete(postId)} colorScheme="red">Yes, Delete</Button>
          <Button ml={3} onClick={() => toast.closeAll()}>Cancel</Button>
        </Box>
      ),
    });
  };

  // Confirm delete action
  const confirmDelete = (postId) => {
    // Logic to delete the post, likely an API request or state update
    console.log('Deleting post with ID:', postId);
    setTemplateState(templateState.filter(post => post._id !== postId)); // Remove post from state
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle edit action (e.g., navigate to the editor)
  const handleEdit = (data) => {
    // Navigate to the editor or open a modal with the existing post data
    console.log('Editing post with ID:', data); 
    setEdit(true)
    setTemplateId(data._id)
    setEditorState(data.data)
    // Example: Navigate to an editor page with the post ID
    // history.push(`/editor/${postId}`);
  };

  const handleSaveEdit = async ()  => {
  try{
     const res = await axios.post('/api/template/update-template-data', { id: templateId,  data: editorState })
		toast({
		title: "Post Deleted",
		description: "Successfully edited",
		status: "success",
		duration: 2000,
		isClosable: true,
		});
        setEdit(false)
        getTemplate()
        getCategory()
  }catch(e) {
        toast({
		title: "Warning error system",
		description: "Warning",
		status: "warning",
		duration: 2000,
		isClosable: true,
		});
  }
 
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
          <Box fontSize={'xl'} fontWeight={'600'}>Blog Articles</Box>
        </HStack>
        <Flex alignItems={'center'}>
          { edit ? <> <Button
                bg={'#232536'} variant='solid'
                color={'#ffffff'}
                size={'md'}
                mr={4}
                onClick={(e) => setEdit(false)}>
                Back
              </Button>
              <Button
              bg={'#232536'} variant='solid'
              color={'#ffffff'}
              size={'md'}
              mr={4}
	          onClick={(e) => handleSaveEdit()}
              >
              Save Edit
            </Button> 
            </> : add ? (
            <>
              <Button
                bg={'#232536'} variant='solid'
                color={'#ffffff'}
                size={'md'}
                mr={4}
                onClick={(e) => setAdd(false)}>
                Back
              </Button>
              <Button
                bg={'#FFD050'} variant='solid'
                color={'#ffffff'}
                size={'md'}
                mr={4}
                onClick={(e) => handleTemplateSave(e)}>
                Publish Post
              </Button>
            </>
          ) : (
            <Button
              bg={'#232536'} variant='solid'
              color={'#ffffff'}
              size={'md'}
              mr={4}
              onClick={(e) => setAdd(true)}>
              Add
            </Button>
          )}
        </Flex>
      </Flex>

      {edit ?  <Box position={'relative'} border={'2px solid #000000'} height={'auto'} padding={2}>
		<Editor
			apiKey='o5zjdgzwmjb9rdi6r4md7rq26kq13c55p55vrwubsaz8k75a'
			initialValue={editorState}
			init={{
				plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
				toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
			}}
			onChange={(e) => onEditorStateChange(e)}
			/>
        
        </Box> : add === false ? (
        <TableContainer>
          <Table variant='striped' colorScheme='$F7FAFC'>
            <Thead>
              <Tr background='#232536' color={'white'}>
                <Th color={'white'}>Title</Th>
                <Th color={'white'}>Category</Th>
                <Th color={'white'}>Date Created</Th>
                <Th color={'white'}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {templateState ? templateState.map((e) => (
                <Tr key={e._id}>
                  <Td>{e.title}</Td>
                  <Td>
                    <Select placeholder='Select option' value={e.category_id} onChange={(r) => handleChangeCategory(r.target.value, e._id)}>
                      {category.map((e) => <option key={e._id} value={e._id}>{e.title}</option>)}
                    </Select>
                  </Td>
                  <Td>{moment(e.date).calendar()}</Td>
                  <Td position={'relative'}>
                    <Box display={'inline'}>
                <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} mr={4} onClick={() => handleEdit(e)}>
                  <FaPen />
                </Button>
				</Box>
              <Box display={'inline'}>
                <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} mr={4} onClick={() => handleDelete(e._id)}>
                  <FaTrash />
                </Button>
                <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} onClick={() => handleView(e)} mr={4}>
                  <FaEye />
                </Button>
              </Box>
                  </Td>
                </Tr>
              )) : ""}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box position={'relative'} border={'2px solid #000000'} height={'auto'} padding={2}>
		<Editor
			apiKey='o5zjdgzwmjb9rdi6r4md7rq26kq13c55p55vrwubsaz8k75a'
			initialValue={editorState}
			init={{
				plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
				toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
			}}
			onChange={(e) => onEditorStateChange(e)}
			/>
        
        </Box>
      )}

      <HtmlModalTemplate modalHtmlTemplate={modalHtmlTemplate} setRawHtml={setRawHtml} html={html} handleSaveHtml={handleSaveHtml} closeModalHtml={closeModalHtml} />
      <SaveTemplate closeModal={closeModal} refresh={getTemplate} back={setAdd} html={html} user={user} modalTemplate={modalTemplate} />
    </ChakraProvider>
  )
}

export default Template;
