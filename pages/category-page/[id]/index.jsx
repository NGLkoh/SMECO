'use client'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import {
  Box,
  Heading,
  Image,
  Text,
  Link,
  HStack,
  Tag,
   ChakraProvider,
  Container,
  useMediaQuery,
} from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import Footer from '../../../components/footer'
const BlogTags = (props) => {
  const { marginTop = 0, tags } = props

  return ( 
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

const FeaturedSecond = () => {
  const [templateState, setTemplateState] = useState([])
  const [title, setTitle] = useState('')
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)')

 useEffect(() => {
      getTemplate()
	}, [])


    const getTemplate = async () => {
     const params = window.location.href.split('/')
     setTitle(params[4].split(',')[1])
       setTemplateState([])
         const res = await axios.post('/api/template/searchByCategoryId', {id: params[4].split(',')[0] })
         res.data.result.map(async (tem) => {
             let categoryRes
	         if(tem.category_id){
                 categoryRes  = await axios.post('/api/category/searchById', {id: tem.category_id})
                 setTemplateState(prevState => [...prevState, {...tem, category:categoryRes.data.result[0].title  } ]);
             }
         }) 
	 }

  return (
 <ChakraProvider>
       <Navbar page='homepage' />
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh" p={isLargerThan980 ? 0 : 0}>
    
    <Container maxW={'7xl'} p="12">
       
      <Heading as="h2" fontSize={ { base: 'l', sm: 'md' , lg: '2xl'}}>All posts in {title.replace('%20', " ")}</Heading>
       {
             templateState ?   templateState.map(row => (
      <Link color='black' key={row._id} href={`/blog-client/${row._id}`}>  
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
      </Box>    </Link> ) ) : " "
        }
      

    </Container>
</Box>
<Footer/>
 </ChakraProvider> )

}
  	

export default FeaturedSecond