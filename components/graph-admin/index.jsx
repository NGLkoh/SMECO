'use client'

import {
  Box,
  chakra,
  Link,
  Text,
  GridItem,
  Grid,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
import moment from 'moment'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../resources/css/style.css'
import axios from 'axios'

export default function ContainerGraph() {
  const [value, onChange] = useState([]);
  const [templateState, setTemplateState] = useState([]);
  const [category, setCategoryState] = useState([]);
  const [postsByDate, setPostsByDate] = useState([]);

  useEffect(() => {
    getTemplate();
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await axios.post('/api/category/all');
      setCategoryState(res.data.result);
      console.log(res.data.result, 'category');
    } catch (e) {
      console.log(e);
    }
  }

  const getTemplate = async () => {
    let dateArray = [];
    const res = await axios.post('/api/template/all');
    console.log(res.data.result);
    const postsDateMap = {};
    res.data.result.map((data) => {
      const formattedDate = moment(data.date).format('L');
      dateArray.push(formattedDate);

      // Group posts by the same date
      postsDateMap[formattedDate] = postsDateMap[formattedDate] ? [...postsDateMap[formattedDate], data] : [data];
    });

    setPostsByDate(postsDateMap);
    setTemplateState(res.data.result);
    onChange(dateArray);
    console.log(res);
  };

  const exportPostsData = () => {
    const exportData = templateState.map((data) => ({
      date: moment(data.date).format("YYYY-MM-DD"),
      description: data.description,
      category: category.find(cat => cat._id === data.category_id)?.title,
    }));

    // Create a downloadable CSV (Basic CSV structure)
    const header = ["Date", "Description", "Category"];
    const rows = exportData.map(row => [
      row.date,
      row.description,
      row.category,
    ]);
    const csvContent = [
      header,
      ...rows,
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "posts_data.csv";
    link.click();
  };

  return (
    <Box mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>

      <chakra.h1 fontSize={'xl'} fontWeight={'bold'}>
        Post Overview
      </chakra.h1>

      <chakra.h4 fontSize={'sm'} py={2} opacity={0.8}>
        An overview of your blogs
      </chakra.h4>

      <Grid
        w='100%'
        gap={6}
        templateColumns={{
          base: '1fr', // Stack in a single column on smaller screens
          md: 'repeat(2, 1fr)', // Two columns on medium screens
        }}
      >
        <GridItem w='100%'>
          <Calendar
            onChange={onChange}
            value={value}
            tileClassName={({ date }) => {
              const formattedDate = moment(date).format('L');
              // Highlight date if there are posts on that day
              return postsByDate[formattedDate] ? 'highlight-date' : '';
            }}
          />
        </GridItem>

        <GridItem w='100%'>
          <Box
            width={'100%'}
            overflowY={'auto'}
            maxHeight={{ base: '300px', md: '400px' }}
            border={'1px solid #d5d4d4'}
            p={4}
            position={'relative'}
          >
            {templateState.length === 0 ? (
              <Text>No posts to display.</Text>
            ) : (
              templateState.map((data) => (
                <Link href={`/blog-client/${data._id}`} key={data._id} target='_blank'>
                  <Box
                    width={'100%'}
                    borderTop={'1px solid #b2afaf'}
                    borderBottom={'1px solid #b2afaf'}
                    p={2}
                    position={'relative'}
                    maxWidth={'750px'} // Limit the width to make it responsive
                    overflow={'hidden'} // Ensures that it doesn't overflow
                  >
                    <Box position={'absolute'}>
                      <Box fontWeight={600}>
                        {moment(data.date).format("Do")}
                      </Box>
                      <Box opacity={0.8}>{moment(data.date).format("MMM")}</Box>
                    </Box>

                    <Box ml={10}>
                      <Text
                        textOverflow={'ellipsis'}
                        fontWeight={600}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        maxWidth="100%" // Ensure the title doesn't overflow
                      >
                        {data.description}
                      </Text>

                      <Text position={'relative'} opacity={0.8}>
                        <Text display={'inline'}>Category</Text>
                        <Text display={'inline'}> : </Text>
                        {category.map((cat) =>
                          cat._id === data.category_id ? (
                            <Text key={cat._id} display={'inline'}>
                              {cat.title}
                            </Text>
                          ) : null
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              ))
            )}
          </Box>
        </GridItem>
      </Grid>

      <Button
        mt={5}
        onClick={exportPostsData}
      >
        Export Monthly Data
      </Button>

    </Box>
  );
}
