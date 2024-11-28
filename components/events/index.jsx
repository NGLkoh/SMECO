
import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, Flex, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import { FileUploader } from "react-drag-drop-files";
import { color } from 'framer-motion';
import moment from 'moment';
let socket;

const fileTypes = ["JPG", "PNG", "GIF"];

const AdminEvents = ({user}) => {
  console.log(user, "USER ID")
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState();
	const toast = useToast()
  useEffect(() => {
    getEvent()
  }, []);


  const getEvent = async (id) => {

    try {
      const res = await axios.post('/api/event/event');
      console.log(res.data.result, "tes")
      setEvent(res.data.result);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

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
  const handleAddUserEvent = async (id) => {

   let checking = user.ids ? user.ids : user._id
      try {
      let res = await axios.post('/api/event/addUser', 
       {
		"ids": id,
		"userId":  checking
	   });
          toast({
          title: 'Success Full Joined', 
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
        setTitle("")
        getEvent();
       }catch(e) {
       }
  };
   


  return (
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		  <Box fontSize={'xl'} fontWeight={'600'}>Announcement</Box>
		</HStack>

  
    <TableContainer mt={6}>
     	<Table variant='simple' border={'2px solid #dddddd'}>
			<Thead border={'2px solid #dddddd'}>
			<Tr border={'2px solid #dddddd'}>
				<Th border={'2px solid #dddddd'}>Title</Th>
                <Th border={'2px solid #dddddd'}>Description</Th>
				<Th border={'2px solid #dddddd'}>Date</Th>
                <Th border={'2px solid #dddddd'}>Action</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => <Tr>
				<Td border={'2px solid #dddddd'}>{e.title}</Td>
                <Td border={'2px solid #dddddd'}>{e.description}</Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
                <Td border={'2px solid #dddddd'}> { e.users.indexOf(user._id) > -1 ?  "Joined": <Button  background={'#232536'} color={'white'} onClick={(ed) => handleAddUserEvent(e._id)}>Join</Button>}</Td>
			</Tr> ) : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default AdminEvents;
