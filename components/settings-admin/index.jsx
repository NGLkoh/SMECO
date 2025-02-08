'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, HStack, Image } from '@chakra-ui/react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

const UAT_URL = process.env.UAT_URL;

const WebSettings = ({user}) => {
	const [fileName, setFileName] = useState()
    const [bgFileName, setBgFileName] = useState()
	const [file, setFile] = useState()
    const [bgFile, setBgFile] = useState()
	const [featuredDescription, setFeaturedDescription] = useState()
   	const [featuredTitle, setFeaturedTitle] = useState()
	const [contactAddress, setAddress] = useState()
	const [contactmobile, setMobile] = useState()
	const [contactfacebook, setFacebook] = useState()  // Added Shopee link state
	const [contactemail, setEmail] = useState()  // Added Lazada link state
    const [userData, setUserData] = useState({})
    const [aboutTitle, setAboutTitle] = useState()
   	const [aboutDesc, setAboutDesc] = useState()
	const [aboutDesc2, setAboutDesc2] = useState()
    const [aboutImage, setAboutImage] = useState()
	const [aboutColumn1, setAboutColumn1] = useState()
    const [aboutColumn2, setAboutColumn2] = useState()
    const [web, setWeb] = useState([])
    const toast = useToast()
  useEffect(() => {
      initialGetWeb()
  }, []);

 const initialGetWeb = async() => {
      const res = await axios.post('/api/web/all')
         console.log(res.data.result)
        setWeb(...res.data.result)
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
      try
        {

         let data = {
                id : web._id,
				featuredBanner: fileName ? fileName :  web.featuredBanner,
				featuredTitle: featuredTitle ? featuredTitle :  web.featuredTitle,
				featuredDecs: featuredDescription ? featuredDescription :  web.featuredDescription,
				contactAddress: contactAddress ? contactAddress :  web.contactAddress,
				contactMobile: contactmobile ? contactmobile :  web.contactmobile,
				contactEmail: contactemail ? contactemail :  web.contactEmail,
				contactfacebook: contactfacebook ? contactfacebook :  web.contactfacebook,
                aboutTitle: aboutTitle ? aboutTitle : web.aboutTitle,
				aboutDesc: aboutDesc ? aboutDesc : web.aboutDesc,
                aboutDesc2: aboutDesc2 ? aboutDesc2 : web.aboutDesc,
				aboutImage: bgFileName ? bgFileName : web.aboutImage,
				aboutColumn1: aboutColumn1 ? aboutColumn1 : web.aboutColumn1,
				aboutColumn2: aboutColumn2 ? aboutColumn2 : web.aboutColumn2
          }

        if(bgFileName) {
          await axios.post('/api/s3/upload', {filename: bgFileName, base64: bgFile})
        }

        if(fileName) {
          await axios.post('/api/s3/upload', {filename: fileName, base64: file})
        }
        
        await axios.post('/api/web/updateById', data)
		
        toast({
          title: 'Successfully Edit your web ', 
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } catch(e) {
        console.log(e)
      }
 }

  return (
    <Box>
      <HStack spacing={8} alignItems={'center'}>
        <Box fontSize={'xl'} fontWeight={'600'}>Web Settings</Box>
      </HStack>
      <Box mt={2}>
        <Text mb={2}>Featured Image:</Text>
        <FileUploader name="file" handleChange={(e) => handleChange(e, "pImage")} types={fileTypes} />
  
        <Text mt={2} mb={2}>Featured title:</Text>
        <Textarea maxLength={250} onChange={(e) => setFeaturedTitle(e.target.value)} defaultValue={web ? web.featuredTitle ? web.featuredTitle: "" : ""}/>
        
        <Text mt={2} mb={2}>feature description:</Text>
        <Textarea  maxLength={250} onChange={(e) => setFeaturedDescription(e.target.value)} defaultValue={web ? web.featuredDecs ? web.featuredDecs: "" : ""} />
        
        <Text mt={2} mb={2}>ContactUs - Email:</Text>
        <Input  onChange={(e) => setEmail(e.target.value)} defaultValue={web ? web.contactEmail ? web.contactEmail: "" : ""}/>
    
        {/* Add Shopee Link */}
        <Text mt={2} mb={2}>ContactUs - Mobile:</Text>
        <HStack>
          <Input onChange={(e) => setMobile(e.target.value)} defaultValue={web ? web.contactMobile ? web.contactMobile: "" : ""}/>
        </HStack>

        <Text mt={2} mb={2}>ContactUs - Address:</Text>
        <HStack>
          <Input onChange={(e) => setAddress(e.target.value)} defaultValue={web ? web.contactAddress ? web.contactAddress: "" : ""}/>
        </HStack>

        <Text mt={2} mb={2}>ContactUs - Facebook:</Text>

        <HStack>
          <Input onChange={(e) => setFacebook(e.target.value)} defaultValue={web ? web.contactfacebook ? web.contactfacebook: "" : ""}/>
        </HStack>

         <Text mt={2} mb={2}>About - Title:</Text>

        <HStack>
          <Input onChange={(e) => setAboutTitle(e.target.value)} defaultValue={web ? web.aboutTitle ? web.aboutTitle: "" : ""}/>
        </HStack>

        <Text mt={2} mb={2}>About - Description:</Text>

        <HStack>
          <Textarea onChange={(e) => setAboutDesc(e.target.value)} defaultValue={web ? web.aboutDesc ? web.aboutDesc: "" : ""}/>
        </HStack>


        <Text mt={2} mb={2}>About - Description Two:</Text>

        <HStack>
          <Textarea onChange={(e) => setAboutDesc2(e.target.value)} defaultValue={web ? web.aboutDesc2 ? web.aboutDesc2: "" : ""}/>
        </HStack>

         <Text mt={2} mb={2}>About - Image:</Text>

        <HStack>
           <FileUploader name="file" handleChange={(e) => handleChange(e, "bg")} types={fileTypes} />
        </HStack> 

        
        <Text mt={2} mb={2}>About - Column One:</Text>

        <HStack>
          <Textarea onChange={(e) => setAboutColumn1(e.target.value)} defaultValue={web ? web.aboutColumn1 ? web.aboutColumn1: "" : ""}/>
        </HStack>


         <Text mt={2} mb={2}>About - Column Two:</Text>

        <HStack>
          <Textarea onChange={(e) => setAboutColumn2(e.target.value)}defaultValue={web ? web.aboutColumn2 ? web.aboutColumn2: "" : ""}/>
        </HStack>

        <Button backgroundColor="#ffb509" mt={2} onClick={() => handleEditBtn()} color={'white'}>Submit</Button>
      </Box>
    </Box> 
  );
};

export default WebSettings;
