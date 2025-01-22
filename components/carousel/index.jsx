'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Button,
  Container,
useMediaQuery,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { useRouter } from 'next/router'; // Import Next.js router for navigation

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};



export default function CaptionCarousel() {
  const [slider, setSlider] = useState();
  const router = useRouter(); // Use Next.js router for programmatic navigation

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const cards = [
    {
      title: 'SMECO Protects your Privacy',
      text: "SMECO respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information in compliance with the Philippine Data Privacy Act of 2012",
      image:
        'https://www.freepik.com/free-photos-vectors/pastel-yellow-background',
      link: '/privacy-policy', // Define the link here
    },
    {
      title: 'Who Are We?',
      text: "Cavite Association of Producers and Entrepreneurs is a high-quality support network of entrepreneurs with like-minded leaders from different municipalities of Cavite.",
      image:
        'https://www.freepik.com/free-photos-vectors/pastel-yellow-background',
      link: '/about-us', // Define the link here
    },
    {
      title: 'Our Ambition',
      text: " CAPE creates a space where members can have real conversations and learn from one another by sharing their experiences, successes, and failures.",
      image:
        'https://www.freepik.com/free-photos-vectors/pastel-yellow-background',
      link: '/', // Define the link here
    },
  ];

  // Function to handle button click and redirect
  const handleButtonClick = (link) => {
    router.push(link); // Use Next.js router to navigate to the specified link
  };

  return (
    <Box position="relative" height="600px" width="full" overflow="hidden" borderLeft={0} borderRadius="16px" >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(-100%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="30px" />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(100%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="30px" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height="6xl"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            borderRadius="16px"
            borderLeft="0px"
          >
            <Container
              size="container.lg"
              height="600px"
              position="relative"
              overflow="hidden"

            >
              <Stack
                spacing={6}
                w="full"
                maxW="lg"
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Box
                  bg="white"
                  p={12}
                  marginLeft={isLargerThan980 ? "8" : "6"}
                  maxWidth="80%"
                  borderRadius={12}
                  boxShadow="lg"
                  borderLeft="0"
                  color="black"
                >
                  <Heading
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mb={4}
                    textAlign="left"
                  >
                    {card.title}
                  </Heading>
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="justify">
                    {card.text}
                  </Text>
                  <Box mt={4} textAlign="justify">
                    <Button
                     
                      bg="black"
                      color="white"
                      _hover={{ bg: 'gray.700' }}
                      borderRadius={12}
                      borderLeft="0"
                      onClick={() => handleButtonClick(card.link)} // Use the dynamic link
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
