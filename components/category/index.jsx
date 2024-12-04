import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Text, Avatar, Card, ChakraProvider, Heading, CardBody, useMediaQuery} from '@chakra-ui/react'
import axios from "axios";
const Category = () => {

const [category, setCategoryState] = useState([])
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
    useEffect(() => {
      getCategory()
	}, [])

 const getCategory = async () => {
	try {
		const res = await axios.post('/api/category/all')
	   setCategoryState(res.data.result)
		console.log(res.data.result, 'catergory')
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
    <ChakraProvider>
	<Box width={'100%'} height={isLargerThan980 ? "523px" : 'auto'} w={'100%'} >
		<Box m={'10%'}>  
		<Box width={'80%'}  margin={'auto'} >
	    <Text align="center" fontSize='30px' fontFamily="sans-serif" fontWeight={600} marginBottom={10}>List of Categorys</Text>
		<div className="slider-container">
		<Slider {...settings}>
        
		  { category.map(e => e.title ? <div>
             <Card textAlign={'center'} w={'100%'} key={e._id} display={'inline-block'}>
				<CardBody>
                <Avatar mb={2} name='Segun Adebayo' src={'1.png'} />
				<Heading mb={2} fontSize={'25px'} size='lg' fontWeight={600}> {e.title}</Heading>
				{/* <Text fontSize={'20px'}>test</Text> */}
				</CardBody>
			</Card>
        </div> : "")} 
		
		</Slider>
		</div>
	  </Box>
	  </Box>
	</Box>
</ChakraProvider>
  );
}

export default Category
