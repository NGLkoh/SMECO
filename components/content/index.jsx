'use client';

import React from 'react';
import { Box, Text, ChakraProvider, Grid, Image, useMediaQuery, extendTheme } from '@chakra-ui/react';

// Extend Chakra's default theme for custom breakpoints
const customTheme = extendTheme({
  breakpoints: {
    sm: "320px",
    md: "768px", // Tablet
    lg: "980px", // Small Laptop
    xl: "1280px", // Larger Screens
  },
});

const Content = () => {
  // Define media queries for tablet and laptop breakpoints
  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 979px)');
  const [isLaptop] = useMediaQuery('(min-width: 980px) and (max-width: 1279px)');
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  return (
    <ChakraProvider theme={customTheme}>
      {/* Outer Container with Left and Right Padding */}
      <Box
        paddingLeft={isLaptop || isLargerThan1280 ? "15%" : isTablet ? "10%" : "5%"}
        paddingRight={isLaptop || isLargerThan1280 ? "15%" : isTablet ? "10%" : "5%"}
        width="100%"
        backgroundColor="white"
      >
        <Box width={'100%'} height={'auto'} position={'relative'}>
          {/* Top Banner Section */}
          <Box margin="auto" p={4}>
            <Grid
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={6}
              paddingLeft={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
              paddingRight={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
              paddingTop={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
            >
              <Box>
                <Text fontSize={isLaptop || isLargerThan1280 ? '50px' : isTablet ? '40px' : '30px'} mb={2}>
                  Who Are We?
                </Text>
                <Text
                  fontSize={isLaptop || isLargerThan1280 ? '35px' : isTablet ? '28px' : '25px'}
                  fontWeight={600}
                  textAlign="justify"
                >
                  Our Member Network is Committed to Learning and Helping Each Other Succeed
                </Text>
              </Box>

              <Box>
                <Text
                  mt={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
                  fontSize={isLaptop || isLargerThan1280 ? 20 : isTablet ? 18 : 16}
                  textAlign="justify"
                >
                  Cavite Association of Producers and Entrepreneurs is a high-quality support
                  network of entrepreneurs with like-minded leaders from different municipalities of
                  Cavite. We aim to help entrepreneurs achieve their full potential through the
                  power of life-enhancing connections, shared experiences, and collaborative
                  learning.
                </Text>
              </Box>
            </Grid>
          </Box>

          <Box mt={4} width="100%" margin="auto">
            <Image
              src={isTablet ? 'about-us-banner-tablet.png' : isLaptop || isLargerThan1280 ? 'about-us-banner.png' : 'about-us-banner-mobile.png'}
              alt="About Us Banner"
              objectFit="cover"
              height="100%"
              width="100%"
              border="2px solid"
              borderColor="black"
              borderRadius={15}
            />
          </Box>

          <Box mt={6}>
            <Text
              mt={isLaptop || isLargerThan1280 ? 4 : 0}
              fontSize={isLaptop || isLargerThan1280 ? 20 : isTablet ? 18 : 16}
              textAlign="center"
            >
              Gain access to the country's top experts in social entrepreneurship. Grow beyond our
              personal limits. Make breakthroughs as redefine and realize your goals in life and in
              business. To help entrepreneurs achieve their full potential. Enable transformational
              growth in our members' lives.
            </Text>
          </Box>
          <br />
          <br />

          <Box margin="auto" p={4}>
            <Grid
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={6}
              paddingLeft={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
              paddingRight={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
              paddingTop={isLaptop || isLargerThan1280 ? 20 : isTablet ? 10 : 5}
            >
              <Box>
                <Text fontSize={isLaptop || isLargerThan1280 ? '50px' : isTablet ? '40px' : '30px'} mb={2}>
                  Our Ambition
                </Text>
                <Text
                  mt={4}
                  fontSize={isLaptop || isLargerThan1280 ? 20 : isTablet ? 18 : 16}
                  textAlign="justify"
                >
                  We are connected and we are better for knowing one another. Our members thrive
                  and grow during pandemic because of the connections we make and the relationships
                  we develop. CAPE creates a space where members can have real conversations and
                  learn from one another by sharing their experiences, successes and failures.
                  <br />
                  <br />
                  CAPE provides the infrastructure and support for our members to grow together.
                  Our ambition relates to our goal of enabling members to 10X the achievement of
                  their goals in life and business. Members measure their own transformation in
                  different ways. For some, it may be delivering a measurable shift in business
                  performance, while for others it may be a personal transformation. The important
                  thing is that the impact is real and makes a big difference.
                </Text>
              </Box>

              <Box>
                <Text fontSize={isLaptop || isLargerThan1280 ? '50px' : isTablet ? '40px' : '30px'} mb={2}>
                  Our Core Values
                </Text>
                <Text
                  mt={4}
                  fontSize={isLaptop || isLargerThan1280 ? 20 : isTablet ? 18 : 16}
                  textAlign="justify"
                >
                  C - Committed to delivering our best in all we do, maintaining honesty,
                  integrity, and quality in products, services, and community involvement.
                  <br />
                  <br />
                  A - Authentic, practicing truthfulness and dependability, with a passion for
                  global competitiveness and business integrity.
                  <br />
                  <br />
                  P - Progressive, thinking beyond the present, acting with urgency to meet the
                  needs of customers and members, and inspiring others toward success.
                  <br />
                  <br />
                  E - Enterprising, always innovating and improving processes, products, and
                  relationships to create a better life for all.
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Content;
