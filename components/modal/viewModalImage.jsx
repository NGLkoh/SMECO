

'use client'

import React from 'react'
import {Modal , ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,Image,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
const ModalImage = ({ title, source, open, onCloseModal}) => {
 
  return (
    <>
      <Modal isOpen={open} onClose={(e) => onCloseModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
        <Image
			height="100%"
            display={'inline-block'}
			src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${source}`}
			/> 
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e) => onCloseModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalImage