
'use client'

import React, {useState, useEffect} from 'react'
import {Box, Text, ChakraProvider, Grid, Textarea, Avatar,useColorModeValue, Input, Flex, CardBody, Spacer , Button, Stack, StackDivider , useToast, position } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import axios from 'axios'
import { CSS }  from './style'
import io from 'socket.io-client'

let socket;

const BlogClient = () => {
	const [template, setTemplateState] = useState<any>([]) 
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
useEffect(() => {
      fetchIntialBlog()
      socketInitialize()
      fetchIntialComment()
}, [])


const socketInitialize = async () => {
        // await fetch('/api/connection/socket')
        // socket = io()
        // socket.on('connect', () => {
        //      console.log('connected')
        // })
}

const fetchIntialBlog = async() => {
	let params = window.location.href.split('/')
  const res = await axios.post('/api/template/template', {id: params[4]})
	   setTemplateState(res.data.result)
		console.log(res)
  }

 const fetchIntialComment = async() => {
	let params = window.location.href.split('/')
  const res = await axios.post('/api/comment/search', {id: params[4]})
	   setComments(res.data.result)
		console.log(res , "TEST")
  }
  
  const handleSaveComment = async () => {
	  const res = await axios.post('/api/comment/create', { id : template[0]._id, message: comment })
      console.log("TANGIOANASDADASSD" , res)
      setComment('')
  }

   return (<Box><ChakraProvider>
    <CSS>
     <Navbar page='homepage' />
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} className='client' minHeight="100vh" margin={'auto'} padding={20}>
        {template.map((row:any) =>   <div key={row.title} dangerouslySetInnerHTML={{__html:row.data}} />)}
		
      </Box>
    </Box>
  </Box>
     <Box padding={20} position={'relative'}>
		<Textarea
			value={comment}
			onChange={(e) => setComment(e.target.value)}
			border={'2px solid #000000'}
			padding={4}
			placeholder='Add a Comment '
			size='xl'
		/>
          <Button cursor={'pointer'} onClick={(e) => handleSaveComment()} mt={2} top={'-54px'} position={'relative'} left={'89%'} background={'#232436'} color={'white'} width={'10%'}> Post</Button>
           { 
              comments.map((e:any)=> (<Box mb={2}  key={e._id} border={'2px solid #e0e0e0'} p={4}> 
           	<Avatar name={`Anonymuse`} /> Anonymuse
            <Text pl={14} position={'relative'} bottom={'26px'} left={'-3px'}> {e.message} </Text></Box>
              ))
            }
           </Box>
  	<Footer/>
</CSS>
</ChakraProvider>
</Box>)

}

export default BlogClient