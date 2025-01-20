
import React, { useEffect, useState } from 'react';
import {  Box, Image, Button, useToast, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import axios from 'axios';
import ModalImage from '../modal/viewModalImage'
import moment from 'moment';

const AdminEvents = ({user}) => {
  console.log(user, "USER ID")
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);

  const [source, setSource] = useState("");
	const toast = useToast()
  useEffect(() => {
    getEvent()
  }, []);


  const getEvent = async () => {

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
       await axios.post('/api/event/addUser', 
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
        console.log(e)
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

  
    <TableContainer ml={5} mr={5} mt={6} width={'97%'} whiteSpace={'normal'}>
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
          event ?  event.map(e => <Tr key={e._id}>
				<Td border={'2px solid #dddddd'}>{e.title}</Td>
               	<Td > <Image
					height="60px"
					ml={2}
					onClick={ ()  => handleOpenModal('Banner', e.fileName)}
					cursor={'pointer'}
					display={'inline-block'}
					src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${e.fileName}`}
					/>   </Td>
                <Td border={'2px solid #dddddd'}>{e.description}</Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
                <Td border={'2px solid #dddddd'}> { e.users.indexOf(user._id) > -1 ?  "Joined": <Button  background={'#232536'} color={'white'} onClick={() => handleAddUserEvent(e._id)}>Join</Button>}</Td>
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
