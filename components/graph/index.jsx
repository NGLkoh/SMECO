'use client';

import {
  Box,
  chakra,
  Text,
  GridItem,
  Grid,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../resources/css/style.css';
import axios from 'axios';

export default function ContainerGraph({ user }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [templateState, setTemplateState] = useState([]);
  const [category, setCategoryState] = useState([]);

  useEffect(() => {
    getTemplate();
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const checking = user.ids ? user.ids : user._id;
      const res = await axios.post('/api/category/search', { id: checking });
      setCategoryState(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const getTemplate = async () => {
    try {
      const checking = user.ids ? user.ids : user._id;
      const res = await axios.post('/api/template/search', { id: checking });
      setTemplateState(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredPosts = templateState.filter((data) =>
    moment(data.date).isSame(selectedDate, 'day')
  );

  const tileClassName = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const hasActivity = templateState.some((data) =>
      moment(data.date).isSame(formattedDate, 'day')
    );
    return hasActivity ? 'highlighted-day' : '';
  };

  return (
    <Box mx="auto" pt={5} px={{ base: 2, sm: 4, md: 8 }} width="100%">
      <chakra.h1 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" textAlign="center">
        Post Overview
      </chakra.h1>
      <chakra.h4 fontSize="sm" py={2} opacity={0.8} textAlign="center">
        An overview of your blogs and activities
      </chakra.h4>

      <Grid
        templateColumns={{ base: '1fr', md: '1fr 2fr' }}
        gap={4}
        alignItems="start"
      >
        <GridItem>
          <Calendar
            onChange={setSelectedDate}
            tileClassName={tileClassName}
          />
        </GridItem>
        <GridItem>
          <Box
            border="1px solid #d5d4d4"
            borderRadius="md"
            p={4}
            boxShadow="md"
            overflow="auto"
            maxH="500px"
          >
            {selectedDate ? (
              <VStack spacing={4} align="stretch">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((data) => (
                    <Box
                      key={data._id}
                      border="1px solid #e2e2e2"
                      p={3}
                      borderRadius="md"
                      bg="gray.50"
                    >
                      <Box>
                        <Text fontWeight="bold">
                          {moment(data.date).format('MMMM Do YYYY')}
                        </Text>
                      </Box>
                      <Box>
                        <Text>{data.description}</Text>
                        <Text fontSize="sm" opacity={0.8}>
                          Category:{' '}
                          {
                            category.find((cat) => cat._id === data.category_id)
                              ?.title
                          }
                        </Text>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>No posts for this date.</Text>
                )}
              </VStack>
            ) : (
              <Text>Select a date to view posts.</Text>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
