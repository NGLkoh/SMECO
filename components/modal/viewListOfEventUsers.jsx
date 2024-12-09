

'use client'

import React, { useState, useEffect} from 'react'
import {Modal , ModalOverlay, ModalContent, OrderedList,ListItem, ModalHeader, ModalCloseButton,Image,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import axios from 'axios'

const ModalUserEvent = ({ title, open, onCloseModal, users}) => {
  
  return (
    <>
      <Modal isOpen={open} onClose={() => onCloseModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
     
          <ModalBody> 
             <OrderedList>
              {
               users ?  users.map(name => <ListItem key={name} mt={2}>{name}</ListItem>) :""
              }
             </OrderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => onCloseModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalUserEvent