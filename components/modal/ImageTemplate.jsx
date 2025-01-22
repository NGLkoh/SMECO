

'use client'

import React from 'react'
import {Modal , ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import AddNewImageSection from '../addImageModal/index'
const ImageInsertTemplate = ({imageModal, closeModalImage, user , handleInset , image , setImage}) => {
  
    
  return (
    <>
      <Modal isOpen={imageModal} size={'full'} onClose={() => closeModalImage()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
	   	  <AddNewImageSection user={user} image={image} setImage={setImage}/>
          </ModalBody>

          <ModalFooter>
			 <Button  onClick={() => handleInset()}>
              Insert
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeModalImage()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImageInsertTemplate