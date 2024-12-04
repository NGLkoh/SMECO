import React from 'react';
import { Box, Flex, Text, Input, Button, Link, HStack, useMediaQuery, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Grid, GridItem } from '@chakra-ui/react'

const DetailFooter = () => {
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  return (

    <Box as="footer" backgroundColor={'#232436'} color="white" py={30}>

   {/* Right Section - Links */}
<Box maxW="1200px" mx="auto" px={4} paddingBottom={20}>
          <Flex justify={["center", "flex-end"]} align="center" paddingRight={0} >
            <HStack spacing={20}>
              <Link href="/../homepage">Home</Link>
              <Link href="/../blog">Blog</Link>
              <Link href="/../about-us">About us</Link>
              <Link href="/../contact-us">Contact us</Link>
              <Link href="/../privacy-policy">Privacy Policy</Link>
            </HStack>
          </Flex>
</Box>
      {/* Subscribe Section */}
      <Box bg="#2e303f" py={isLargerThan980 ? 100 : 20} height={isLargerThan980 ? 'auto' : '200px'} px={isLargerThan980 ? 100 : 20} maxW="1200px" mx="auto" mb='80px'>
       <Box className='continer-footer'>
		<Grid
		h='70px'
		templateColumns='repeat(5, 2fr)'
		gap={4}
        display={isLargerThan980 ? 'flex' : 'block !important'}
        textAlign={'center'}
         
		>
	    <GridItem colSpan={3} display={isLargerThan980 ? 'flex' : 'block !important'}>
			<Flex direction="column" align="center" maxW="1200px" mx="auto" display={isLargerThan980 ? 'flex' : 'block !important'}>
				<Text fontSize={isLargerThan980 ? '2em' : '24px' } fontWeight="bold" textAlign="left" mb={4} paddingLeft={40}>
					Subscribe to our newsletter to get latest updates and news
				</Text>
				
				</Flex>
		</GridItem>
  
		<GridItem colSpan={2} paddingLeft={isLargerThan980 ? '' : 60} mt={10} paddingRight={isLargerThan980 ? '50' : '' } textAlign={'center'} display={isLargerThan980 ? 'flex' : 'block'}>
				<InputGroup>
					<Input
					placeholder="Enter Your Email"
					bg="white"
					borderColor="gray.600"
					_placeholder={{ color: 'gray.400' }}
					color="white"
					_hover={{ borderColor: 'gray.500' }}
					size={'sm'}
                    p={10}
					/>
				
					<Button  ml={2} backgroundColor={'#ffcf4f'} color="black" size={'lg'}
                    p={10}  onClick={(e) => {
			window.location.href = "mailto:bdmpkitsolution24@gmail.com";
			e.preventDefault();
		}}>Subscribe</Button>
				
				</InputGroup>
			</GridItem>
		</Grid>
        </Box>
      </Box>
      {/* Footer Information */}
      <Box maxW="1200px" mx="auto" px={4} mt={10}>
          <Box>
            <Text>InBox FoodHub, Bayan Luma 8, Emilio Aguinaldo Hi-way, City of Imus</Text>
          </Box>
          
       
       

        {/* Social Media Icons */}
        <Flex justify={["center", "space-between"]} align="center" mt={8}>
          <Text fontSize="sm" textAlign="left">© 2024 Cavite Association of Producers & Entrepreneurs - CAPE. All rights reserved.</Text>
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FaFacebookF />}
              colorScheme="gray"
              variant="ghost"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter />}
              colorScheme="gray"
              variant="ghost"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram />}
              colorScheme="gray"
              variant="ghost"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              colorScheme="gray"
              variant="ghost"
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailFooter;
