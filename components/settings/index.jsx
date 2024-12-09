'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, HStack, Image } from '@chakra-ui/react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

const UAT_URL = process.env.UAT_URL;
const ProfileEdit = ({user}) => {
	const [fileName, setFileName] = useState()
    const [bgFileName, setBgFileName] = useState()
	const [file, setFile] = useState()
    const [bgFile, setBgFile] = useState()
	const [description, setDescription] = useState()
	const [facebook, setFacebook] = useState()
	const [instagram, setInstagram] = useState()
	const [shopee, setShopee] = useState()  // Added Shopee link state
	const [lazada, setLazada] = useState()  // Added Lazada link state
	const [tiktok, setTiktok] = useState()  // Added TikTok link state
   const [userData, setUserData] = useState({})
   const toast = useToast()

  useEffect(() => {
   initialGetUset()
  }, []);
 const initialGetUset = async() => {
    const res = await axios.post('/api/users/usersById', { id: user._id })
	console.log(res.data.result[0].profile[0], "TANGGNGGNGN") 
   setUserData(res.data.result[0])
  }

const handleChange = async (event, type) => {
  let r = (Math.random() + 1).toString(36).substring(7);
  if (type === "pImage") {
    setFileName(`${r}-${event.name}`);
  } else {
    setBgFileName(`${r}-${event.name}`);
  }
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onload = () => {
      if (type === "pImage") {
        setFile(reader.result);
      } else {
        setBgFile(reader.result);
      }
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};
   
 const handleEditBtn = async () => {
      try{
        let data = { 
          backgroundImage: bgFileName ? bgFileName : user.profile[0].backgroundImage, 
		  description: description ? description : user.profile[0].description,
          facebook: facebook ? facebook : user.profile[0].facebook,
          instagram: instagram ? instagram : user.profile[0].instagram,
          fileName: fileName ? fileName : user.profile[0].fileName,
          shopee: shopee ? shopee : user.profile[0].shopee,
          lazada: lazada ? lazada : user.profile[0].lazada, // Add Lazada link data
          tiktok: tiktok ? tiktok : user.profile[0].tiktok,  // Add TikTok link data
        }
        
        if(bgFileName) {
          await axios.post('/api/s3/upload', {filename: bgFileName, base64: bgFile})
        }

        if(fileName) {
          await axios.post('/api/s3/upload', {filename: fileName, base64: file})
        }
        
        await axios.post('/api/users/editProfile', { id: user._id, data: data})
		
        toast({
          title: 'Successfully Edit your Profile ', 
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
initialGetUset()
      } catch(e) {
        console.log(e)
      }
 }

  return (
    user.profile[0] ? 
    <Box>
      <HStack spacing={8} alignItems={'center'}>
        <Box fontSize={'xl'} fontWeight={'600'}>Edit Profile Page</Box>
      </HStack>

      <Box mt={2}>
        <Text> Profile Link:</Text> 
        <Input value={`${UAT_URL}/blog-user/${user._id}`} disabled/>
      </Box>
      <Box mt={2}>
        <Text mb={2}>Blog Profile Image:</Text>
        <FileUploader name="file" handleChange={(e) => handleChange(e, "pImage")} types={fileTypes} />
        <Text mb={2}>Background Image:</Text>
        <FileUploader name="file" handleChange={(e) => handleChange(e, "bg")} types={fileTypes} />
        <Text mt={2} mb={2}>Blog Profile Description:</Text>
        <Textarea onChange={(e) => setDescription(e.target.value)} defaultValue={userData ? userData.profile ? userData.profile[0].description : "" : ""}/>
        
        <Text mt={2} mb={2}>Facebook:</Text>
        <Input onChange={(e) => setFacebook(e.target.value)} defaultValue={userData ? userData.profile ? userData.profile[0].facebook  : "" : ""}/>
        
        <Text mt={2} mb={2}>Instagram:</Text>
        <Input onChange={(e) => setInstagram(e.target.value)} defaultValue={userData ? userData.profile ? userData.profile[0].instagram : "" : ""}/>
    
        {/* Add Shopee Link */}
        <Text mt={2} mb={2}>Shopee:</Text>
        <HStack>
          <Input onChange={(e) => setShopee(e.target.value)} defaultValue={userData ?  userData.profile ? userData.profile[0].shopee : "" : ""}/>
        </HStack>

        <Text mt={2} mb={2}>Lazada:</Text>
        <HStack>
          <Input onChange={(e) => setLazada(e.target.value)} defaultValue={userData ? userData.profile ? userData.profile[0].lazada : "" : ""}/>
        </HStack>

        <Text mt={2} mb={2}>TikTok:</Text>
        <HStack>
          <Input onChange={(e) => setTiktok(e.target.value)} defaultValue={userData ? userData.profile ? userData.profile[0].tiktok : "" : ""}/>
        </HStack>

        <Button backgroundColor="#ffb509" mt={2} onClick={() => handleEditBtn()} color={'white'}>Submit</Button>
      </Box>
    </Box> :  
    <Box textAlign={'center'} fontSize={18} marginTop={20}> Please logout and login again! Thanks</Box>
  );
};

export default ProfileEdit;
