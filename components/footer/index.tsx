import React, {useState} from 'react';
import { Box, Flex, Text, Input, Button, Link, useToast, HStack, useMediaQuery, InputGroup, IconButton } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Grid, GridItem } from '@chakra-ui/react'
import axios from 'axios';

const DetailFooter = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const [email, setEmail] = useState("")
  const toast = useToast()
  const handleAddSubscribe = async () => {
      const checker: any = await axios.post("/api/subscribe/searchByEmail", { email : email});
      console.log(checker, "checker")
     if(checker.data.message === "true"){ 
       toast({
          title: 'Email already subscribe', 
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
     } else {
        try {
           const res = await axios.post("/api/subscribe/create", { email : email, sub : 1});
		   toast({
		      title: 'Successfully Edit your Profile ', 
		      status: 'success',
		      position: 'top-right',
		      duration: 9000,
		      isClosable: true,
		    })

        } catch(e) { console.log(e)}
      
     }
  }
 
  return (

    <Box as="footer" backgroundColor={'#232436'} color="white" py={30}>

   {/* Right Section - Links */}
<Box maxW="1200px" mx="auto" px={4} paddingBottom={20}>
          <Flex justify={["center", "flex-end"]} align="center" paddingRight={isLargerThan980 ? 0 : 26} >
            <HStack spacing={20} fontSize={ isLargerThan980  ? "" : "13px"}>
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
				<Text fontSize={isLargerThan980 ? '2em' : '15px' } fontWeight="bold" textAlign="center" mb={4} paddingLeft={20}>
					Subscribe to our newsletter to get latest updates and news
				</Text>
				
				</Flex>
		</GridItem>
  
		<GridItem colSpan={2} paddingLeft={isLargerThan980 ? '' : 28} mt={10} paddingRight={isLargerThan980 ? '50' : '' } textAlign={'center'} display={isLargerThan980 ? 'flex' : 'block'}>
				<InputGroup>
					<Input
					placeholder="Enter Your Email"
					bg="white"
					borderColor="gray.600"
                    onChange={(e) => setEmail(e.target.value)}
					_placeholder={{ color: 'gray.400' }}
					color="black!important"
					_hover={{ borderColor: 'gray.500' }}
					size={'sm'}
                    p={10}
					/>

					<Button  ml={2} backgroundColor={'#ffcf4f'} color="black" size={'lg'}
                    p={10}  onClick={(e) => handleAddSubscribe()
				    }>Subscribe</Button>
				
				</InputGroup>
			</GridItem>
		</Grid>
        </Box>
      </Box>
      {/* Footer Information */}
      <Box maxW="1200px" mx="auto"  textAlign={isLargerThan980 ? 'left' : 'center'} px={isLargerThan980 ? 4 : 2} mt={isLargerThan980  ? 10 : "-50"}>
          <Box>
            <Text>InBox FoodHub, Bayan Luma 8, Emilio Aguinaldo Hi-way, City of Imus</Text>
          </Box>
          
        {/* Social Media Icons */}
        <Flex justify={["center", "space-between"]} align="center" mt={8} display={isLargerThan980 ? 'flex' : 'block'}>
          <Text fontSize="sm" textAlign={isLargerThan980 ? 'left' : 'center'}>© 2024 Cavite Association of Producers & Entrepreneurs - CAPE. All rights reserved.</Text>
          <HStack spacing={4} paddingTop={isLargerThan980 ? '' : '20px'} paddingLeft={isLargerThan980 ? '' : '43%'}>
            <IconButton
              as="a"
              href="https://www.facebook.com/profile.php?id=100065009122013"
              aria-label="Facebook"
              icon={<FaFacebookF />}
              colorScheme="gray"
              variant="ghost"
			target='_blank'
            />
            <IconButton
              as="a"
              href="https://x.com/OllocalPH"
              aria-label="Twitter"
              icon={<FaTwitter />}
              colorScheme="gray"
              variant="ghost"
			target='_blank'
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/ollocalph/"
              aria-label="Instagram"
              icon={<FaInstagram />}
              colorScheme="gray"
              variant="ghost"
			target='_blank'
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailFooter;
