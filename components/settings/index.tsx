'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

const ProfileEdit = ({user}:any) => {
	const [fileName, setFileName] = useState<any>()
    const [bgFileName, setBgFileName] = useState<any>()
	const [file, setFile] = useState<any>()
    const [bgFile, setBgFile] = useState<any>()
	const [description, setDescription] = useState<any>()
	const [facebook, setFacebook] = useState<any>()
	const [twitter, setTwitter] = useState<any>()
	const [instagram, setInstagram] = useState<any>()
	const [linkIn, setLinkIn] = useState<any>()
   const toast = useToast()
  useEffect(() => {
 
  }, []);

   const handleChange = async (event:any, type: string)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
        type == "pImage" ?  setFileName(`${r}-${event.name}`) : setBgFileName(`${r}-${event.name}`)
        new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(event)
			reader.onload = () => {
             type == "pImage" ?  setFile(reader.result) : setBgFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};
   
 const handleEditBtn = async () => {
      try{
        let data = { backgroundImage: bgFileName ? bgFileName : user.profile[0].backgroundImage  , facebook: facebook ? facebook : user.profile[0].facebook , twitter: twitter ? twitter : user.profile[0].twitter , linkIn: linkIn ? twitter : user.profile[0].twitter,  instagram: instagram ? twitter : user.profile[0].instagram,  fileName: fileName ? fileName : user.profile[0].fileName , description: description}
        
       if(bgFileName) {
       	  await axios.post('/api/s3/upload', {filename: bgFileName, base64: bgFile})
        }

        if(fileName) {
        	 await axios.post('/api/s3/upload', {filename: fileName, base64: file})
         }
        
        await axios.post('/api/users/editProfile', { id: user._id, data: data})
		
         toast({
          title: 'Successfully Edit profile page ', 
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })

      } catch(e){}
	
 }

  return (
    user.profile[0] ? 
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		<Box fontSize={'xl'} fontWeight={'600'}>Edit Profile Page</Box>
		</HStack>

       <Box mt={2}>
       <Text> Profile Link:</Text> 
       <Input value={`http://localhost:3000/blog-user/${user._id}`} disabled/>
       </Box>
       <Box mt={2}>
                <Text mb={2}>Blog Profile Image:</Text>
				<FileUploader name="file" handleChange={(e:any) => handleChange(e, "pImage")} types={fileTypes} />
				<Text mb={2}>Background Image:</Text>
				<FileUploader name="file" handleChange={(e:any) => handleChange(e, "bg")} types={fileTypes} />
                <Text mt={2} mb={2}>Blog Profile Description:</Text>
                <Textarea  onChange={(e:any) => setDescription(e.target.value)}  defaultValue={user? user.profile[0].description : ""}/>
                <Text mt={2} mb={2}>Facebook:</Text>
                <Input onChange={(e:any) => setFacebook(e.target.value)}  defaultValue={user? user.profile[0].facebook : ""}/>
                <Text mt={2} mb={2}>Twitter:</Text>
                <Input onChange={(e:any) => setTwitter(e.target.value)} defaultValue={ user? user.profile[0].twitter : ""}/>
                <Text mt={2} mb={2}>Instagram:</Text>
                <Input onChange={(e:any) => setInstagram(e.target.value)} defaultValue={ user? user.profile[0].instagram : ""}/>
                <Text mt={2} mb={2}>LinkIn:</Text>
                <Input onChange={(e:any) => setLinkIn(e.target.value)} defaultValue={user? user.profile[0].linkIn : ""}/>
         
         <Button backgroundColor="#ffb509" mt={2} onClick={(e) =>handleEditBtn()} color={'white'}>Submit</Button>
      </Box>
     </Box> :  <Box textAlign={'center'} fontSize={18} marginTop={20}> Please logout and login again! Thanks</Box>
  );
};

export default ProfileEdit;
