'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaEye } from 'react-icons/fa'; 
import React from 'react'
const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = (props) => {
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

const AddNewSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (	
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize={'xl'} fontWeight={'600'}>Create Blog</Box>
          </HStack>
          <Flex alignItems={'center'}>
			
		    <Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}>
              Publish
            </Button>

			<Button
              variant={'solid'}
              bg={'#ffffff'}
			  border={'1px solid #000000'}
			  size={'md'}
			  borderRadius={6}
              mr={4}>
              Schedule post
            </Button>

			<Button
              bg={'#FFD050'} variant='solid'
              size={'md'}
		      color={'#ffffff'}
              mr={4}
			  leftIcon={<FaEye />}>
              Preview Page
            </Button>
           
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
	  
      <Box p={4}>
			

      </Box>
    </>
  )
}


export default  AddNewSection