
'use client'

import React, {useState, useEffect} from 'react'
import {Box, Text, ChakraProvider, Container, HStack, Heading,Tag,  Link,useColorModeValue, Image, Flex, CardBody, Spacer , Button, Stack, StackDivider , useToast, position } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import axios from 'axios'
import { CSS }  from './style'
import io from 'socket.io-client'
import BlogFeaturedProfile from '../../../components/blog-featured-profile/index'
let socket;

const BlogClient = () => {
	const [templateState, setTemplateState] = useState<any>([]) 
    const [name, setName] = useState("")
    const [comments, setComments] = useState([])
    const [profile, setProfile] = useState()

useEffect(() => {
      fetchIntialBlog()
      fetchProfile()
}, [])

const fetchProfile = async () => {
        let params = window.location.href.split('/')
        let data = { id: params[4]}
         const res = await axios.post('/api/users/usersById', {id: params[4]})
         console.log(res.data.result[0].profile, "user details")
         setProfile(res.data.result[0].profile[0])
         setName(`${res.data.result[0].firstName} ${res.data.result[0].lastName}`)
}


const BlogTags = (props :any) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag:any) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}
const fetchIntialBlog = async() => {
	let params = window.location.href.split('/')
    console.log(params[4], "USER ID")
   setTemplateState([])
    const res = await axios.post('/api/template/search', {id: params[4]})
   res.data.result.map(async (tem :any) => {
             let categoryRes :any
	         if(tem.category_id){
                 categoryRes  = await axios.post('/api/category/searchById', {id: tem.category_id})
                 setTemplateState((prevState:any) => [...prevState, {...tem, category:categoryRes.data.result[0].title  } ]);
             }
         }) 
		console.log(res.data.result, "template")
  }

   return (<Box><ChakraProvider>
    <CSS>
     <Navbar page='homepage' />
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
     <Box width={'100%'} height={'auto'} w={'100%'} position={'relative'} backgroundSize={'cover'}  backgroundImage={'https://www.pixelstalk.net/wp-content/uploads/2016/10/Business-wallpaper-HD-Free.jpg'}>

         <BlogFeaturedProfile profile={profile} name={name}/>
       
      </Box>
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} className='client' minHeight="100vh" margin={'auto'} padding={20}>

       <Container maxW={'7xl'} p="12">
       <Heading as="h2" fontSize={ { base: 'l', sm: 'md' , lg: '2xl'}}>My Posts</Heading>
       {templateState ?   templateState.map((row:any) => (
      <Link color='teal.500' href={`/blog-client/${row._id}`}>  
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  `https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.fileName}`
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
          
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          { row.category ?  <BlogTags tags={[row.category]} />  : ""} 
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {row.title} 
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            {row.description}
          </Text>
          {/* { row.ids ? <GetUsers ids={row.ids} date={row.date}/> : "" } */}
        </Box>
      </Box>    </Link> ) ) : ""
        }
      

    </Container>
      </Box>
    </Box>
  </Box>
  	<Footer/>
</CSS>
</ChakraProvider>
</Box>)

}

export default BlogClient