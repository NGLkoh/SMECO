

'use client'

import React, {useState} from 'react'
import {Modal , ModalOverlay, Text, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'

const ChangePasswordModal =  ({openPassword, closeEditEventModal}) => {
 
  return (
    <>
      <Modal isOpen={openPassword} onClose={() => closeEditEventModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
            <Text fontSize={11} mb={2}>Current Password:</Text>
            <Input />
             <Text fontSize={11} mb={2}>New Password:</Text>
            <Input  type='password'/>
             <Text fontSize={11} mb={2}>Confirm Password:</Text>
            <Input  type='password'/>

  
          </ModalBody>

          <ModalFooter>
			 <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeEditEventModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePasswordModal