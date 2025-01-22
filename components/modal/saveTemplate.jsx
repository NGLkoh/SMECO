

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, useToast,Text, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import axios from "axios";
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";

const SaveTemplate =  ({modalTemplate, closeModal, html, user, refresh, back}) => {
   const [ title, setTitle] = useState()
   const [ description, setDescription] = useState()
   const [file, setFile ] = useState()
   const [fileName, setFileName ] = useState()
       const [disBtn, setDisBtn ] = useState(false)
   const toast = useToast();
   const handleSaveTemplate = async () => {
         setDisBtn(true)
        const [disBtn, setDisBtn ] = useState(false)
         if(title && description && fileName) {
            try {
            let checking = user.ids ? user.ids : user._id
	        await axios.post('/api/s3/upload', {filename: fileName, base64: file})
			const blog = await axios.post('/api/template/create', { id: checking, data: html , title: title, fileName: fileName, description: description})
            console.log(blog)
            await axios.post('/api/search/create', { title: title, details: description , link: `/blog-client/${blog.data.result._id}`	})
			refresh()
            back(false)
            closeModal()

           toast({
 						title: `Successfully updated`,
  						status: 'success',
  						position: 'top-right',
  						duration: 9000,
  						isClosable: true,
  					})
          setDisBtn(false)
          }catch(e) {console.log(e)}
           
            } else {
               
 				toast({
 						title: `fill up all missing field`,
  						status: 'warning',
  						position: 'top-right',
  						duration: 9000,
  						isClosable: true,
  					})
                 setDisBtn(false)
          }
            
   }

   const handleChange = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${file.name}`)
            new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	}

  return (
    <>
      <Modal isOpen={modalTemplate} onClose={() => closeModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish Post</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
            <Text fontSize={11} mb={2}>Featured Image:</Text>
             <FileUploader handleChange={(e) => handleChange(e)} name="file" types={fileTypes} />
               <Text fontSize={11} mt={2} mb={2}>Title:</Text>
	        <Input mt={2} onChange={(e) => setTitle(e.target.value)} />
              <Text fontSize={11} mt={2} mb={2}>Featured Decription:</Text>
              <Textarea  onChange={(e) => setDescription(e.target.value)} />

          </ModalBody>

          <ModalFooter>
			 <Button  mr={3} isDisabled={disBtn} onClick={() => handleSaveTemplate()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SaveTemplate