import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Text, Avatar, Card, Heading, CardBody, useMediaQuery, Link} from '@chakra-ui/react'
import { FaFacebook, FaInstagram , FaLinkedin} from 'react-icons/fa'; 

import axios from "axios";

const ListAuthor = () => {
const [isLargerThan980] = useMediaQuery('(min-width: 980px)')

const [user, setUsers] = useState([])

    useEffect(() => {
      getCategory()
	}, [])

 const getCategory = async () => {
	try {
		const res = await axios.post('/api/users/users')
	   setUsers(res.data.result)
		console.log(res.data.result, 'users')
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
    <>
	<Box width={'100%'} height={isLargerThan980 ? "523px" : "auto"} w={'auto'} >
		<Box m={'10%'}>  
		<Box width={'80%'}  margin={'auto'} >
	    <Text align="center" fontSize='30px' fontFamily="sans-serif" fontWeight={600} marginBottom={10}>List of Authors</Text>
		<div className="slider-container">
		<Slider {...settings}>
        
		  { user.map(e =>  e.profile.length != 0 ? <div key={e._id}>
           <Link href={`/blog-user/${e._id}`}><Card  textAlign={'center'} w={'100%'} display={'inline-block'}> 
				<CardBody>
                <Avatar mb={2} width={'80px'} height={'80px'} name={`${e.firstName} ${e.lastName}`} src={e.profile[0] ? `https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${e.profile[0].fileName}` : ""}/> 
				<Heading mb={2} size='md' fontWeight={600}> {e.firstName}  {e.lastName}</Heading>
				{/* <Text fontSize={'10px'} >{e.sub}</Text>  */}
				<Box textAlign={'center'} position={'relative'} mt={2} w={'100%'}>
                </Box>
				</CardBody>
			</Card></Link>
        </div> : "")} 
		
		</Slider>
		</div>
	  </Box>
	  </Box>
	</Box>
</>
  );
}

export default ListAuthor
