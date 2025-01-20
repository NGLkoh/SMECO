import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, IconButton, Input, useToast } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client';
import ReCAPTCHA from "react-google-recaptcha";

let socket;

const GuestBlogMessage = ({ userId }) => {
  const [message, setMessage] = useState([]);
  const [name, setName] = useState('');
  const [guestId, setGuestId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState();
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const toast = useToast();

  useEffect(() => {
    getMessage();
    socketInitialize();
  }, []);

  const emailIsValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onChangeRecapcha = () => {
    setRecaptchaVerified(true);
  };

  const getMessage = async (id) => {
    try {
      const res = await axios.post('/api/message/search', { id });
      setMessage(res.data.result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const socketInitialize = async () => {
    socket = io();
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('refresh-chat', (m) => {
      console.log('Received broadcast:', m);
      getMessage(m);
    });
  };

  const sendMessage = async () => {
    socket = io();
    await axios.post('/api/message/send', {
      userId: guestId,
      message: newMessage,
      messageId,
      name,
    });
    setNewMessage('');
    socket.emit('add-chat', guestId);
  };

  const handleOpenChat = async () => {
    if (!emailIsValid(name)) {
      toast({
        title: "Invalid Email Address.",
        description: "Please provide a valid email address.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!recaptchaVerified) {
      toast({
        title: "Please complete the reCAPTCHA.",
        description: "Verification is required to start the chat.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const uniqid = randLetter + Date.now();
    setGuestId(uniqid);

    try {
      const res = await axios.post('/api/message/create-guest', {
        userId,
        message: "Hi",
        name,
        id: uniqid,
      });
      setMessageId(res.data.result._id);
      getMessage(uniqid);
      setOpen(true);
    } catch (error) {
      console.error('Error creating guest:', error);
    }
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex={1000}>
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
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setIsOpen(false)}
            />
          </Box>
          {open ? (
            <>
              <Box
                h="250px"
                overflowY="scroll"
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
                        justifyContent={data.id === guestId ? 'flex-end' : 'flex-start'}
                        mb={3}
                      >
                        <Box
                          bg={data.id === guestId ? '#DCF8C6' : '#E6E6E6'}
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
              <Button color="white" bg="#232536" onClick={sendMessage} w="100%">
                Send
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="18px">Welcome to Markadong Pinoy!</Text>
              <Text fontSize="14px">
                Please enter an email address to identify yourself.
              </Text>
              <Box m={4}>
                <Text>Email:</Text>
                <Input
                  htmlSize={4}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  width="100%"
                />
                <Box mt="25px">
                  <ReCAPTCHA
                    sitekey="6LfoxpYqAAAAAP27JqB_GiMEWoDby8gSfV_ujAeP"
                    onChange={onChangeRecapcha}
                  />
                </Box>
                <Button mt={2} onClick={handleOpenChat}>
                  Start Chat
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GuestBlogMessage;
