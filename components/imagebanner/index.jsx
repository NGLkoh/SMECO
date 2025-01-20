'use client';

import { Box, Flex, Image, Text, Heading, Link, useMediaQuery } from '@chakra-ui/react';
import LazyLoad from 'react-lazyload';
const ImageBanner = () => {
  // Use Chakra's useMediaQuery hook to detect screen size
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');

  return (
    <Flex
      direction={isLargerThan980 ? 'row' : 'column'} // Switch layout direction based on screen size
      align="center"
      justify="space-between"
      bg="white"
      marginTop={-120}
      p={{ base: 6, md: 10 }}
      mx="auto"
	  pt={isLargerThan980 ? '' : 70}	
      maxW="1200px"
      borderRadius="lg"
      boxShadow="lg"
      gap={6}
    >
      {/* Left Section - Image */}
      <Box flex="1" overflow="hidden" borderRadius="lg">
        <LazyLoad height={1200}>
        <Image
          src="ollocal.JPG" // Replace with the actual image URL
          alt="Description"
          objectFit="cover"
          w="100%"
          h="auto"
          border={1}
          borderRadius={10}
          transition="transform 0.3s"
          _hover={{
            transform: 'scale(1.05)',
            border: '1',
            borderRadius: '10',
          }}
        />
    </LazyLoad>
      </Box>

      {/* Right Section - Text */}
      <Box
        flex="1"
        bg="yellow.300"
        p={50}
        borderRadius="lg"
        boxShadow="xl"
      >
        <Text fontSize={isLargerThan980 ? '50' : 30} fontWeight="bold" color="gray.600" mb={10} pr={isLargerThan980 ? '' : 15} pl={isLargerThan980 ? '' : 15}>
          Featuring Ollocal PH
        </Text>
        <Heading fontSize={isLargerThan980 ? '1.5em' : 15} mb={isLargerThan980 ? '' : 7 } color="gray.800" pb={10} pr={isLargerThan980 ? '' : 15} pl={isLargerThan980 ? '' : 15}>
          It started out as a simple idea and evolved into passion
        </Heading>
        <Text fontSize="md" color="gray.700" mb={isLargerThan980 ? '' : 20} textAlign={'justify'} pr={isLargerThan980 ? '' : 15} pl={isLargerThan980 ? '' : 15} paddingBottom={20}>
          Founded in the heart of the Philippines, Ollocal PH started with a simple yet powerful vision: to empower local businesses, artisans, and service providers by giving them a digital space to shine. Recognizing the untapped potential in neighborhoods across the country, the team behind Ollocal PH sought to create a platform that not only showcased local talents but also fostered meaningful connections between businesses and their communities.
        </Text>
        <Link
          href="/blog"
          fontSize="18px"
          fontWeight="600"
          textDecoration="none"
          bg="#ffd050"
          color="gray.800"
          px={6}
          py={3}
pr={isLargerThan980 ? '' : 15} pl={isLargerThan980 ? '' : 15}
          _hover={{ bg: '#ffd050.500', textDecoration: 'none' }}
          paddingTop="10px" 
          paddingBottom="10px"
          paddingRight="20px"
          paddingLeft="20px"
        >
          Discover More Story
        </Link>
      </Box>
    </Flex>
  );
};

export default ImageBanner;
