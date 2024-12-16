'use client';

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
  Link,
  Slide,
useMediaQuery,
} from '@chakra-ui/react';

import ReactSearchBox from 'react-search-box';
import '../../resources/css/nav.css';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NavLink = (props) => {
  const { children } = props;

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
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [records, setRecords] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for mobile search bar

  useEffect(() => {
    fetchInitialSearch();
  }, []);

const [isLargerThan980] = useMediaQuery('(min-width: 980px)')

  const fetchInitialSearch = async () => {
    const search = await axios.post('/api/search/all');
    let res = search.data.result;
    res.map((row) =>
      setRecords((oldState) => [
        ...oldState,
        { key: row.title, value: `${row.title} : ${row.details}`, link: row.link },
      ])
    );
  };

  return (

    <ChakraProvider>
      <Box
        bg={useColorModeValue('#232536', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        px={4}
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon color={'white'} />}
            aria-label={'Open Menu'}
            bg={'transparent !important'}
            color={'white'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box display={isSearchOpen ? 'none' : 'block'}>
              {/* Hide logo when search bar is open */}
              <Link href="/../homepage">
                <Image src="/logo.png" className="logo" w="150px" />
              </Link>
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <HStack
                color={'white'}
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                <Link href="/../homepage">Home</Link>
                <Link href="/../blog">Blog</Link>
                <Link href="/../about-us">About Us</Link>
                <Link href="/../contact-us">Contact Us</Link>
                <Box position="relative" color={'black'} width="255px" zIndex="20">
                  <ReactSearchBox
                    placeholder="Search Here"
                    data={records}
                    onSelect={(record) => {
                      window.location.href = record.item.link;
                    }}
                    onFocus={() => {
                      console.log('This function is called when is focused');
                    }}
                    onChange={(value) => console.log(value)}
                    autoFocus
                    leftIcon={
                      <>
                        <FaSearch />
                      </>
                    }
                    iconBoxSize="48px"
                    inputBoxStyles={{
                      height: '40px',
                      padding: '10px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '14px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      zIndex: '20',

                    }}
                    dropdownBoxStyles={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      position: 'absolute',
                      top: '50px',
                      width: isLargerThan980 ? '100%' : '140%',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      borderRadius: '5px',
                      zIndex: '30',
                    }}
                  />
                </Box>
              </HStack>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              ></MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
            {/* Search Icon and Mobile Search */}
            <IconButton
              icon={<FaSearch />}
              aria-label="Search"
              display={{ base: 'inline-flex', md: 'none' }}
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </Flex>
        </Flex>

<Slide direction="right" in={isSearchOpen} style={{ zIndex: 20 }}>
  <Box
    bg="#232536"
    p={4}
    w="100%"
    position="absolute"
    top="0"
    left="0"
    shadow="md"
  >
    <Flex alignItems="center" justifyContent="space-between">
      {/* Search Box */}
      <ReactSearchBox
        placeholder="Search Here"
        data={records}
        onSelect={(record) => {
          window.location.href = record.item.link;
        }}
        onFocus={() => {
          console.log('This function is called when is focused');
        }}
        onChange={(value) => console.log(value)}
        autoFocus
        inputBoxStyles={{
          height: '40px',
          padding: '10px 15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%', // Full width for mobile
        }}
      />
      {/* Close Button */}
      <IconButton
        icon={<CloseIcon />}
        aria-label="Close Search"
        size="sm"
        onClick={() => setIsSearchOpen(false)}
        variant="ghost"
        ml={2} // Add spacing between search box and button
      />
    </Flex>
  </Box>
</Slide>


        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} color={'white'}>
              <NavLink color={'white'}>
                <Link href="/../homepage">Home</Link>
              </NavLink>
              <NavLink color={'white'}>
                <Link href="/../blog">Blog</Link>
              </NavLink>
              <NavLink color={'white'}>
                <Link href="/../about-us">About Us</Link>
              </NavLink>
              <NavLink color={'white'}>
                <Link href="/../contact-us">Contact Us</Link>
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </ChakraProvider>
  );
}
