'use client'

import {
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  TableContainer,
  Thead,
  Tr,
  Th,
  Table,
  Tbody,
  Td,
  HStack,
} from '@chakra-ui/react'

import { useState, useEffect, useRef } from 'react'
import { FaComments, FaPodcast, FaThumbsUp } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import axios from 'axios'
import html2canvas from 'html2canvas'
import moment from 'moment'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function StatsCard({ title, stat, icon }) {
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
        type: 'bar', // Bar Chart
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: 'Count',
        },
      },
      tooltip: {
        enabled: true,
      },
      dataLabels: {
        enabled: false,
      },
    },
  })
  const [recentComments, setRecentComments] = useState([])
  const chartRef = useRef(null)

  useEffect(() => {
    getTemplate()
    getComments()
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

    setChartData((prevData) => ({
      ...prevData,
      series: [
        { name: 'Comments', data: [...prevData.series[0].data, commentCount] },
        { name: 'Posts', data: [...prevData.series[1].data, posts] },
        { name: 'Likes', data: [...prevData.series[2].data, likesCount] },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: [...prevData.options.xaxis.categories, new Date().toLocaleTimeString()],
        },
      },
    }))
  }

  const getComments = async () => {
    try {
      const checking = user.ids ? user.ids : user._id
      const res = await axios.post('/api/template/search', { id: checking })
      const commentsArray = []

      for (const row of res.data.result) {
        const commentRes = await axios.post('/api/comment/search', { id: row._id })
        commentRes.data.result.forEach((comment) => {
          commentsArray.push({
            title: row.title,
            ...comment,
          })
        })
      }

      setRecentComments(commentsArray)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const exportAsPNG = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current)
      const link = document.createElement('a')
      link.download = 'chart.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const exportAsCSV = () => {
    const csvContent = [
      ['Type', 'Count'],
      ...chartData.series.map((series) =>
        series.data.map((value, index) => [series.name, value])
      ).flat(),
    ]
      .map((row) => row.join(','))
      .join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'chart.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

      <Flex mt={8} align="stretch" gap={4}>
        <Box
          w="50%"
          p={4}
          bg={useColorModeValue('white', 'gray.800')}
          rounded="md"
          shadow="sm"
          borderWidth="1px"
          ref={chartRef}>
          <HStack mb={4} justifyContent="space-between">
            <chakra.h2 fontSize={'lg'} fontWeight={'bold'}>
              Interaction Graph
            </chakra.h2>
            <Flex gap={2}>
              <Button size="sm" onClick={exportAsPNG} colorScheme="blue">
                Export as PNG
              </Button>
              <Button size="sm" onClick={exportAsCSV} colorScheme="green">
                Export as CSV
              </Button>
            </Flex>
          </HStack>
          <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </Box>

        <Box
          w="50%"
          p={4}
          bg={useColorModeValue('gray.100', 'gray.700')}
          rounded="md"
          shadow="sm"
          borderWidth="1px">
          <HStack spacing={8} alignItems={'center'} mb={4}>
            <Box fontSize={'xl'} fontWeight={'600'}>
              Recent Activity
            </Box>
          </HStack>
          <TableContainer>
            <Table variant="simple" border="1px solid #dddddd">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Email</Th>
                  <Th>Message</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentComments.length > 0 ? (
                  recentComments.map((comment) => (
                    <Tr key={comment._id}>
                      <Td>{comment.title}</Td>
                      <Td>{comment.email}</Td>
                      <Td>{comment.message}</Td>
                      <Td>{comment.date ? moment(comment.date).calendar() : 'N/A'}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      No recent activity
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Box>
  )
}
