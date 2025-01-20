
import React, { useEffect, useState } from 'react';
import { Box, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import axios from 'axios';
const Subscribe = ({user}) => {
  const [subscribes , setSubscribe] = useState()

  useEffect(() => {
    fetchSubscribe()
  }, []);

  const fetchSubscribe = async () => {
      let res = await axios.post('/api/subscribe/all');
    console.log(res.data.result, "TESTSSs")
      setSubscribe(res.data.result)
  }


  return (
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		  <Box fontSize={'xl'} fontWeight={'600'}>List of Subscribers</Box>
		</HStack>

  
    <TableContainer mt={6}>
     	<Table variant='simple' border={'2px solid #dddddd'}>
			<Thead border={'2px solid #dddddd'}>
			<Tr border={'2px solid #dddddd'}>
                <Th border={'2px solid #dddddd'}>Email</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          subscribes ?  subscribes.map(e => e.email ? <Tr key={e._id}>
                	<Td border={'2px solid #dddddd'}>{e.email}</Td>
      	</Tr> : "") : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
     
     </Box>
  );
};

export default Subscribe;
