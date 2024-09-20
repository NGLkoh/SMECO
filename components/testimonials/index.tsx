import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  IconButton,
  Divider,
  Container,
  useColorModeValue
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TestimonialSection = () => {
  return (

    <Container width={'100%'} height={'auto'} w={'100%'} position={'relative'} >
      <HStack align="stretch" spacing={8}>
        {/* Left Section */}
        <VStack align="flex-start" flex="1" spacing={4}>
          <Text fontSize="sm" color="gray.500" fontWeight="bold">
            TESTIMONIALS
          </Text>
          <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2">
            What people say about our blog
          </Text>
          <Text color="gray.500" fontSize="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </Text>
        </VStack>
<Box color='gray.50' />
        {/* Divider */}
        <Divider orientation="vertical" height="auto" borderColor="gray.300" />

        {/* Right Section */}
        <VStack align="flex-start" flex="2" spacing={6}>
          <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} lineHeight="1.8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          <HStack spacing={4}>
            <Avatar name="Juan Dela Cruz" src="https://bit.ly/broken-link" size="lg" />
            <VStack align="flex-start" spacing={0}>
              <Text fontWeight="bold" fontSize="md">
                Juan Dela Cruz
              </Text>
              <Text fontSize="sm" color="gray.500">
                Tagaytay City, Cavite
              </Text>
            </VStack>
          </HStack>

          {/* Navigation Arrows */}
          <HStack spacing={3}>
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Previous"
              borderRadius="full"
              bg="white"
              color="gray.800"
              boxShadow="md"
              _hover={{ bg: 'gray.200' }}
              size="lg"
            />
            <IconButton
              icon={<FaArrowRight />}
              aria-label="Next"
              borderRadius="full"
              bg="gray.800"
              color="white"
              boxShadow="md"
              _hover={{ bg: 'gray.700' }}
              size="lg"
            />
          </HStack>
        </VStack>
      </HStack>
    </Container>
  );
};

export default TestimonialSection;
