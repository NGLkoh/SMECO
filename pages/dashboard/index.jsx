
'use client'

import React, {useEffect} from 'react'
import {SidebarWithHeader}  from '../../components/sidebar'
import {Box,  ChakraProvider } from '@chakra-ui/react'

const Dashboard = () => {

  useEffect(() => {
   socketInitialize()
  }, []);

	const socketInitialize = async () => {
			await fetch('/api/connection/socket')
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