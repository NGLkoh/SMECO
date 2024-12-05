'use client'

import React from 'react'
import { Box, Stack, Flex, Button, Text, VStack, ChakraProvider, Link, useMediaQuery } from '@chakra-ui/react'

const Banner = () => {
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
   return (    <ChakraProvider><Box  w={'100%'}  backgroundSize={'cover'}>
 <Flex
	  
      w={'full'}
      h={ isLargerThan980 ? '100vh' : "50vh"}
      backgroundImage={
        'url("bg1.jpg")'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={{ base: 4, md: 8 }}
         align={'flex-start'} 
     >
        <Stack maxW={isLargerThan980 ? '6xl' : '2xl'} align={'flex-start'} spacing={6}>
          <Text
            fontWeight={700}
            lineHeight={1.2}
            fontSize={{ base: '3xl', md: '8xl' }} color={'white'}>
             Elevate your business marketing game
          </Text>
          <Text
            fontWeight={700}
            lineHeight={1.2}
            fontSize={{ base: 'xl', md: '3xl' }} color={'white'}>
             "Discover innovative strategies and tools to boost your brand's visibility and engagement."
          </Text>
      
          <Stack direction={'row'}>
          
     {isLargerThan980 ? <>
            <Link href='/login'>
            <Button
              bg={'#ffd050'}
              color={'black'}
              borderRadius={0}
              w={150}
              _hover={{ bg: 'whiteAlpha.500' }}>
             Login
            </Button>
            </Link>
             <Link href='/register'>
            <Button
              borderRadius={0}
              bg={'#ffd050'}
              w={150}
              color={'black'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Join Now
            </Button>
             </Link> </>:   <Link href='/register'>
            <Button
              borderRadius={0}
              bg={'#ffd050'}
              w={150}
              color={'black'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Join Now
            </Button>
             </Link> }
          </Stack>
        </Stack>
      </VStack>
    </Flex>
    </Box></ChakraProvider>)
}

export default Banner