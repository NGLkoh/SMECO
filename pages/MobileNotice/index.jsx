import { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import React, {useEffect} from 'react'
import {Box } from '@chakra-ui/react'

const MobileNotice = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect window size to determine if it is mobile
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();  // Check on mount
    window.addEventListener('resize', handleResize); // Listen for resize
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener
    };
  }, []);

  return (
    isMobile && (
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bg="red.500"
        color="white"
        textAlign="center"
        py="4"
        zIndex="1000"
      >
        <Text fontSize="lg" fontWeight="bold">
          Notice: This webpage is not optimized for mobile devices. For the best experience, please use a desktop or tablet.
        </Text>
        <Button
          mt="2"
          onClick={() => window.location.href = "mailto:bdmpkitsolution24@gmail.com"}
          colorScheme="yellow"
        >
          Send Feedback
        </Button>
      </Box>
    )
  );
};

export default MobileNotice;