'use client'

import React from 'react'
import {Box, ChakraProvider, Image} from '@chakra-ui/react'
import Head from 'next/head'

const FeaturedImage = () => {
   return ( <Box marginLeft={'auto'} marginRight={'auto'} marginBottom={16}  marginTop={16} >
		<ChakraProvider>
		<Box height={'100%'} w={'100%'}>
		<Box width={'100%'} height={'auto'} w={'100%'} position={'relative'}>
			<Box width={'100%'}  margin={'auto'}  position={'relative'} > 
				<Image margin={'auto'} height={'auto'}  position={'relative'} width={'100%'} src={'blog-post-sample.png'} bgRepeat={'no-repeat'}/>
			</Box> </Box>
        </Box></ChakraProvider> </Box>)
}

export default FeaturedImage