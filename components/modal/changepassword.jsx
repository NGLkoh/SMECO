

'use client'

import React, {useState} from 'react'
import {Modal ,useToast, ModalOverlay, Text, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import InputCustom from '../inputs/index'
import axios from 'axios'
const ChangePasswordModal =  ({openPassword, closeEditEventModal, username}) => {
 const toast = useToast()
const [newPassword , setNewPassword] = useState("")
const [confirmPassword , setConfirmPassword] = useState("")

const fields = [{
			function: setNewPassword,
			title: 'Enter New Password',
			placeholder: 'Enter new password',
            type: 'password',
			value: newPassword
}, 
{
			function: setConfirmPassword,
			title: 'Confirm New Password',
			placeholder: 'Confirm New Password',
             type: 'password',
			value: confirmPassword
}]

const handleUpdatePassword = async () => {
      if(newPassword == confirmPassword) {
        const params = window.location.href.split('/')
        const res = await axios.post('/api/users/reset-password-dashboard', {username : username, password: newPassword})
       setNewPassword("")
       setConfirmPassword("")
          toast({
			title: "Success",
			description: "Success reset password",
			status: "success",
			duration: 2000,
			isClosable: true,
		  });  
        closeEditEventModal()
     } else {
	toast({
		title: "Password Not match",
		description: "Please check password.",
		status: "warning",
		duration: 2000,
		isClosable: true,
		}); 
     }
        
}


  return (
    <>
      <Modal isOpen={openPassword} onClose={() => closeEditEventModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
            { fields.map((row, index) => (<InputCustom key={index} data={row}/> ))}
  
          </ModalBody>

          <ModalFooter>
			 <Button mr={3} onClick={() =>handleUpdatePassword()}>
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