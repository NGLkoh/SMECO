'use client'

import React, { useState, useEffect } from 'react'
import { Box, Text, ChakraProvider, Image, Textarea, Avatar, Input, Button, useToast, useMediaQuery } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import axios from 'axios'
import ReactSearchBox from "react-search-box";

import GuestBlogMessage from '../../../components/messageGuestBlog/index'
import '../../../resources/css/style.css'
	
const BlogClient = () => {

  const [comments, setComments] = useState([])

  const toast = useToast()

  useEffect(() => {
    fetchIntialComment()
  }, [])

  const fetchIntialComment = async () => {
    let params = window.location.href.split('/')
   try{ 
     const res = await axios.post('/api/comment/search', { id: params[4] })
    setComments(res.data.result)
    } catch(e) { console.log(e)}
  
  }


  return (
    <Box className='client-blog'>
      <ChakraProvider>
        
          <Navbar page='homepage' />
          <Box
            width={'100%'}
            height={'100%'}
            w={'100%'}
            position={'relative'}
            minHeight="100vh"
          >
            <Box height={'100%'}>
              {/* Add padding for left and right */}
              <Box
                width={'100%'}
                height={"100%"}
                className='client'
                minHeight="100vh"
                margin={'auto'}
                paddingY={20} // Top and bottom padding
                paddingX={8}  // Left and right padding
              >
             
           <ReactSearchBox
				placeholder="Search for John, Jane or Mary"
				data={[
					{
					key: "john",
					value: "John Doe"
					},
					{
					key: "jane",
					value: "Jane Doe"
					},
					{
					key: "mary",
					value: "Mary Phillips"
					},
					{
					key: "robert",
					value: "Robert"
					},
					{
					key: "karius",
					value: "Karius"
					}
				]}
				onSelect={(record) => console.log(record)}
				onFocus={() => {
					console.log("This function is called when is focussed");
				}}
				onChange={(value) => console.log(value)}
				autoFocus
				leftIcon={<>🎨</>}
				iconBoxSize="48px"
				/>
              </Box>
            </Box>
          </Box>
      
      </ChakraProvider><Footer />
    </Box>
  )
}

export default BlogClient
