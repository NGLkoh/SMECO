

'use client'

import React, {useState} from 'react'
import {Modal ,useToast, ModalOverlay, Text,Box , ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button, InputGroup, InputRightElement} from '@chakra-ui/react'
import InputCustom from '../inputs/index'
import axios from 'axios'
import { FaEye, FaLock } from 'react-icons/fa'
const ChangePasswordModal =  ({openPassword, closeEditEventModal, username}) => {
 const toast = useToast()
const [newPassword , setNewPassword] = useState("")
const [confirmPassword , setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
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
  <Box margin={"auto"} p={2}>  
								<Box mt={2} >
					<Text mb="8px">Change Password</Text>
					<InputGroup>
					 <Input
						value={newPassword}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setNewPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
						placeholder="******"
						pt={'3px'}
						size="sm"
                        
						mb={4}
					/>
					<InputRightElement pb={'6px'}>
					 { showPassword ? <FaLock   color='black' onClick={() => setShowPassword(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword(true)}/>}
					</InputRightElement>
                </InputGroup>
                </Box>
              </Box>
               <Box margin={"auto"} p={2}>  
				<Box mt={2} >
              	<Text mb="8px">Confirm Password</Text>
					<InputGroup>
					 <Input
						value={confirmPassword}
						type={showPassword1 ? "text" : "password"}
						onChange={(e) => setConfirmPassword(e.target.value)}
						bg="#FFFFFF"
						color="#4A5568"
						borderRadius={8}
						placeholder="******"
						pt={'3px'}
						size="sm"
                        
						mb={4}
					/>
					<InputRightElement pb={'6px'}>
					 { showPassword1 ? <FaLock   color='black' onClick={() => setShowPassword1(false)}/> :	<FaEye color='black' cursor={'pointer'} onClick={() => setShowPassword1(true)}/>}
					</InputRightElement>
                </InputGroup>
                </Box>
              </Box>
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