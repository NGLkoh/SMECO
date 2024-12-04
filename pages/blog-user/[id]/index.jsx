
'use client'

import React, {useState, useEffect} from 'react'
import {Box, Text, ChakraProvider, Container, HStack, Heading,Tag, useMediaQuery, Link, Image } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
import axios from 'axios'
import BlogFeaturedProfile from '../../../components/blog-featured-profile/index'

const BlogClient = () => {
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
	const [templateState, setTemplateState] = useState([]) 
    const [name, setName] = useState("")
    const [profile, setProfile] = useState()
    const [profileList, setProfileList] = useState()
useEffect(() => {
      fetchIntialBlog()
      fetchProfile()
}, [])

const fetchProfile = async () => {
         const params = window.location.href.split('/')
         const res = await axios.post('/api/users/usersById', {id: params[4]})
         setProfile(res.data.result[0].profile[0])
         setProfileList(res.data.result[0].profile)
         setName(`${res.data.result[0].firstName} ${res.data.result[0].lastName}`)
}


const BlogTags = (props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
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
   res.data.result.map(async (tem) => {
             let categoryRes 
	         if(tem.category_id){
                 categoryRes  = await axios.post('/api/category/searchById', {id: tem.category_id})
                 setTemplateState((prevState) => [...prevState, {...tem, category:categoryRes.data.result[0].title  } ]);
             }
         }) 
		console.log(res.data.result, "template")
  }

   return (<Box><ChakraProvider>
     <Navbar page='homepage' />
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh" p={isLargerThan980 ? 20 : 0}>
    
        { profileList ? profileList.map((row, key) => (<Box key={key} width={'100%'} height={'auto'} w={'100%'}  position={'relative'} backgroundSize={'cover'} backgroundImage={`linear-gradient(rgb(0 0 0 / 46%), rgb(0 0 0 / 35%)), url(https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.backgroundImage})`} >

     <BlogFeaturedProfile profile={profile} name={name}/>
		</Box>)) : ""}
     
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} className='client' minHeight="100vh" margin={'auto'} >
       <Container maxW={'7xl'} p="12">
       <Heading as="h2" fontSize={ { base: 'l', sm: 'md' , lg: '2xl'}}>My Posts</Heading>
       {templateState ?   templateState.map((row, key) => (
      <Link key={key} color='teal.500' href={`/blog-client/${row._id}`}>  
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
            color={'gray.700'}
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

</ChakraProvider>	<Footer/>
</Box>)

}

export default BlogClient