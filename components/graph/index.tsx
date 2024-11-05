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

export default function ContainerGraph() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1  fontSize={'xl'} fontWeight={'bold'}>
       Interactions
      </chakra.h1>
       <chakra.h4  fontSize={'sm'} py={2}>
        Hal-hal yang perlu kamu tangani
      </chakra.h4>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      
      </SimpleGrid>
    </Box>
  )
}