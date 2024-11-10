

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, Text, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import Head from 'next/head'
import axios from "axios";
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";

const SaveTemplate =  ({modalTemplate, closeModal, html, user, refresh, back}) => {
   const [ title, setTitle] = useState()
   const [ description, setDescription] = useState()
   const [file, setFile ] = useState()
   const [fileName, setFileName ] = useState()

   const handleSaveTemplate = async () => {
            let checking = user.ids ? user.ids : user._id
	        console.log(html)

            const upload = await axios.post('/api/s3/upload', {filename: fileName, base64: file})
			const res = await axios.post('/api/template/create', { id: checking, data: html , title: title, fileName: fileName, description: description})
			refresh()
            back(false)
            closeModal()
   }

   const handleChange = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${file.name}`)
        const base64 = new Promise((resolve, reject) => {
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
      <Modal isOpen={modalTemplate} onClose={(e) => closeModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Template</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
            <Text fontSize={11} mb={2}>Featured Image:</Text>
             <FileUploader handleChange={(e) => handleChange(e)} name="file" types={fileTypes} />
              <Text fontSize={11} mt={2} mb={2}>Featured Decription:</Text>
              <Textarea  onChange={(e) => setDescription(e.target.value)} />
               <Text fontSize={11} mt={2} mb={2}>Title:</Text>
	        <Input mt={2} onChange={(e) => setTitle(e.target.value)} />
          </ModalBody>

          <ModalFooter>
			 <Button colorScheme='blue' mr={3} onClick={(e) => handleSaveTemplate()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={(e) => closeModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SaveTemplate