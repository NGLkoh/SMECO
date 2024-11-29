'use client'

import React, { useState, useEffect } from 'react'
import { Box, Text, ChakraProvider, Grid, Textarea, Avatar, useColorModeValue, Input, Flex, CardBody, Spacer, Button, Stack, StackDivider, useToast, position } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import axios from 'axios'
import { CSS } from './style'
import io from 'socket.io-client'
import GuestBlogMessage from '../../../components/messageGuestBlog/index'
import GridBlurredBackdrop from '../../../components/author'
import { FaEye } from 'react-icons/fa'; 
let socket;

const BlogClient = () => {
  const [template, setTemplateState] = useState<any>([])
  const [comment, setComment] = useState("")
  const [userId, setUserId] = useState()
  const [comments, setComments] = useState([])
  const [profile, setProfile] = useState([])

  useEffect(() => {
    fetchIntialBlog()
    socketInitialize()
    fetchIntialComment()
  }, [])

  const socketInitialize = async () => {
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    const resfresh = () => {
      fetchIntialComment()
    }

    socket.on("refresh-comment", resfresh);
  }

  const fetchIntialBlog = async () => {
    let params = window.location.href.split('/')
    const res = await axios.post('/api/template/template', { id: params[4] })
    console.log(res.data.result[0].ids, "userId")
    const prof = await axios.post('/api/users/usersById', { id: res.data.result[0].ids })
    console.log({ ...prof.data.result[0].profile[0], name: `${prof.data.result[0].firstName} ${prof.data.result[0].lastName}` }, "user details")
    setProfile({ ...prof.data.result[0].profile[0], name: `${prof.data.result[0].firstName} ${prof.data.result[0].lastName}`, id: prof.data.result[0]._id })
    setUserId(res.data.result[0].ids)
    setTemplateState(res.data.result)
    console.log(res)
  }

  const fetchIntialComment = async () => {
    let params = window.location.href.split('/')
    const res = await axios.post('/api/comment/search', { id: params[4] })
    setComments(res.data.result)
  }

  const handleSaveComment = async () => {
    socket = io()
    const res = await axios.post('/api/comment/create', { id: template[0]._id, message: comment })
    socket.emit('add-comment', { result: res })
    setComment('')
  }

  return (
    <Box>
      <ChakraProvider>
        <GuestBlogMessage userId={userId} />
        <CSS>
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
                {template.map((row: any) => (
                  <Box paddingLeft={'200px'} paddingRight={'200px'}> <div key={row.title} dangerouslySetInnerHTML={{ __html: row.data }} /> </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box padding={20} position={'relative'} paddingLeft={'200px'} paddingRight={'200px'}>

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              border={'2px solid #000000'}
              padding={4}
              placeholder='Add a Comment '
              size='xl'
            />
            <Button
              cursor={'pointer'}
              onClick={(e) => handleSaveComment()}
              mt={2}
              top={'-54px'}
              position={'relative'}
              left={'89%'}
              background={'#232436'}
              color={'white'}
              width={'10%'}
            >
              Post
            </Button>
            <GridBlurredBackdrop profile={profile} />
            {
              comments.map((e: any) => (
                <Box mb={2} key={e._id} border={'2px solid #e0e0e0'} p={4}>
                  <Avatar name={`Anonymuse`} /> Anonymous
                  <Text pl={14} position={'relative'} bottom={'26px'} left={'-3px'}> {e.message} </Text>
                </Box>
              ))
            }
          </Box>
          <Footer />
        </CSS>
      </ChakraProvider>
    </Box>
  )
}

export default BlogClient
