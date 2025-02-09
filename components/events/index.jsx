
import React, { useEffect, useState } from 'react';
import { Text, Box, Image, Button, useToast, Input, Flex, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client'
import { FileUploader } from "react-drag-drop-files";
import { color } from 'framer-motion';
import ModalImage from '../modal/viewModalImage'
import moment from 'moment';
let socket;

const fileTypes = ["JPG", "PNG", "GIF"];

const AdminEvents = ({user}) => {
  console.log(user, "USER ID")
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  const [source, setSource] = useState("");
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
   
 const handleOpenModal = (title, source) => {
      setOpen(true)
      setTitle(title)
      setSource(source)
   }

   const onCloseModal = () => {
     setOpen(false)
    }

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
                <Th border={'2px solid #dddddd'}>Banner</Th>
                <Th border={'2px solid #dddddd'}>Description</Th>
				<Th border={'2px solid #dddddd'}>Date</Th>
                <Th border={'2px solid #dddddd'}>Action</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => <Tr>
				<Td border={'2px solid #dddddd'}>{e.title}</Td>
               	<Td > <Image
					height="60px"
					ml={2}
					onClick={ (row)  => handleOpenModal('Banner', e.fileName)}
					cursor={'pointer'}
					display={'inline-block'}
					src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${e.fileName}`}
					/>   </Td>
                <Td border={'2px solid #dddddd'}>{e.description}</Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
                <Td border={'2px solid #dddddd'}> { e.users.indexOf(user._id) > -1 ?  "Joined": <Button  background={'#232536'} color={'white'} onClick={(ed) => handleAddUserEvent(e._id)}>Join</Button>}</Td>
			</Tr> ) : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
      <ModalImage open={open} onCloseModal={onCloseModal} source={source} title={title}/>
     </Box>
  );
};

export default AdminEvents;
