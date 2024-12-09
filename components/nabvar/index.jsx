'use client'

import {
  Box,
  Flex,
  Avatar,
  Image,
  HStack,
  ChakraProvider,
  IconButton,
  Text,
  InputGroup,
  Input,
 InputRightElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link
} from '@chakra-ui/react'

import ReactSearchBox from "react-search-box";
import '../../resources/css/nav.css'
import { HamburgerIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

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

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ records, setRecords ] = useState([])
   useEffect(() => {
    fetchIntialSearch()
  }, [])

  const fetchIntialSearch = async() => {
  const search =  await axios.post('/api/search/all')
         console.log(search.data.result)
      let res = search.data.result
     res.map(row =>   setRecords(oldState => [...oldState, {key: row.title, value: `${row.title} : ${row.details}`, link: row.link}]))
   
  }

  return (
      <ChakraProvider>
      <Box bg={useColorModeValue('#232536', 'gray.800')}
    color={useColorModeValue('gray.600', 'white')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon color={'white'}/>}
            aria-label={'Open Menu'}
            bg={'transparent !important'}
            color={'white'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>	  <Link href='/../homepage'> <Image src="/logo.png" className="logo" w="150px"/> </Link></Box>
          
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
               <HStack    color={'white'} as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Link href='/../homepage'> Home </Link>
                <Link href='/../blog'>Blog</Link>
                <Link href='/../about-us'>About Us</Link>
                <Link href='/../contact-us'>Contact Us</Link>
             <Box  color={'black'}	>
             <ReactSearchBox
               
				placeholder="Search Here"
				data={records}
				onSelect={(record) => { window.location.href = record.item.link}}
				onFocus={() => {
					console.log("This function is called when is focussed");
				}}
				onChange={(value) => console.log(value)}
				autoFocus
				leftIcon={<><FaSearch/></>}
				iconBoxSize="48px"
				/>
			</Box>
		
            </HStack>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
               
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}  color={'white'}>
              <NavLink  color={'white'}>  <Link href='/../homepage'> Home </Link></NavLink>
               <NavLink  color={'white'}> <Link href='/../blog'>Blog</Link></NavLink>
               <NavLink  color={'white'}> <Link href='/../about-us'>About Us</Link></NavLink>
              <NavLink  color={'white'}> <Link href='/../contact-us'>Contact Us</Link></NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
      </ChakraProvider>
  )
}