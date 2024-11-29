

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, ModalContent,Textarea, ModalHeader, ModalCloseButton,Input,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import Head from 'next/head'
import axios from "axios";
import AddNewImageSection from '../addImageModal/index'
const ImageInsertTemplate = ({imageModal, closeModalImage, user , handleInset , image , setImage}) => {
  
    
  return (
    <>
      <Modal isOpen={imageModal} size={'full'} onClose={(e) => closeModalImage()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
	   	  <AddNewImageSection user={user} image={image} setImage={setImage}/>
          </ModalBody>

          <ModalFooter>
			 <Button colorScheme='blue' onClick={(e) => handleInset()}>
              Insert
            </Button>
            <Button variant='ghost' mr={3} onClick={(e) => closeModalImage()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImageInsertTemplate