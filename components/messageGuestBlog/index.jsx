'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, IconButton, Input, useToast } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import ReCAPTCHA from "react-google-recaptcha";

let socket;

const GuestBlogMessage = ({userId, title }) => {
  console.log(userId, "USER ID")
  const [message, setMessage] = useState([]);
  const [name, setName] = useState();
  const [guestId, setGuestId] = useState();
  const [isOpen, setIsOpen] = useState(false); // State for toggling chat window
  const [newMessage, setNewMessage] = useState(''); // State for new message input
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState();
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
      getMessage();
      socketInitialize()
  }, []);

const onChangeRecapcha = () => {
 setRecaptchaVerified(true); 
 }
 

  const getMessage = async (id) => {

    try {
      const res = await axios.post('/api/message/search', {
        id: id,
      });
      setMessage(res.data.result);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

   const socketInitialize = async () => {
        socket = io()

        socket.on('connect', () => {
             console.log('connected')
        })
        socket.on('refresh-chat', m => console.log('Received broadcast:',  getMessage(m)));
}
  const sendMessage = async () => {
	socket = io()

      let res = await axios.post('/api/message/send', {
        userId: guestId,
        message: newMessage,
        messageId: messageId,
        name: name,
      });

      setNewMessage('');
     
      socket.emit('add-chat', guestId)
  };
   
 
const toast = useToast()

const handleOpenChat =  async () => {
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(pattern.test(name)){
     if (!recaptchaVerified) {
     toast({
      title: "Please complete the reCAPTCHA.",
      description: "Warning",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
    return;

} else {
 if(name) {
  console.log(userId)
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    setGuestId(uniqid)

      let res = await axios.post('/api/message/create-guest', {
        userId: userId,
        message: "Hi",
        name: name,
        id: uniqid
        
      });
    setMessageId(res.data.result._id)
    getMessage(uniqid)
    setOpen(true);
  } else {

  toast({
      title: "Please add email.",
      description: "Warning",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
 }
}
  } else {
    toast({
      title: "Please input real email.",
      description: "Warning",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
   }
  };

  return (

    <Box position="fixed" bottom="20px" right="20px" zIndex={1000}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <IconButton
          icon={<ChatIcon />}
          bg="#232536"
          color="white"
          size="lg"
          onClick={() => setIsOpen(true)}
          borderRadius="50%"
        />
      )}
      {/* Chat Window */}
      {isOpen && (
        <Box
          mt={2}
          bg="white"
          border="1px solid #ccc"
          borderRadius="8px"
          boxShadow="lg"
          p={4}
          w="350px"
          h="500px"
          position="relative"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontWeight="bold">Chat</Text>
            {/* Close Button Inside */}
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setIsOpen(false)}
            />
          </Box >
             { open ?  <>    <Box
            h="250px"
            overflowY="scroll"
            id='scroller'
            border="1px solid #ddd"
            borderRadius="6px"
            p={2}
            mb={4}
            bg="gray.50"
          >{message && message[0]
              ? message[0].convo.map((data, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={data.id === guestId ? 'flex-end' : 'flex-start'}
                    mb={3}
                  >
                    <Box
                      bg={data.id === guestId ? '#DCF8C6' : '#E6E6E6'} // WhatsApp-like green for client
                      color="black"
                      p={2}
                      borderRadius={12}
                      borderBottomLeftRadius={data.id === guestId ? 12 : 0}
                      borderBottomRightRadius={data.id === guestId ? 0 : 12}
                      maxW="70%"
                      wordBreak="break-word"
                    >
                      {data.message}
                    </Box>
                  </Box>
                ))
              : 'No messages yet.'} 
             </Box>
			<Textarea
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				placeholder="Type your message..."
				mb={2}
				resize="none"
				h="100px"
			/>
          <Button color="white" bg="#232536" onClick={() => sendMessage()} w="100%">
            Send
          </Button></> : <> <Text fontSize={'18px'}> 
			 Welcome to {title ? title : "Markadong Pinoy!"} </Text>
            <Text fontSize={'14px'}> Please enter an email address to indetify yourself. </Text>
            <Box m={4}>
            <Text> Email: </Text>
            <Input htmlSize={4} onChange={(e) => setName(e.target.value)} width='100%' />
<Box mt={"25px"} ml={"-6px"}>
	<ReCAPTCHA
        sitekey="6LfoxpYqAAAAAP27JqB_GiMEWoDby8gSfV_ujAeP"
        onChange={ () => onChangeRecapcha()}
      /></Box>
            <Button mt={2} onClick={(e) => handleOpenChat(e)}>
 Start Chat</Button>
           </Box></> }
        </Box>
      )}
    </Box>
  );
};

export default GuestBlogMessage;
