'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { FaComments, FaPodcast, FaThumbsUp } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import axios from 'axios'

// Dynamically import ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function StatsCard(props) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 3, md: 3 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function BasicStatistics({ user }) {
  const [post, setPost] = useState(0)
  const [comment, setComment] = useState(0)
  const [likes, setLikes] = useState(0)
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Comments',
        data: [],
      },
      {
        name: 'Posts',
        data: [],
      },
      {
        name: 'Likes',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        enabled: true,
      },
      markers: {
        size: 5,
      },
    },
  })

  const [gaugeData, setGaugeData] = useState({
    comments: 0,
    likes: 0,
  })

  useEffect(() => {
    getTemplate()
  }, [])

  const getTemplate = async () => {
    let checking = user.ids ? user.ids : user._id
    const res = await axios.post('/api/template/search', { id: checking })
    let commentCount = 0 
    let likesCount = 0
    const posts = res.data.result.length
    for (const row of res.data.result) {
      likesCount += row.likes ? row.likes : 0
      const commentRes = await axios.post('/api/comment/search', { id: row._id })
      commentCount += commentRes.data.result.length
    }
    setLikes(likesCount)
    setPost(posts)
    setComment(commentCount)

    // Update chart data
    setChartData((prevData) => ({
      ...prevData,
      series: [
        { ...prevData.series[0], data: [...prevData.series[0].data, commentCount] },
        { ...prevData.series[1], data: [...prevData.series[1].data, posts] },
        { ...prevData.series[2], data: [...prevData.series[2].data, likesCount] },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: [...prevData.options.xaxis.categories, new Date().toLocaleTimeString()],
        },
      },
    }))

    // Update gauge data
    setGaugeData({ comments: commentCount, likes: likesCount })
  }

  return (
    <Box maxW="100%" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 fontSize={'xl'} fontWeight={'bold'}>
        Interactions
      </chakra.h1>
      <chakra.h4 fontSize={'sm'} py={2}>
        Activity
      </chakra.h4>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Posts'} stat={post} icon={<FaPodcast size={'3em'} />} />
        <StatsCard title={'Likes'} stat={likes} icon={<FaThumbsUp size={'3em'} />} />
        <StatsCard title={'Comments'} stat={comment} icon={<FaComments size={'3em'} />} />
      </SimpleGrid>
      
      <Box mt={5}>
        <chakra.h4 fontSize={'sm'} py={2}>
          Activity Graph (Real-time)
        </chakra.h4>
        <Flex gap={5} alignItems="center">
          {/* Line Graph */}
          <Box flex={2}>
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
          </Box>

          {/* Gauges */}
          <Flex flex={1} direction="column" alignItems="center" justifyContent="space-around">
            <Box w="100%" mb={4}>
              <Chart
                options={{
                  chart: {
                    type: 'radialBar',
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: '70%' },
                      dataLabels: {
                        name: { show: true, fontSize: '16px' },
                        value: { fontSize: '16px' },
                      },
                    },
                  },
                  labels: ['Comments'],
                }}
                series={[gaugeData.comments]}
                type="radialBar"
                height={150}
              />
            </Box>
            <Box w="100%">
              <Chart
                options={{
                  chart: {
                    type: 'radialBar',
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: '70%' },
                      dataLabels: {
                        name: { show: true, fontSize: '16px' },
                        value: { fontSize: '16px' },
                      },
                    },
                  },
                  labels: ['Likes'],
                }}
                series={[gaugeData.likes]}
                type="radialBar"
                height={150}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
