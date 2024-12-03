'use client'

import React from 'react'
import {Box, ChakraProvider} from '@chakra-ui/react'
import BasicStatistics from '../stats/index'
import ContainerGraph from '../graph/index'
const ClientDashboard = ({user}) => {
   return (<ChakraProvider>
      <Box>
	   <BasicStatistics user={user}/>
  </Box>
   <Box>
	   <ContainerGraph user={user}/>
  </Box>
</ChakraProvider>)
}

export default ClientDashboard