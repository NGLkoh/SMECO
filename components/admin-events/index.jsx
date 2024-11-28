
import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, Flex, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import { FileUploader } from "react-drag-drop-files";
import moment from 'moment';
let socket;

const fileTypes = ["JPG", "PNG", "GIF"];

const AdminEvents = ({user}) => {
  console.log(user, "USER ID")
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
	const toast = useToast()
  useEffect(() => {
    getEvent()
  }, []);


  const getEvent = async (id) => {

    try {
      const res = await axios.post('/api/event/event');
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
  const handleAddEvent = async () => {
    try{ 
       let res = await axios.post('/api/event/create', {
        id: user._id,
        title: title,
        description: description
      });

        toast({
          title: 'Success Created Event', 
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })

      setTitle("")
      getEvent();
     } catch(e){
   }     
  };
   


  return (
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		  <Box fontSize={'xl'} fontWeight={'600'}>Announcement</Box>
		</HStack>

      <Box mt={2}>
       <Text mt={2} >Title</Text>
       <Input  mt={2} border={'2px solid #dddddd'} onChange={(e) => setTitle(e.target.value)} />

        <Text mt={2}>Description</Text>
       <Textarea mt={2} border={'2px solid #dddddd'} onChange={(e) => setDescription(e.target.value)} />

       <Button mt={2} color={'#ffffff'} background={'#ffb509'} onClick={(e) => handleAddEvent()}> Add </Button>
     </Box> 
    <TableContainer mt={6}>
     	<Table variant='simple' border={'2px solid #dddddd'}>
			<Thead border={'2px solid #dddddd'}>
			<Tr border={'2px solid #dddddd'}>
				<Th border={'2px solid #dddddd'}>Title</Th>
                <Th border={'2px solid #dddddd'}>Description</Th>
				<Th border={'2px solid #dddddd'}>Users</Th>
				<Th border={'2px solid #dddddd'}>Date</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => <Tr>
				<Td border={'2px solid #dddddd'}>{e.title}</Td>
                <Td border={'2px solid #dddddd'}>{e.description}</Td>
				<Td border={'2px solid #dddddd'}>{e.users ? e.users.length : 0} </Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
			</Tr> ) : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default AdminEvents;
