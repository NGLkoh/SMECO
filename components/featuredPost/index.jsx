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
    console.log(res.data.result);
  };

  const selectedTemplate = (key) => {
    setSelectedKey(key);
  };

  return (
    <ChakraProvider>
      {isLargerThan980 ? (
        <Box width="100%" height="1100" position="relative">
          <Box m="10%">
            <Box width="80%" margin="auto">
              <Box w="100%" padding="10px">
                <Grid
                  h="auto"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={6}
                >
                  {/* Featured Post Section */}
                  <GridItem colSpan={3} bg="white" borderRadius="lg" overflow="hidden">
                    <Text fontSize="3xl" fontFamily="sans-serif" mb={2} fontWeight={600}>
                      Featured Post
                    </Text>
                    {template.map((row, key) =>
                      key === selectedKey ? (
                        <Box key={key} margin="auto" p={4}>
                          <Image
                            src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.fileName}`}
                            alt={row.title}
                            boxSize="100%"
                            width={'100%'}
                            height={'500px'}
                            objectFit="cover"
                            borderRadius="lg"
                          />
                          <Text
                            fontWeight={600}
                            mt={4}
                            fontSize="lg"
                            sx={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: isLargerThan980 ? 2 : 'unset',
                              overflow: 'hidden',
                            }}
                          >
                            {row.title}
                          </Text>
                          <Text  className="desc" mt={4} fontSize={isLargerThan980 ? 15 : 20} color="gray.500" >
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
                              w={ isLargerThan980 ? 40 : 20}
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
                    <Text fontSize="2xl" fontFamily="sans-serif" ml={2} mb={6} fontWeight={600}>
                      All Posts
                    </Text>
                    <Stack spacing="4" className="feature-scroll">
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
                            size="sm"
                            fontSize={15}
                            textTransform="uppercase"
                            fontWeight="bold"
                            sx={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: isLargerThan980 ? 1 : 'unset',
                              overflow: 'hidden',
                            }}
                          >
                            {row.title}
                          </Text>
                          <Text pt="2" fontSize="14"  fontWeight="normal" color="gray.600" >
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
        </Box>
      ) : (
        <TemplateMobile />
      )}
    </ChakraProvider>
  );
};

export default FeaturedPost;
