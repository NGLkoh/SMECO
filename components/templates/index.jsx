import React, { useState, useEffect } from 'react'
import {
  TableContainer, Table, Select, useDisclosure, Flex, useToast,
   Thead, IconButton, HStack, Box, Tr, Th, Button, 
  ChakraProvider, Tbody, Td, Text, Grid,GridItem
} from '@chakra-ui/react'
import { FileUploader } from "react-drag-drop-files";
import { Editor } from '@tinymce/tinymce-react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaPen, FaTrash, FaEye, FaDotCircle, FaImage , FaHamburger, FaDonate, FaEllipsisH } from 'react-icons/fa';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import SaveTemplate from '../modal/saveTemplate'
import axios from "axios";
import moment from 'moment'
import HtmlModalTemplate from '../modal/htmlCode'
import EditTemplate from '../modal/editTemplateDescription'
import ImageInsertTemplate from '../modal/ImageTemplate'
const fileTypes = ["JPG", "PNG", "GIF"];
const Template = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [category, setCategoryState] = useState([])
  const [modalTemplate, setModalTemplate] = useState(false)
  const [modalHtmlTemplate, setModalHtmlTemplate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [html, setRawHtml] = useState('')
  const [modalEditTemplate, setModalEditTemplate] = useState(false)
  const [templateId, setTemplateId] = useState('')
  const [editorState, setEditorState] = useState('<p>My initial content.</p>')
  const [editState, setEditState] = useState({})
  const [templateState, setTemplateState] = useState()
  const [imageModal, setImageModal] = useState(false)
 
  useEffect(() => {
    getTemplate()
    getCategory()
  }, [])


  const [image, setImage ] = useState([]) 
  const toast = useToast()
  
    const closeModalImage = () => {
    setImageModal(false)
  }

  const openImageModal = () => {
    setImageModal(true)
  }

  
  const handleInset = () => {
        let imageString = ''
        image.map(row => {
        imageString = `<img src="https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row}"  alt="test" style="height: 20%;width: 20%"/>`
        })
        
        const newHtml = imageString + editorState
        setEditorState(newHtml)
        setImage([])
        setImageModal(false)
   }

  const handleEditDescription = (data) => {
   setModalEditTemplate(true)
    setEditState(data)
  }

  const closeEditModal = () => {
    setModalEditTemplate(false)
  }

  const handleTemplateSave = () => {
    setModalTemplate(true)
  }

  const getCategory = async () => {
    try {
      let checking = user.ids ? user.ids : user._id
      const res = await axios.post('/api/category/search', { id: checking })
      setCategoryState([...res.data.result])
      console.log(res.data.result, category)
    } catch (e) { }
  }

  const getTemplate = async () => {
    let checking = user.ids ? user.ids : user._id
    const res = await axios.post('/api/template/search', { id: checking })
    setTemplateState(res.data.result)
    console.log(res)
  }

  const onEditorStateChange = (e) => {
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
    window.open(`/blog-client/${data._id}`);
  }

  const handleChangeCategory = async (value, id) => {
    console.log(value, id)
    const res = await axios.post('/api/template/update-template-category', { category_id: value, id: id })
    console.log(res)
    getTemplate()
   	toast({
		title: "Already Succefully change category",
		description: "Successfully Edited",
		status: "success",
		duration: 2000,
		isClosable: true,
		});
  }

  const [add, setAdd] = useState(false)


  // Handle delete with toast confirmation
  const handleDelete =  async(id) => {
    await axios.post('/api/template/remove', { id: id })
    toast({
      title: "Are you sure?",
      description: "Do you really want to delete this post?",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: 'top',
      render: () => (
        <Box color="white" p={3} bg="red.500" borderRadius="md">
          <Button onClick={() => confirmDelete(id)} >Yes, Delete</Button>
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
         await axios.post('/api/template/update-template-data', { id: templateId,  data: editorState, type: 1 })
		toast({
		title: "Post Edited",
		description: "Successfully Edited",
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
          { edit ?   <Button
				leftIcon={<FaImage />}
				onClick={(e) => openImageModal()}
				bg={'gray'} variant='solid'
				color={'#ffffff'}
				size={'md'}
				mr={4}>
				Insert Image
			</Button>
          : ""}

           { add ?   <Button
				leftIcon={<FaImage />}
				onClick={(e) => openImageModal()}
				bg={'gray'} variant='solid'
				color={'#ffffff'}
				size={'md'}
				mr={4}>
				Insert Image
			</Button>
          : ""}
         </HStack>
        <Flex alignItems={'center'}>
          { edit ? <> <Button
                bg={'#232536'} variant='solid'
                color={'#ffffff'}
                size={'md'}
                mr={4}
                onClick={() => setEdit(false)}>
                Back
              </Button>
              <Button
              bg={'#232536'} variant='solid'
              color={'#ffffff'}
              size={'md'}
              mr={4}
	          onClick={() => handleSaveEdit()}
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
                onClick={() => setAdd(false)}>
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
              onClick={() => { setAdd(true), setEditorState("")}}>
              Add
            </Button>
          )}
        </Flex>
      </Flex>
 {/* toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat',
			     */}
      {edit ?  <Box position={'relative'} border={'2px solid #000000'} height={'auto'} padding={2}>
		<Editor
			apiKey='o5zjdgzwmjb9rdi6r4md7rq26kq13c55p55vrwubsaz8k75a'
			initialValue={editorState}
			init={{
            height: '670px',
			selector: 'textarea#file-picker',
			plugins: 'image code',
			toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat',
			/* enable title field in the Image dialog*/
			image_title: true,
			/* enable automatic uploads of images represented by blob or data URIs*/
			automatic_uploads: true,
			/*
				URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
				images_upload_url: 'postAcceptor.php',
				here we add custom filepicker only to Image dialog
			*/
			file_picker_types: 'image',
			/* and here's our custom image picker*/
			file_picker_callback: function (cb, value, meta) {
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('accept', 'image/*');

				/*
				Note: In modern browsers input[type="file"] is functional without
				even adding it to the DOM, but that might not be the case in some older
				or quirky browsers like IE, so you might want to add it to the DOM
				just in case, and visually hide it. And do not forget do remove it
				once you do not need it anymore.
				*/

				input.onchange = function () {
				var file = this.files[0];

				var reader = new FileReader();
				reader.onload = function () {
					/*
					Note: Now we need to register the blob in TinyMCEs image blob
					registry. In the next release this part hopefully won't be
					necessary, as we are looking to handle it internally.
					*/
					var id = 'blobid' + (new Date()).getTime();
					var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
					var base64 = reader.result.split(',')[1];
					var blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);

					/* call the callback and populate the Title field with the file name */
					cb(blobInfo.blobUri(), { title: file.name });
				};
				reader.readAsDataURL(file);
				};

				input.click();
			},
			content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
			}}
			onChange={(e) => onEditorStateChange(e)}
			/>
        
        </Box> : add === false ? (
        <TableContainer>
          <Table variant='striped'>
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
                <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} mr={4} onClick={() => handleEditDescription(e)}>
                  <FaEllipsisH />
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
            height: '670px',
			selector: 'textarea#file-picker',
			plugins: 'image code',
			toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat ',
			/* enable title field in the Image dialog*/
			image_title: true,
			/* enable automatic uploads of images represented by blob or data URIs*/
			automatic_uploads: true,
			/*
				URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
				images_upload_url: 'postAcceptor.php',
				here we add custom filepicker only to Image dialog
			*/
			file_picker_types: 'image',
			/* and here's our custom image picker*/
			file_picker_callback: function (cb, value, meta) {
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('accept', 'image/*');

				/*
				Note: In modern browsers input[type="file"] is functional without
				even adding it to the DOM, but that might not be the case in some older
				or quirky browsers like IE, so you might want to add it to the DOM
				just in case, and visually hide it. And do not forget do remove it
				once you do not need it anymore.
				*/

				input.onchange = function () {
				var file = this.files[0];

				var reader = new FileReader();
				reader.onload = function () {
					/*
					Note: Now we need to register the blob in TinyMCEs image blob
					registry. In the next release this part hopefully won't be
					necessary, as we are looking to handle it internally.
					*/
					var id = 'blobid' + (new Date()).getTime();
					var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
					var base64 = reader.result.split(',')[1];
					var blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);

					/* call the callback and populate the Title field with the file name */
					cb(blobInfo.blobUri(), { title: file.name });
				};
				reader.readAsDataURL(file);
				};

				input.click();
			},
			content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
			}}
			onChange={(e) => onEditorStateChange(e)}
			/>
        
        </Box>
      )}
      <HtmlModalTemplate modalHtmlTemplate={modalHtmlTemplate} setRawHtml={setRawHtml} html={html} handleSaveHtml={handleSaveHtml} closeModalHtml={closeModalHtml} />
      <SaveTemplate closeModal={closeModal} refresh={getTemplate} back={setAdd} html={html} user={user} modalTemplate={modalTemplate} />
     <EditTemplate editState={editState} refresh={getTemplate} modalEditTemplate={modalEditTemplate} closeEditModal={closeEditModal}/>
      <ImageInsertTemplate imageModal={imageModal} closeModalImage={closeModalImage} user={user} image={image} setImage={setImage} handleInset={handleInset} />
    </ChakraProvider>
  )
}

export default Template;
