'use client'

import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, IconButton } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'

let socket;

const ContactAdmin = ({ user }) => {

  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for toggling chat window
  const [newMessage, setNewMessage] = useState(''); // State for new message input
  const [messageId, setMessageId] = useState(''); // State for new message input

  useEffect(() => {
    if (isOpen) {
      getMessage();
      socketInitialize()
    }
  }, [isOpen]);

  const getMessage = async () => {
    try {
      const checking = user.ids ? user.ids : user._id;
      const res = await axios.post('/api/message/search', {
        id: checking,
      });
      setMessageId(res.data.result[0]._id)
      setMessage(res.data.result);
	 console.log(res)
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

const socketInitialize = async () => {
        socket = io()

        socket.on('connect', () => {
             console.log('connected')
        })

		const resfresh = () => {
			getMessage()
		}
	  socket.on("refresh-chat", resfresh);
}
  const sendMessage = async () => {
    
	 socket = io()
     const checking = user.ids ? user.ids : user._id;
      let res = await axios.post('/api/message/send', {
        userId: checking,
        message: newMessage,
        messageId: messageId
        
      });
      setNewMessage('');
      socket.emit('add-chat', {result: res.result})

  };

  const createMessage = async () =>{
    setIsOpen(true)
    console.log(message)
   const checking = user.ids ? user.ids : user._id;
   let res = await axios.post('/api/message/checker', { id:checking });
   console.log(res.data.message)
   if(res.data.message !== 'true') {
         await axios.post('/api/message/create', {
			userId: "672ff29e19abf9597c2544f6",
			message: "Hi",
			name: `${user.firstName} ${user.lastName}`,
			id: checking
        });
      getMessage()
    }
  }

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex={1000}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <IconButton
          icon={<ChatIcon />}
          bg="#232536"
          color="white"
          size="lg"
          onClick={() => createMessage()}
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
            <Text fontWeight="bold">Chat with Admin</Text>
            {/* Close Button Inside */}
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setIsOpen(false)}
            />
          </Box>
          <Box
            h="250px"
            overflowY="scroll"
            id='scroller'
            border="1px solid #ddd"
            borderRadius="6px"
            p={2}
            mb={4}
            bg="gray.50"
          >
            {message && message[0]
              ? message[0].convo.map((data, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={data.id === user._id ? 'flex-end' : 'flex-start'}
                    mb={3}
                  >
                    <Box
                      bg={data.id === user._id ? '#DCF8C6' : '#E6E6E6'} // WhatsApp-like green for client
                      color="black"
                      p={2}
                      borderRadius={12}
                      borderBottomLeftRadius={data.id === user._id ? 12 : 0}
                      borderBottomRightRadius={data.id === user._id ? 0 : 12}
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
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ContactAdmin;
