'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  ChakraProvider,
  Heading,
  Text,
  Image,
  Link,
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin  } from 'react-icons/fa'; 

export default function BlogFeaturedProfile({profile, name}) {
  return (
<ChakraProvider>
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
       
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
       
          <Box
            position={'relative'}
            height={'300px'}
            width={'full'}
            overflow={'hidden'}>
    
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                profile ? `https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${profile.fileName}` : ""
              }
            />
          </Box>
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '1xl', sm: '2xl', lg: '4xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
             
                position: 'absolute',
                bottom: 1,
                left: 0,
               
                zIndex: -1,
              }}>
               Hey there, I’m {name} and welcome to my Blog
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          {profile? profile.description: ""}   
        </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
				<Link href={profile ? profile.facebook : ""}><FaFacebook/></Link>
                <Link href={profile  ? profile.twitter : ""}><FaTwitter/></Link>
                <Link href={profile  ? profile.instagram : "" }><FaInstagram/></Link>
                <Link href={profile  ? profile.linkIn : ""}><FaLinkedin/></Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
</ChakraProvider>
  )
}

