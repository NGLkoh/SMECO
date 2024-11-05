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
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { FaShare, FaComments, FaPodcast } from 'react-icons/fa'
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

export default function BasicStatistics() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1  fontSize={'xl'} fontWeight={'bold'}>
       Interactions
      </chakra.h1>
       <chakra.h4  fontSize={'sm'} py={2}>
        Hal-hal yang perlu kamu tangani
      </chakra.h4>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Posts'} stat={'7'} icon={<FaPodcast size={'3em'} />} />
        {/* <StatsCard title={'Profile Views'} stat={'5,000'} icon={<BsPerson size={'3em'} />} /> */}
        <StatsCard title={'Share'} stat={'1,000'} icon={<FaShare size={'3em'} />} />
        <StatsCard title={'Comments'} stat={'7'} icon={<FaComments size={'3em'} />} />
      
      </SimpleGrid>
    </Box>
  )
}