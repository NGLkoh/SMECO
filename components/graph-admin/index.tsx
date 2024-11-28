'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  GridItem,
 Grid,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
import { FaShare, FaComments, FaPodcast } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../resources/css/style.css'
import axios from 'axios'
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ContainerGraph({user} :any) {
  const [value, onChange] = useState<any>([]);
  const [templateState, setTemplateState] = useState<any>([])
  const [ category, setCategoryState] = useState<any>([])

	useEffect(() => {
      getTemplate()
	  getCategory()
	}, [])

 const getCategory = async () => {
	try {
		let checking = user.ids ? user.ids : user._id
		const res = await axios.post('/api/category/all')
	   setCategoryState(res.data.result)
		console.log(res.data.result, 'catergory')
	} catch (e) { }
    }
   const getTemplate = async () => {
   let dateArray:any = []
   let checking = user.ids ? user.ids : user._id
       const res = await axios.post('/api/template/all')
       console.log(res.data.result)
      res.data.result.map((data:any) => dateArray.push(moment(data.date).format('L')))
	   setTemplateState(res.data.result)
       onChange(dateArray)
		console.log(res)
   }

  return (
    <Box  mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>

      <chakra.h1  fontSize={'xl'} fontWeight={'bold'}>
       Post
      </chakra.h1>

       <chakra.h4  fontSize={'sm'} py={2} opacity={0.8}>
       An overview of your blogs
      </chakra.h4>
		<Grid
        w='100%'
        gap={2}
		templateColumns='repeat(2, 1fr)'
		>
       
      <GridItem  w='100%'> 
        <Calendar onChange={onChange} value={value}  />
      </GridItem>
        <GridItem  w='100%'>
			<Box width={'100%'}  overflow={'scroll'} height={'400px'} border={'1px solid #d5d4d4'} p={4} position={'relative'}> 
			{templateState.map((data:any) => (<Box  key={data._id} width={'500px'}  borderTop={'1px solid #b2afaf'} borderBottom={'1px solid #b2afaf'} p={2}>
				<Box position={'absolute'}> 
                 <Box fontWeight={600}>{moment(data.date).format("Do")}</Box>	   
				 <Box  opacity={0.8}>{moment(data.date).format("MMM")}</Box>	 
                </Box>
             <Box ml={10}> 
                <Text textOverflow={'ellipsis'} fontWeight={600} overflow={'hidden'} whiteSpace={'nowrap'}>{data.description}</Text>
				<Text position={'relative'} opacity={0.8}><Text display={'inline'} >Category</Text><Text display={'inline'} > : {category.map((cat:any) => { return <Text display={'inline'}> {cat._id == data.category_id ? <>{cat.title}</> : ""} </Text> })}</Text></Text>
                </Box>

             </Box>))}
			   
             </Box>
         </GridItem>
      </Grid>
    </Box>
  )
}