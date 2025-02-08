
import React, { useEffect, useState } from 'react';
import { Box, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td,Switch, useToast } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';

const Comments = ({user}) => {
  const toast = useToast()
  const [event, setComment] = useState([]);
  useEffect(() => {
    getEvent()
  }, []);


  const getEvent = async () => {
   setComment([])
    try {
      let checking = user.ids ? user.ids : user._id
      const res = await axios.post('/api/template/search', {id: checking})
        res.data.result.map(async (row) => {
            const commentRes =await axios.post('/api/comment/search', {id: row._id})
           commentRes.data.result.map(async (w, index) => {
            let data =  [{title: row.title, ...commentRes.data.result[index]}]
            setComment(prevState => [...prevState, ...data]);
		   } )
            //   setComment(commentRes.data.result)
         })

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
    
  const handleChange = async(id, status)  => {
			try{
              if(status){   const res = await axios.post('/api/comment/updateById', {id: id, status: false})}
              else {const res = await axios.post('/api/comment/updateById', {id: id, status: true})}
              toast({
				title: 'Successfully status comment change ', 
				status: 'success',
				position: 'top-right',
				duration: 9000,
				isClosable: true,
				})
              getEvent()
            }catch(e){
        }
  }
 
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
                <Th border={'2px solid #dddddd'}>Action</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => e.message ? <Tr key={e._id}>
                <Td border={'2px solid #dddddd'}>{e.title}</Td>
                <Td border={'2px solid #dddddd'}>{e.email}</Td>
				<Td border={'2px solid #dddddd'}>{e.message}</Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
      	        <Td border={'2px solid #dddddd'}>  <Switch isChecked={e.status} onChange={() => handleChange(e._id, e.status)} id='email-alerts' /></Td></Tr> : "") : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default Comments;
