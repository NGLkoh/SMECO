import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, Link, useToast, HStack, useMediaQuery, InputGroup, IconButton } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Grid, GridItem } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import '../../resources/css/footer-style.css'
const DetailFooter = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleAddSubscribe = async () => {
    try {
      if(email){ 
      const checker: AxiosResponse<{ message: string }> = await axios.post("/api/subscribe/searchByEmail", { email });
      console.log(checker, "checker");

      if (checker.data.message === "true") {
        toast({
          title: 'Email already subscribed',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
	  } else {

          toast({
          title: 'Enter Email please',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
      } else {
        try {
 if(email){ 
          const res = await axios.post("/api/subscribe/create", { email, sub: 1 });
          toast({
            title: 'Successfully Subscribed to Newsletter',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
  } else {

          toast({
          title: 'Enter Email please',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error subscribing',
        description: 'An error occurred while subscribing. Please try again.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="footer" backgroundColor={'#232436'} color="white" py={30}>
      {/* Right Section - Links */}
      <Box maxW="1200px" mx="auto" px={4} paddingBottom={20}>
        <Flex justify={["center", "flex-end"]} align="center" paddingRight={isLargerThan980 ? 0 : 26}>
          <HStack spacing={20} fontSize={isLargerThan980 ? "" : "13px"}>
            <Link href="/../homepage">Home</Link>
            <Link href="/../blog">Blog</Link>
            <Link href="/../about-us">About us</Link>
            <Link href="/../contact-us">Contact us</Link>
            <Link href="/../privacy-policy">Privacy Policy</Link>
          </HStack>
        </Flex>
      </Box>

  {/* Subscribe Section */}
<Box 
  bg="#2e303f" 
  py={isLargerThan980 ? 100 : 20} 
  height={isLargerThan980 ? 'auto' : '200px'} 
  px={isLargerThan980 ? 100 : 20} 
  maxW="1200px" 
  mx="auto" 
  mb="80px"
  display="flex" 
  flexDirection="column" 
  alignItems="center"
  justifyContent="center"
>
  <Box className="container-footer" width="100%">
    <Grid 
      templateColumns={isLargerThan980 ? 'repeat(5, 2fr)' : '1fr'} 
      gap={4} 
      alignItems="center" 
      textAlign="center"
    >
      {/* Subscription Text */}
      <GridItem colSpan={isLargerThan980 ? 3 : 5}>
        <Flex 
          direction="column" 
          align="center" 
          maxW="1200px" 
          mx="auto"
        >
          <Text 
            fontSize={isLargerThan980 ? '2em' : '15px'} 
            fontWeight="bold" 
            textAlign="center" 
            mb={4}
          >
            Subscribe to our newsletter to get the latest updates and news
          </Text>
        </Flex>
      </GridItem>

      {/* Input and Button */}
      <GridItem 
        className="newsletter-box" 
        colSpan={isLargerThan980 ? 2 : 5} 
        mt={isLargerThan980 ? 0 : 10}
      >
        <InputGroup justifyContent="center" alignItems="center">
          <Input
            placeholder="Enter Your Email"
            bg="white"
            borderColor="gray.600"
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ color: 'gray.400' }}
            color="black"
            _hover={{ borderColor: 'gray.500' }}
            size="sm"
            p={6}
          />
          <Button 
            ml={2} 
            backgroundColor="#ffcf4f" 
            color="black" 
            size="md" 
            p={6} 
            onClick={handleAddSubscribe}
          >
            Subscribe
          </Button>
        </InputGroup>
      </GridItem>
    </Grid>
  </Box>
</Box>


      {/* Footer Information */}
      <Box maxW="1200px" mx="auto" textAlign={isLargerThan980 ? 'left' : 'center'} px={isLargerThan980 ? 4 : 2} mt={isLargerThan980 ? 10 : "-50"}>
        <Box>
          <Text>The District Imus
2/F Alagang Ayala Land Center, E.Aguinaldo Highway cor. Daang Hari Road, Anabu II-D, Imus, Cavite 4103</Text>
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
