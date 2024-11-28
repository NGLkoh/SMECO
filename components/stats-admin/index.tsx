'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'

import { ReactNode, useState, useEffect } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import axios from 'axios'
import { FaShare, FaComments, FaPodcast, FaEye, FaCreativeCommons, FaBook } from 'react-icons/fa'
interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 3, md: 3 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function BasicStatistics({user} :any) {
  const [templateState, setTemplateState] = useState<any>([])
  const [post, setPost] = useState<any>(0)
  const [comment, setComment] = useState<any>(0)
  const [usersCount, setUsers] = useState<any>(0)
   useEffect(() => {
      getTemplate()
      getUsers()
	}, [])

   const getTemplate = async () => {
       const res = await axios.post('/api/template/all')
        res.data.result.map(async (row:any) => {
            const commentRes =await axios.post('/api/comment/all')
              setComment(comment + commentRes.data.result.length)
         })
        // const res = await axios.post('/api/comment/search', {id: params[4]})
       setPost(res.data.result.length)
	   setTemplateState(res.data.result)
		console.log(res)
   }

    const getUsers = async () => {
        const user =await axios.post('/api/users/users')
        setUsers(user.data.result.length)
        
   }


  return (
    <Box  maxW="100%" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1  fontSize={'xl'} fontWeight={'bold'}>
       Interactions
      </chakra.h1>
       <chakra.h4  fontSize={'sm'} py={2}>
        Information
      </chakra.h4>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Users'} stat={usersCount} icon={<FaPodcast size={'3em'} />} />
        {/* <StatsCard title={'Profile Views'} stat={'5,000'} icon={<BsPerson size={'3em'} />} /> */}
        <StatsCard title={'Posts'} stat={post} icon={<FaBook size={'3em'} />} />
        <StatsCard title={'Comments'} stat={comment} icon={<FaComments size={'3em'} />} />
      
      </SimpleGrid>
    </Box>
  )
}