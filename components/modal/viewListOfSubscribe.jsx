

'use client'

import React, { useState, useEffect} from 'react'
import {Modal , ModalOverlay, ModalContent, OrderedList,ListItem, ModalHeader, ModalCloseButton,Image,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import axios from 'axios'

const ModalSubscribe = ({ title, open, onCloseModal, subscribes}) => {
  
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
               subscribes ?  subscribes.map(row => <ListItem key={row._id} mt={2}>{row.email}</ListItem>) :""
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

export default ModalSubscribe