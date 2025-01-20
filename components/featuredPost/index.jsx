import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  ChakraProvider,
  Grid,
  useMediaQuery,
  GridItem,
  Image,
  Button,
  Stack,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import '../../resources/css/featured.css';
import TemplateMobile from './featured/index';
import LazyLoad from 'react-lazyload';
const FeaturedPost = () => {
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)');
  const [template, setTemplateState] = useState([]);
  const [selectedKey, setSelectedKey] = useState(0);

  useEffect(() => {
    getTemplate();
  }, []);

  const getTemplate = async () => {
    const res = await axios.post('/api/template/all');
    setTemplateState(res.data.result);
  };

  const selectedTemplate = (key) => {
    setSelectedKey(key);
  };

  return (
    <ChakraProvider>
      {isLargerThan980 ? (
        <Box width="100%" py={40} fontFamily="system-ui"> {/* Set default system font */}
          <Box width="70%" margin="auto">
            <Box width="100%" padding="10px">
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={6}
              >
                {/* Featured Post Section */}
                <GridItem colSpan={3} bg="white" borderRadius="lg" overflow="hidden">
                  <Text fontSize="3xl" mb={2} fontWeight={600}>
                    Featured Post
                  </Text>
                  {template.map((row, key) =>
                    key === selectedKey ? (
                      <Box key={key} p={4}>
                        <LazyLoad height={500}>
                       <Image
                        src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.fileName}`}
                        alt={row.title}
                        width="100%"
                        height="100%"  // Fills the entire space available
                        maxHeight="500px"  // Set a maximum height so it doesn’t stretch
                        objectFit="cover"  // Ensures proper aspect ratio without blank space
                        borderRadius="lg"
                      /></LazyLoad>
                        <Text
                          mt={4}
                          fontSize="lg"
                          fontWeight={600}
                          sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: isLargerThan980 ? 2 : 'unset',
                            overflow: 'hidden',
                          }}
                        >
                          {row.title}
                        </Text>
                        <Text fontSize={isLargerThan980 ? 15 : 18} color="gray.500" mt={4}>
                          {row.description}
                        </Text>
                        <Link href={`/blog-client/${row._id}`}>
                          <Button
                            colorScheme="teal"
                            size="lg"
                            fontFamily="sans-serif"
                            mt={6}
                            borderRadius={0}
                            backgroundColor="#ffd050"
                            width={isLargerThan980 ? '40%' : '100%'}
                            color="#000000"
                            fontSize={14}
                          >
                            Read More
                            <Text ml={1.5} position="relative" fontSize={16} bottom="0px">
                              &gt;
                            </Text>
                          </Button>
                        </Link>
                      </Box>
                    ) : null
                  )}
                </GridItem>

                {/* All Posts Section */}
                <GridItem colSpan={2}>
                  <Text fontSize="2xl" mb={6} fontWeight={600}>
                    All Posts
                  </Text>
                  <Stack
                    spacing={4}
                    overflowY="auto"
                    maxHeight="calc(100vh - 200px)"
                    sx={{
                      // Hides the scrollbar
                      '&::-webkit-scrollbar': {
                        display: 'none', // Chrome and Webkit-based browsers
                      },
                      msOverflowStyle: 'none', // IE/Edge
                      scrollbarWidth: 'none', // Firefox
                    }}
                  >
                    {template.map((row, key) => (
                      <Box
                        cursor="pointer"
                        p={4}
                        background={key === selectedKey ? '#f7f7f7' : ''}
                        key={row._id}
                        onClick={() => selectedTemplate(key)}
                        borderRadius="md"
                        transition="background-color 0.3s"
                        _hover={{ backgroundColor: '#f0f0f0' }}
                      >
                        <Text
                          fontSize={isLargerThan980 ? 'sm' : 'md'}
                          textTransform="uppercase"
                          fontWeight="bold"
                          sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: isLargerThan980 ? 1 : 2,
                            overflow: 'hidden',
                          }}
                        >
                          {row.title}
                        </Text>
                        <Text pt={2} fontSize={14} fontWeight="normal" color="gray.600" noOfLines={2}>
                          {row.description}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Box>
      ) : (
        <TemplateMobile />
      )}
    </ChakraProvider>
  );
};

export default FeaturedPost;
