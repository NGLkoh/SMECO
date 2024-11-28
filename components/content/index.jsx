'use client';

import React from 'react';
import { Box, Text, ChakraProvider, Grid, GridItem, Image, Button, Stack, StackDivider, Heading } from '@chakra-ui/react';
import { BsJustify } from 'react-icons/bs';

const Content = () => {
   return (
      <ChakraProvider>

         <Box width={'100%'} height={'auto'} position={'relative'} backgroundColor={'#f4f0f8'} padding="0 10%">
            {/* Top Banner Section */}

		<Box margin={"auto"} p={4}>
			<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}  paddingLeft={20}  paddingRight={20}  paddingTop={10} >
				<Box>
					<Text fontSize='50px' mb={2}>Who Are We?</Text>
					<Text size="50px" fontSize='35px' fontWeight={600} text-align="justify" >
						Our Member Network is Committed to Learning and Helping Each Other Succeed
					</Text>
				</Box>
    
				<Box>
					<Text  mt={20} fontSize={20} textAlign= 'justify'>
						Cavite Association of Producers and Entrepreneurs is a high-quality support network of entrepreneurs with like-minded leaders from different municipalities of Cavite. We aim to help entrepreneurs achieve their full potential through the power of life-enhancing connections, shared experiences, and collaborative learning.
					</Text>
				</Box>
			</Grid>
		</Box>

		<Box width="100%" height="450px" margin="auto">
               <Image
                  src="about-us-banner.png"  // Make sure the image path is correct for your setup
                  alt="About Us Banner"
                  objectFit="cover"
                  height="100%"
                  width="100%"
               />
         </Box>

						
			<br></br>	<br></br>	
    <Box>
		<Text  mt={4} fontSize={22} textAlign= 'center'>
		Gain access to the country's top experts in social entrepreneurship. Grow beyond our personal limits. Make breakthroughs as redefine and realize your goals in life and in business. To help entrepreneurs achieve their full potential. Enable transformational growth in our members' lives.
      </Text>
    </Box>
	<br></br>
	<br></br>

	<Box margin={"auto"} p={4}>
		<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}  paddingLeft={20}  paddingRight={20}  paddingTop={10} paddingBottom={10}>
			<Box>
				<Text fontSize='50px' mb={2}>Our Ambition</Text>
					<Text  mt={4} fontSize={20} textAlign= 'justify'>
					We are connected and we are better for knowing one another. Our members thrive and grow during pandemic because of the connections we make and the relationships we develop.
					CAPE creates a space where members can have real conversations and learn from one another by sharing their experiences, successes and failures. As individuals, as members, we are invested in one another’s growth and success. 
					<br></br>	<br></br>	
					CAPE provides the infrastructure and support for our members to grow together. Our ambition relates to our goal of enabling members to 10X the achievement of their goals in life and business. Members measure their own transformation in different ways. For some, it may be delivering a measurable shift in business performance, while for others it may be a personal transformation. The important thing is that the impact is real and makes a big difference.

				</Text>
			</Box>
    
		<Box>
			<Text fontSize='50px' mb={2}>Our Core Values
			</Text>
				<Text  mt={4} fontSize={20} textAlign= 'justify'>
				C - Committed to delivering our best in all we do, maintaining honesty, integrity, and quality in products, services, and community involvement. <br></br><br></br>
				A - Authentic, practicing truthfulness and dependability, with a passion for global competitiveness and business integrity. <br></br><br></br>
				P - Progressive, thinking beyond the present, acting with urgency to meet the needs of customers and members, and inspiring others toward success.<br></br><br></br>
				E - Enterprising, always innovating and improving processes, products, and relationships to create a better life for all.
				</Text>
		</Box>
  </Grid>
</Box>






         </Box>
      </ChakraProvider>
   );
};

export default Content;
