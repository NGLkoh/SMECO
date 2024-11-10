'use client'

import React from 'react'
import {Box, Text,ChakraProvider,  Grid, GridItem, Image, CardHeader, Heading, CardBody, Card, Button, Stack, StackDivider } from '@chakra-ui/react'
import BasicStatistics from '../stats/index'
import ContainerGraph from '../graph/index'
const AdminDashboard = ({user}) => {
   return (<ChakraProvider>
      <Box>
	   <BasicStatistics/>
  </Box>
   <Box>
	   <ContainerGraph/>
  </Box>
</ChakraProvider>)
}

export default AdminDashboard