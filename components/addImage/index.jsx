'use client'

import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import React, { useState , useEffect} from 'react'
import axios from 'axios'
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";
const AddNewImageSection = ({user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [media, setMedia ] = useState([])
  const [file, setFile ] = useState()
  const [fileName, setFileName ] = useState()
  const [seleted, setSelected ] = useState()
	const toast = useToast()

	useEffect(() => {
      getMedia()
	}, [])

  const getMedia = async () => {

   let checking = user.ids ? user.ids : user._id
        try{ const res = await axios.post('/api/s3/search', {id: checking}) 
       
	   setMedia(res.data.result) }catch(e) {console.log(e)}
   }

  const handleChange = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${file.name}`)
        new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

  const uploadS3 = async () => {
        try {
         
    await axios.post('/api/s3/upload', {filename: fileName, base64: file})
        const store = await axios.post('/api/s3/store', {id: user._id, key: fileName})
        toast({
          title: 'Upload Success',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
         getMedia()
        }catch(e) {
         toast({
          title: 'Upload  unsuccessful exceed 100mb',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
     }
    
   }
  const handleSelect = (id) => {
      setSelected(id)
  }

  const handleDelete = async () => {
    if(seleted) {

   const remove = await axios.post('/api/s3/remove', {id: seleted})
        toast({
          title: 'Remove Success',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        }) 
     getMedia()
     setSelected("")
   } else {
    toast({
          title: 'Please select image to delete',
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
  }
        
  }
  return (	
    <>
      <Box bg={'gray.100'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize={'xl'} fontWeight={'600'}>Upload</Box>
          </HStack>

         
        </Flex>

    
      </Box>
	  
      <Box p={4}>
			   <FileUploader handleChange={(e) => handleChange(e)} name="file" types={fileTypes} />
             <Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mt={2}
              onClick={(e) => uploadS3(e)}
              mr={4}>
              Upload
            </Button> 
      </Box>
     <Box position={'relative'}> 
     {
		media ?  media.map((rows) =>  <Image
			height="200px"
             m={2}
            onClick={() => handleSelect(rows._id)}
            border={seleted == rows._id ? "2px solid blue" : ""}
            display={'inline-block'}
			key={rows.ids}
			src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${rows.key}`}
			/> ) : ""
		}
     </Box>
              <Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mt={2}
              ml={2}
              onClick={() => handleDelete()}
              mr={4}>
              Delete
            </Button> 
    </>
  )
}


export default  AddNewImageSection