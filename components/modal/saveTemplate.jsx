

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,Input,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import Head from 'next/head'
import axios from "axios";

const SaveTemplate = ({modalTemplate, closeModal, html, user}) => {
   const [ title, setTitle] = useState()
   const handleSaveTemplate = async () => {
let checking = user.ids ? user.ids : user._id
	        console.log(user)
			const res = await axios.post('/api/template/create', { id: checking, data: html , title: title})
			closeModal()
   }
  return (
    <>
      <Modal isOpen={modalTemplate} onClose={(e) => closeModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
	        <Input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
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