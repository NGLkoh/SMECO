
import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, IconButton, Input, Flex, HStack  } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import { FileUploader } from "react-drag-drop-files";
let socket;

const fileTypes = ["JPG", "PNG", "GIF"];

const Events = ({user}) => {
  console.log(user, "USER ID")
  const [message, setMessage] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
 
  }, []);


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
		<Box fontSize={'xl'} fontWeight={'600'}>Events</Box>
		</HStack>
     
       
     </Box>
  );
};

export default Events;
