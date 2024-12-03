'use client'

import React from 'react'
import {Image , Box} from '@chakra-ui/react'

const ImageBanner = () => {
   return (
      <Box width={'100%'} height={'auto'} w={'100%'} position={'relative'} backgroundColor={'#f4f0f8'} p={20}>
       <Box width={'80%'}  margin={'auto'}  position={'relative'} p={'10%'}> 
        <Image margin={'auto'} height={'auto'}  position={'relative'} width={'auto'} src={'special_post.png'} bgRepeat={'no-repeat'}/>
    </Box> </Box>) 
}

export default ImageBanner