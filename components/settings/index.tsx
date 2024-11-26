'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, IconButton, Input, Flex, HStack  } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import { FileUploader } from "react-drag-drop-files";
let socket;
const fileTypes = ["JPG", "PNG", "GIF"];
const ProfileEdit = ({user}:any) => {
  console.log(user, "USER ID")
  const [message, setMessage] = useState([]);
  const [name, setName] = useState();
	const [fileName, setFileName] = useState<any>()
	const [file, setFile] = useState<any>()
	const [description, setDescription] = useState<any>()
	const [facebook, setFacebook] = useState<any>()
	const [twitter, setTwitter] = useState<any>()
	const [instagram, setInstagram] = useState<any>()
	const [linkIn, setLinkIn] = useState<any>()
  useEffect(() => {
 
  }, []);
   const handleChange = async (event:any)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${event.name}`)
        const base64 = new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(event)
			reader.onload = () => {
              setFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

//   const getMessage = async (id) => {

//     try {
//       const res = await axios.post('/api/message/search', {
//         id: id,
//       });
//       setMessage(res.data.result);

//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//    const socketInitialize = async () => {
//         socket = io()

//         socket.on('connect', () => {
//              console.log('connected')
//         })

// 	  const resfresh = () => {
// 		getMessage(guestId)
// 	  }

// 	  socket.on("refresh-chat", payload => {
//         console.log(payload)
//       });
// }
//   const sendMessage = async () => {
// 	socket = io()

//       let res = await axios.post('/api/message/send', {
//         userId: guestId,
//         message: newMessage,
//         messageId: messageId,
//         name: name,
//       });

//       setNewMessage('');
//       getMessage(guestId)
//       socket.emit('add-chat', {result: res.result})

//   };
   


  return (
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
				<FileUploader name="file" handleChange={(e) => handleChange(e)} types={fileTypes} />
				<Text mt={2} mb={2}>Blog Profile Description:</Text>
                <Textarea  onChange={(e:any) => setDescription(e.target.value)}  defaultValue={user.profile[0].description}/>
                <Text mt={2} mb={2}>Facebook:</Text>
                <Input onChange={(e:any) => setFacebook(e.target.value)}  defaultValue={user.profile[0].facebook}/>
                <Text mt={2} mb={2}>Twitter:</Text>
                <Input onChange={(e:any) => setTwitter(e.target.value)} defaultValue={user.profile[0].twitter}/>
                <Text mt={2} mb={2}>Instagram:</Text>
                <Input onChange={(e:any) => setInstagram(e.target.value)} defaultValue={user.profile[0].instagram}/>
                <Text mt={2} mb={2}>LinkIn:</Text>
                <Input onChange={(e:any) => setLinkIn(e.target.value)} defaultValue={user.profile[0].linkIn}/>
         
         <Button backgroundColor="#ffb509" mt={2} color={'white'}>Submit</Button>
      </Box>
     </Box>
  );
};

export default ProfileEdit;
