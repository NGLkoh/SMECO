
import React, { useEffect, useState } from 'react';
import { Box, useToast, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
const fileTypes = ["JPG", "PNG", "GIF"];

const Comments = ({user}) => {
  console.log(user, "USER ID")
  const [event, setComment] = useState([]);
	const toast = useToast()
  useEffect(() => {
    getEvent()
  }, []);


  const getEvent = async (id) => {

    try {
      let checking = user.ids ? user.ids : user._id
      const res = await axios.post('/api/template/search', {id: checking})
        res.data.result.map(async (row) => {
            const commentRes =await axios.post('/api/comment/search', {id: row._id})
      
            let data =  [{title: row.title, ...commentRes.data.result[0]}]
            setComment(prevState => [...prevState, ...data]);
            //   setComment(commentRes.data.result)
         })

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
        getEvent();
       }catch(e) {
       }
  };
   


  return (
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		  <Box fontSize={'xl'} fontWeight={'600'}>Comments</Box>
		</HStack>

  
    <TableContainer mt={6}>
     	<Table variant='simple' border={'2px solid #dddddd'}>
			<Thead border={'2px solid #dddddd'}>
			<Tr border={'2px solid #dddddd'}>
                 <Th border={'2px solid #dddddd'}>Title</Th>
                <Th border={'2px solid #dddddd'}>Email</Th>
				<Th border={'2px solid #dddddd'}>Message</Th>
				<Th border={'2px solid #dddddd'}>Date</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => e.message ? <Tr>
                <Td border={'2px solid #dddddd'}>{e.title}</Td>
                	<Td border={'2px solid #dddddd'}>{e.email}</Td>
				<Td border={'2px solid #dddddd'}>{e.message}</Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
      	</Tr> : "") : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default Comments;
