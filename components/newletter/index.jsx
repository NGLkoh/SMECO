

import React, { useState , useEffect} from 'react'
import {
  TableContainer, Table, Select, Input, Flex, useToast,
   Thead, IconButton, HStack, Box, Tr, Th, Button, 
  ChakraProvider, Tbody, Td
} from '@chakra-ui/react'
import { defaultNewLetter } from '../../resources/html/newsletter'
import { Editor } from '@tinymce/tinymce-react';
import ModalSubscribe from '../modal/viewListOfSubscribe'
import axios from 'axios';

const NewsLetter = ({user}) => {

  const [modalSubscribe, setModalSubscribe] = useState(false)
  const [editorState, setEditorState] = useState(defaultNewLetter)
  const [subject, setSubject] = useState('')
  const [subscribes , setSubscribe] = useState()
  const toast = useToast()

  useEffect(() => {
    // Any initial setup can be done here
   fetchSubscribe()
  }, []);
  const fetchSubscribe = async () => {
      let res = await axios.post('/api/subscribe/all');
      setSubscribe(res.data.result)
  }
  const onCloseModal = () => {
     setModalSubscribe(false)
  }
  const onEditorStateChange = (e) => {
   console.log(e.target.getContent())	
    setEditorState(e.target.getContent())
  }

  const handleSendNewsletter = async () => {
    if(subscribes.length > 0){
      subscribes.map(async(row) => {
          const res = await axios.post('/api/subscribe/sendMail', { subject: subject, html: editorState, email : row.email })
      } )

    toast({
      title: "Newsletter done sending!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    } else {
      toast({
      title: "No Subscribes",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
     }
  }


   return (
	<ChakraProvider>
   <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box fontSize={'xl'} fontWeight={'600'}>Newsletter</Box>
             <Input placeholder="Enter Subject" ml={2} onChange={(e) => setSubject(e.target.value)} width={'250px'}/>
        </HStack>
        
        <Flex alignItems={'center'}>
          
            <Button
              bg={'#232536'} variant='solid'
              color={'#ffffff'}
              size={'md'}
              mr={4}
              p={2}
              onClick={() => setModalSubscribe(true)}
              >
              List of Subscribers
            </Button>
        
        </Flex>
      </Flex>
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

        
          <Button
              bg={'#f8b00b'} variant='solid'
              color={'#ffffff'}
              size={'md'}
              mr={4}
              mt={2}
              onClick={() => handleSendNewsletter()}
              >
              Send Newsletter 
            </Button>
        <ModalSubscribe title={"Subscribers"} subscribes={subscribes} open={modalSubscribe} onCloseModal={onCloseModal}/>
    </ChakraProvider>) 
}

export default NewsLetter