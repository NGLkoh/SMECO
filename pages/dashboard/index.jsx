
'use client'

import React, {useState, useEffect} from 'react'
import {SidebarWithHeader}  from '../../components/sidebar'
import {Box, Text, ChakraProvider, Grid, GridItem, Image,useColorModeValue, Input, Flex, CardBody, Spacer , Button, Stack, StackDivider , useToast, position } from '@chakra-ui/react'
import { FaGoogle} from 'react-icons/fa'; 
import CaptionCarousel from '../../components/carousel'; 
import axios from "axios";
import  {getCookiesData} from '../../lib/getCookieData'
import { FiServer, FiMessageCircle, fiClose} from 'react-icons/fi'
import { FaTimes} from 'react-icons/fa'
import io from 'socket.io-client'

let socket;
const Dashboard = () => {
   const [open, setOpen] = useState(false)
  useEffect(() => {
   socketInitialize()
  }, []);

	const socketInitialize = async () => {
			await fetch('/api/connection/socket')
	}
     
   const handleOpen  = () => {
		

   } 
 
   return (<Box><ChakraProvider>
      <Box width={'100%'} height={'100%'} w={'100%'} position={'relative'} minHeight="100vh">
		<Box  height={'100%'}>
		<Box width={'100%'} height={"100%"} minHeight="100vh" margin={'auto'}>
		<Box w={'100%'} height={"100%"} minHeight="100vh">
        <SidebarWithHeader />
	  </Box>
      </Box>
    </Box>
  </Box>
</ChakraProvider>
</Box>)

}

export default Dashboard