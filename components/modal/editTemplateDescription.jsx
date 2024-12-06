

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, Text, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import axios from "axios";
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";

const EditTemplate =  ({modalEditTemplate, closeEditModal, refresh, editState}) => {
   const [ title, setTitle] = useState()
   const [ description, setDescription] = useState()
   const [file, setFile ] = useState()
   const [fileName, setFileName ] = useState()

   const handleEditTemplate = async () => {
	        fileName ? await axios.post('/api/s3/upload', {filename: fileName, base64: file}) : ""

            let editorState = {
               title: title ? title : editState.title,
               fileName: fileName? fileName : editState.fileName,
               description: description ? description : editState.description
            }
            	// await axios.post('/api/template/create', { id: checking, data: html , title: title, fileName: fileName, description: description})
		    await axios.post('/api/template/update-template-data', { id: editState._id,  data: editorState, type : 2 })
            refresh()
            closeEditModal()
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
      <Modal isOpen={modalEditTemplate} onClose={() => closeEditModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Description Post</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
            <Text fontSize={11} mb={2}>Featured Image:</Text>
             <FileUploader handleChange={(e) => handleChange(e)} name="file" types={fileTypes} />
               <Text fontSize={11} mt={2} mb={2}>Title:</Text>
	           <Input defaultValue={editState.title} mt={2} onChange={(e) => setTitle(e.target.value)} />
               <Text fontSize={11} mt={2} mb={2}>Featured Decription:</Text>
               <Textarea defaultValue={editState.description} onChange={(e) => setDescription(e.target.value)} />

          </ModalBody>

          <ModalFooter>
			 <Button colorScheme='blue' mr={3} onClick={() => handleEditTemplate()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeEditModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTemplate