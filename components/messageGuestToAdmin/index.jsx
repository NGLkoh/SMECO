// messageGuest.js
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Flex,
  Text,
  Badge,
  Textarea,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import io from 'socket.io-client'

let socket;

export const MessageGuestToAdmin = ({ user}) => {
  const [selectedChat, setSelectedChat] = useState(null);
   const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
      getMessage();
      socketInitialize()
  }, []);

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
 
   const getMessage = async () => {
    try {
      const checking = user.ids ? user.ids : user._id;
      setMessage([])
      const res = await axios.post('/api/message/search', {
        id: checking,
      });

      res.data.result.map(async(row) => {
        const resConvo = await axios.post('/api/users/getProfilePicture', {
        id: row.convo[0].id,
      });
   
     setMessage(oldState => [...oldState, {...row, fileName : resConvo.data.result[0] ? resConvo.data.result[0].profile[0].fileName : ""}])

     })
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const openChat = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = async() => {
    if (newMessage.trim() !== '') {
      socket = io()

      let res = await axios.post('/api/message/send', {
        userId: user._id,
        message: newMessage,
        messageId: selectedChat._id
        
      });
      setNewMessage('');
      socket.emit('add-chat', user._id)
   }
  };


  const handleTextArea = (e) => {
    setNewMessage(e.target.value);
  }
  return (
    <Flex h="85vh" bg="white">
      <Box w="30%" bg="white" p={4} color="black" overflowY="auto">
        <Text fontSize="lg" fontWeight="bold" mb={4}>Messages</Text>
        {message.map((chat, key) => (
          <Flex
            key={key}
            align="center"
            p={2}
            borderBottom="1px solid gray"
            cursor="pointer"
            onClick={() => openChat(chat)}
            bg={selectedChat?._id === chat._id ? 'gray.200' : 'inherit'}
            _hover={{ bg: 'gray.100' }}
          >
            <Avatar src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${chat.fileName}`} name={chat.convo[0].name}  mr={4} />
            <Box flex="1">
              <Flex justify="space-between">
                <Text fontWeight="bold"> {chat.convo[0].name}</Text>
                <Text fontSize="sm" color="gray.500">{chat.time}</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">{chat.convo ?  chat.convo[chat.convo.length - 1].message  : "" } </Text>
            </Box>
            {chat.unread && <Badge colorScheme="blue" ml={2}></Badge>}
          </Flex>
        ))}
      </Box>

      <Box flex="1" bg="gray.50" color="black" position="relative">
        {selectedChat ? (
          <>
            <Flex align="center" justify="space-between" p={4} bg="white" borderBottom="1px solid gray">
              <Flex align="center">
                <Avatar src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${selectedChat.fileName}`}  name={selectedChat.convo[0].name} mr={4} />
                <Text fontWeight="bold">{selectedChat.convo[0].name }</Text>
              </Flex>
            </Flex>
            <Box h="calc(100% - 120px)" overflowY="auto" p={4}>
              {message ? message[0] ? (message.find(o => o._id ===  selectedChat._id).convo).map((msg, index) => (
                <Flex key={index} justify={msg.id === user._id ? 'flex-end' : 'flex-start'} mb={4}>
                  <Box bg={msg.id === user._id ? 'blue.100' : 'gray.200'} p={3} borderRadius="md" maxW="70%">
                    <Text>{msg.message}</Text>
                    <Text fontSize="xs" color="gray.500">{msg.time}</Text>
                  </Box>
                </Flex>
              )) :"" : ""}
            </Box>
            <Flex align="center" p={4} borderTop="1px solid gray">
              <Textarea value={newMessage} onChange={(e) => handleTextArea(e)} placeholder="Type a message..." bg="white" resize="none" mr={2} />
              <Button colorScheme="blue" onClick={() => sendMessage()}>Send</Button>
            </Flex>
          </>
        ) : (
          <Flex justify="center" align="center" h="100%">
            <Text fontSize="lg" color="gray.500">Select a chat to start messaging</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default MessageGuestToAdmin;
