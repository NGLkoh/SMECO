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

import { ReactNode, useState, useEffect } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import axios from 'axios'
import { FaShare, FaComments, FaPodcast, FaEye } from 'react-icons/fa'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
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

export default function BasicStatistics({ user }: any) {
  const [templateState, setTemplateState] = useState<any>([])
  const [post, setPost] = useState<any>(0)
  const [comment, setComment] = useState<any>(0)
  const [views, setViews] = useState<any>(4) // Example static view count, update based on actual data
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Comments',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Posts',
        data: [],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  })

  useEffect(() => {
    getTemplate()
  }, [])

  const getTemplate = async () => {
    let checking = user.ids ? user.ids : user._id
    const res = await axios.post('/api/template/search', { id: checking })
    let commentCount = 0
    const posts = res.data.result.length
    for (const row of res.data.result) {
      const commentRes = await axios.post('/api/comment/search', { id: row._id })
      commentCount += commentRes.data.result.length
    }

    setPost(posts)
    setComment(commentCount)
    setTemplateState(res.data.result)

    // Update chart data
    setChartData((prevData:any) => {
      const newLabels = [...prevData.labels, new Date().toLocaleTimeString()]
      const newCommentData = [...prevData.datasets[0].data, commentCount]
      const newPostData = [...prevData.datasets[1].data, posts]

      return {
        labels: newLabels,
        datasets: [
          { ...prevData.datasets[0], data: newCommentData },
          { ...prevData.datasets[1], data: newPostData },
        ],
      }
    })

    console.log(res)
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
        <StatsCard title={'Views'} stat={views} icon={<FaEye size={'3em'} />} />
        <StatsCard title={'Comments'} stat={comment} icon={<FaComments size={'3em'} />} />
      </SimpleGrid>
      
      <Box mt={5}>
        <chakra.h4 fontSize={'sm'} py={2}>
          Activity Graph (Real-time)
        </chakra.h4>

        <Line data={chartData} options={{ responsive: true }} />

      </Box>

    </Box>
  )
}
