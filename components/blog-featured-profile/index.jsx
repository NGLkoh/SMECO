'use client'

import {
  Container,
  Stack,
 useMediaQuery,
  Flex,
  Box,
  ChakraProvider,
  Heading,
  Text,
  Image,
  Link,
} from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaLinkedin  } from 'react-icons/fa'; 

export default function BlogFeaturedProfile({profile, name}) {
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
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
            color={'white'}
            fontWeight={600}
            fontSize={{ base:  '2xl'  , sm: '2xl', lg: '4xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
             
                position: 'absolute',
                bottom: 1,
                left: 0,
               
                zIndex: -1,
              }}>
              Hey there, I’m {name} and Welcome to my Blog
            </Text>
          </Heading>
          <Text  color={'white'}>
          {profile? profile.description: ""}   
        </Text>
  { isLargerThan980 ? 
          <Stack color={'white'} spacing={{ base: 4, sm: 6 }} position={'relative'} direction={{ base: 'column', sm: 'row' }}>
  <Link href={profile ? profile.facebook : ""}><Image 
      src="../fb.png" 
      alt="FB Logo" 
      boxSize="30px"
    /></Link>
  <Link href={profile ? profile.instagram : ""}><Image 
      src="../IG.png" 
      alt="IG Logo" 
      boxSize="30px"
    /></Link>
  
  {/* Shopee */}
  <Link href={profile ? profile.shopee : ""}>
    <Image 
      src="https://static.vecteezy.com/system/resources/previews/028/766/369/non_2x/shopee-icon-symbol-free-png.png" 
      alt="Shopee Logo" 
      boxSize="30px"
    />
  </Link>

  {/* Lazada */}
  <Link href={profile ? profile.lazada : ""}>
    <Image 
      src="https://safetyware.com/wp-content/uploads/2022/03/Lazada-Icon-Circle.png" 
      alt="Lazada Logo" 
      boxSize="30px"
    />
  </Link>

  {/* TikTok */}
  <Link href={profile ? profile.tiktok : ""}>
    <Image 
      src="../tiktok.png" 
      alt="TikTok Logo" 
      boxSize="30px"
    />
  </Link>
</Stack>

  : 
        <Flex
  color="white"
  spacing={{ base: 4, sm: 6 }}
  position="relative"
  direction="row"
m="auto"
  align="center" // Vertically center items
  gap={4} // Add spacing between items
>
  <Link href={profile ? profile.facebook : ""}>
    <Image
      src="../fb.png"
      alt="FB Logo"
      boxSize="30px"
    />
  </Link>
  <Link href={profile ? profile.instagram : ""}>
    <Image
      src="../IG.png"
      alt="IG Logo"
      boxSize="30px"
    />
  </Link>

  {/* Shopee */}
  <Link href={profile ? profile.shopee : ""}>
    <Image
      src="https://static.vecteezy.com/system/resources/previews/028/766/369/non_2x/shopee-icon-symbol-free-png.png"
      alt="Shopee Logo"
      boxSize="30px"
    />
  </Link>

  {/* Lazada */}
  <Link href={profile ? profile.lazada : ""}>
    <Image
      src="https://safetyware.com/wp-content/uploads/2022/03/Lazada-Icon-Circle.png"
      alt="Lazada Logo"
      boxSize="30px"
    />
  </Link>

  {/* TikTok */}
  <Link href={profile ? profile.tiktok : ""}>
    <Image
      src="../tiktok.png"
      alt="TikTok Logo"
      boxSize="30px"
    />
  </Link>
</Flex>
 }
        </Stack>
      </Stack>
    </Container>
</ChakraProvider>
  )
}

