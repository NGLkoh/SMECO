'use client'

import React from 'react'
import {Box, ChakraProvider } from '@chakra-ui/react'
import BasicStatistics from '../stats-admin/index'
import ContainerGraph from '../graph-admin/index'

const AdminDashboard = ({user}) => {
   return (<ChakraProvider>
      <Box>
	   <BasicStatistics user={user}/>
  </Box>
   <Box>
	   <ContainerGraph user={user}/>
  </Box>
</ChakraProvider>)
}

export default AdminDashboard