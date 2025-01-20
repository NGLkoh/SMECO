'use client';

import React from 'react';
import {
  Box,
  Text,
  ChakraProvider,
  Grid,
  Image,
  useMediaQuery,
  extendTheme,
  Center,
} from '@chakra-ui/react';

// Custom breakpoints for responsiveness
const customTheme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '980px',
    xl: '1280px',
  },
});

const Content = () => {
  // Media queries for different screen sizes
  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 979px)');
  const [isLaptop] = useMediaQuery('(min-width: 980px) and (max-width: 1279px)');
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const getPadding = () => {
    if (isLaptop || isLargerThan1280) return '15%';
    if (isTablet) return '10%';
    return '5%';
  };

  const getFontSize = (base, tablet, laptop) => {
    if (isLaptop || isLargerThan1280) return laptop;
    if (isTablet) return tablet;
    return base;
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box paddingLeft={getPadding()} paddingRight={getPadding()} bg="white">
        {/* Outer Container */}
        <Box>
          {/* Top Section */}
          <Box textAlign="center" p={2} mt={20}>
            <Text fontSize={getFontSize('30px', '40px', '50px')} mb={2} fontWeight="bold">
              Who Are We?
            </Text>
            <Text
              fontSize={getFontSize('15px', '18px', '25px')}
              fontWeight={500}
              textAlign="center"
            >
              Our Member Network is Committed to Learning and Helping Each Other Succeed
            </Text>
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
          <Image
            src={
              isTablet
                ? 'about-us-banner-tablet.png'
                : isLaptop || isLargerThan1280
                ? 'about-us-banner.png'
                : 'about-us-banner-mobile.png'
            }
            alt="About Us Banner"
            objectFit="cover"
            width="80%"
            border="2px solid black"
            borderRadius={15}
          />
        </Box>


          {/* Additional Information */}
          <Box mt={10}>
            <Text
              fontSize={getFontSize('16px', '18px', '20px')}
              textAlign="center"
              mt={4}
              lineHeight={1.6}
            >
              Gain access to the country's top experts in social entrepreneurship. Grow beyond our
              personal limits. Make breakthroughs as we redefine and realize your goals in life and
              in business.
            </Text>
          </Box>

          {/* Grid Layout for Core Sections */}
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={6}
            mt={2}
            p={{ base: '5%', md: '5%', xl: '10%' }}
          >
            <Box>
              <Text fontSize={getFontSize('30px', '40px', '50px')} mb={4} fontWeight="bold">
                Our Ambition
              </Text>
              <Text fontSize={getFontSize('16px', '18px', '20px')} textAlign="left" lineHeight={1.8}>
                We are connected and better for knowing one another. Our members thrive because of
                the connections we make and the relationships we develop. CAPE creates a space where
                members can have real conversations and share experiences, successes, and failures.
                <br />
                <br />
                Our goal is to enable members to achieve transformative growth. Whether it's
                measurable shifts in business performance or personal development, the impact is
                profound and life-changing.
              </Text>
            </Box>

            <Box>
              <Text fontSize={getFontSize('30px', '40px', '50px')} mb={4} fontWeight="bold">
                Our Core Values
              </Text>
              <Text fontSize={getFontSize('16px', '18px', '20px')} textAlign="left" lineHeight={1.8}>
                C - Commitment to excellence in all aspects, maintaining integrity and quality.
                <br />
                <br />
                A - Authenticity in being truthful and dependable, fostering trust.
                <br />
                <br />
                P - Progressiveness by inspiring innovation and urgent action for success.
                <br />
                <br />
                E - Enterprise through continuous improvement and innovative solutions.
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Content;
