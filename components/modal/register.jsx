

'use client'

import ReCAPTCHA from "react-google-recaptcha";
import React, {useState} from 'react'
import {Modal, Box , useMediaQuery, ModalOverlay, Text, ModalContent, ModalHeader, ModalCloseButton,Input,useToast,  ModalBody , ModalFooter, Button, ChakraProvider} from '@chakra-ui/react'
import axios from "axios";
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";

const SaveGoolgeLogin =  ({modalRegisterLogin, closeModalRegisterLogin, decodeCredentials}) => {
   const [ title, setTitle] = useState()
   const [ description, setDescription] = useState()
   const [file, setFile ] = useState()
   const [fileName, setFileName ] = useState()
   const [businessPermit, setBusinessPermit] = useState(String)
   const [barangayClearance, setBarangayClearabce] = useState(String)
   const [filenameBP, setFilenameBP] = useState()  
   const [filenameBC, setFilenameBC] = useState()  
const [recaptchaVerified, setRecaptchaVerified] = useState(false);
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const toast = useToast();
   const handleSaveTemplate = async () => {
            let checking = user.ids ? user.ids : user._id
	        await axios.post('/api/s3/upload', {filename: fileName, base64: file})
			await axios.post('/api/template/create', { id: checking, data: html , title: title, fileName: fileName, description: description})
			refresh()
            back(false)
            closeModal()
   }

const handleChangeBusinessPermit = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFilenameBP(`${r}-${file.name}`)
       new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setBusinessPermit(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

const handleChangeBarangayClearance = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFilenameBC(`${r}-${file.name}`)
        new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setBarangayClearabce(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};


  const onChangeRecapcha = () => {
 setRecaptchaVerified(true); 
 }

	const handleRegisterGoogle =  async () => {
         if (!recaptchaVerified) {
     toast({
		title: "Please complete the reCAPTCHA.",
		description: "Warning",
		status: "warning",
		duration: 2000,
		isClosable: true,
		});
      return;
    } else
		if(filenameBP && filenameBC) {
         try{ await axios.post('/api/s3/upload', {filename: filenameBP, base64: businessPermit})}
         catch(e) { console.log(e)}
         try{ await axios.post('/api/s3/upload', {filename: filenameBC, base64: barangayClearance}) } 
         catch(row) {console.log(row) }
          const res = await axios.post('/api/users/checker', {email : decodeCredentials.email})
  
     if(res.data.message !== 'true') { 
		 const res = await axios.post('/api/users/create', 
		{   username: decodeCredentials.email,
            password: 'google',
            email: decodeCredentials.email, 
            firstName: decodeCredentials.given_name, 
            lastName:  decodeCredentials.family_name, 
			code: 1111, 
            businessPermit: filenameBP, 
            barangayClearance: filenameBC  })
		
          toast({
          title: 'Success',
          status: 'Successfully created',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
         window.location.href = "/dashboard"
      } else {
				toast({
						title: 'Email already existed!',
						status: 'warning',
						position: 'top-right',
						duration: 9000,
						isClosable: true,
					})
			}
         } else {
	       toast({
          title: 'Fill up all',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
		}
    }
  return (
    <ChakraProvider>
      <Modal isOpen={modalRegisterLogin} onClose={() => closeModalRegisterLogin()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register Google</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

           <Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>First Name</Text>
           <Input value={decodeCredentials.given_name} disabled/>
           <Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Last Name</Text>
            <Input value={decodeCredentials.family_name} disabled/>
            <Text mb={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Emai</Text>
            <Input value={decodeCredentials.email} disabled/>
			<Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Business Permit</Text>
			<FileUploader  classes="custom-fileUploader" handleChange={(e) => handleChangeBusinessPermit(e)} name="file" types={fileTypes} />
			<Text mb={2} mt={2} fontSize={{ base: '10px', md: 'xsm', lg: 'sm' }}>Barangay Clearance</Text>
			<FileUploader  classes="custom-fileUploader" handleChange={(e) => handleChangeBarangayClearance(e)} name="file" types={fileTypes} />
          </ModalBody>
<Box margin={"auto"} pl={ isLargerThan980 ? '2%' : '1%'} mb={"20px"}>
	<ReCAPTCHA
        sitekey="6LfoxpYqAAAAAP27JqB_GiMEWoDby8gSfV_ujAeP"
        onChange={ () => onChangeRecapcha()}
      />
</Box>

          <ModalFooter>
			 <Button colorScheme='blue' mr={3} onClick={() => handleRegisterGoogle()}>
              Save
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeModalRegisterLogin()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default SaveGoolgeLogin