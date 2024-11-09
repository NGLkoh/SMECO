'use client'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import {
  Box,
  Heading,
  Image,
  Text,
  Link,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
   ChakraProvider,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react'
import { base } from 'framer-motion/client'

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

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

const FeaturedSecond = () => {
  const [templateState, setTemplateState] = useState()

 useEffect(() => {
      getTemplate()
	}, [])

    const getTemplate = async () => {
         const res = await axios.post('/api/template/searchAll')
	      setTemplateState(res.data.result)
	
   }

  const GetUsers = async ({ids, date}) => {
        //  const res = await axios.post('/api/users/usersById', {id :  id})
	    //  console.log(res)
         return <BlogAuthor name={ids ? 'title': ""} date={new Date(date)} />
   }

  return (
 <ChakraProvider>
    <Container maxW={'7xl'} p="12">
       
      <Heading as="h2" fontSize={ { base: 'l', sm: 'md' , lg: '2xl'}}>All posts</Heading>
       {
             templateState?   templateState.map(row => (
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
                  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
          <BlogTags tags={['Engineering']} />
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book.
          </Text>
          {/* { row.ids ? <GetUsers ids={row.ids} date={row.date}/> : "" } */}
        </Box>
      </Box>    </Link>) ) : ""
        }
      

    </Container>
 </ChakraProvider>
  )
}

export default FeaturedSecond