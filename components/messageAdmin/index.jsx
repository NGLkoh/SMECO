

'use client'

import React, { useEffect, useState} from 'react'
import {Text , Box, Input, Textarea, Button, Avatar} from '@chakra-ui/react'
import Head from 'next/head'
import axios from 'axios'
const ContactAdmin = ({user})  => {

   const [ message, setMessage] = useState([])
	useEffect(() => {
      getMessage()
	}, [])

const getMessage = async () => {
		let checking = user.ids ? user.ids : user._id
         const res = await axios.post('/api/message/search', {
				"id": checking,
			})
         
		setMessage(res.data.result)
  }

const getName = async (id) => {
        //  const res = await axios.post('/api/users/usersById', {
		// 		"id": id,
		// 	})
	    // console.log(res)
     return <Text>TITE</Text>
  }

   return (<Box margin={"auto"} p={2}>  
          
			<Box mt={2} border={"2px solid #000000"} h={'auto'} p={6} >
                 Conversation with : { message ? message[0] ?  message[0].convo.map((idN) => { } ) : "" : ""}
               			<Box mt={2} border={"2px solid #000000"} h={'400px'} p={6} >
                    {message ? message[0] ? message[0].convo.map((data) =>  <Box> <Box p={2} float={data.id === user._id ? 'right' : 'left'} mt={data.id !== user._id ? '80px' : ''} bg={data.id === user._id ? '#232536' : 'gray'} w={'auto'} color={'white'} borderRadius={6}>{data.message}</Box>     </Box>): "" : ""} 
				</Box>  
                 <Box><Textarea   mt={4} border={'1px solid gray'} placeholder='Type here .....'  /><Button bg={'#232536'}  mt={4} color={'white'} _hover={''}>Send</Button></Box>
            </Box>  
            
		</Box>
        ) 
}

export default ContactAdmin

