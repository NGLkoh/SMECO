
import React, { useEffect, useState } from 'react';
import { Box, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td, Button , useToast } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';

const CommentsAdmin = ({user}) => {
  const [event, setComment] = useState([]);
  const toast = useToast()
  useEffect(() => {
    getComment()
  }, []);


  const getComment = async () => {
    setComment([])
    try {
      const res = await axios.post('/api/template/all')
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

  const handleDelete = async(data) => {
		try { 
		await axios.post('/api/comment/remove', {
						"id": data._id ,
			})
			toast({
					title: 'Comment Deleted Succces',
					status: 'success',
					position: 'top-right',
					duration: 9000,
					isClosable: true,
					})
       getComment()
		}  catch (e) { 
           	toast({
			title: 'Comment Not Succces',
			status: 'warning',
			position: 'top-right',
			duration: 9000,
			isClosable: true,
			})
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
                <Td>	<Button
							bg={'black'} variant='solid'
							color={'#ffffff'}
							size={'md'}
							mr={4}
							onClick={() => handleDelete(e)}
							>
							Delete
							</Button></Td>
      	</Tr> : "") : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default CommentsAdmin;
