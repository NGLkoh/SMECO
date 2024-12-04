import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Text, Avatar, Link, Button, Image, useMediaQuery} from '@chakra-ui/react'
import axios from "axios";

const TemplateMobile = () => {

const [template, setTemplate] = useState([])
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
    useEffect(() => {
      getCategory()
	}, [])

 const getCategory = async () => {
	try {
	    const res = await axios.post('/api/template/all')
	    setTemplate(res.data.result)
		console.log(res.data.result, 'template')
	} catch (e) { console.log(e) }
  }

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: isLargerThan980 ? 4 : 1,
    slidesToScroll: isLargerThan980 ? 4 : 1,  
    autoplay:true
  };

  return (
	<Box width={'100%'} height={isLargerThan980 ? "523px" : 'auto'} w={'100%'} >
		<Box m={isLargerThan980 ? '10%' : ""} mt={6}>  
		<Box width={'80%'}  margin={'auto'} >
		<div className="slider-container">
		<Slider {...settings}>
        
		  { template.map((row, key) =>  <div key={key}>
            <Box  margin={"auto"} p={2} >  
				<Image src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${row.fileName}`}/>
				{/* <Text fontSize={9} mt={4}>  By Juan Dela Cruz   l   May 23, 2024 </Text> */}
				<Text fontWeight={600} mt={4}> 	{row.title} </Text>
				<Text mt={4} fontSize={10}>     {row.description} </Text>
				<Link href={`/blog-client/${row._id}`}><Button colorScheme='teal' size='lg' fontFamily="sans-serif" mt={4} borderRadius={0} backgroundColor={'#ffd050'} w={40} color={"#000000"} fontSize={14}>
					Read More <Text ml={1.5} position={'relative'} fontSize={16} bottom={'0px'}>&gt;</Text>
				</Button></Link>
			</Box> 
        </div>)} 
		</Slider>
		</div>
	  </Box>
	  </Box>
	</Box>
  );
}

export default TemplateMobile
