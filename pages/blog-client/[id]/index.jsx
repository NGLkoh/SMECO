'use client'

import ReCAPTCHA from "react-google-recaptcha";

import React, { useState, useEffect } from 'react'
import { Box, Text, ChakraProvider, Image, Textarea, Avatar, Input, Button, useToast, useMediaQuery } from '@chakra-ui/react'
import Navbar from '../../../components/nabvar'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberIcon,
  ViberShareButton
} from "react-share";
import Footer from '../../../components/footer'
import axios from 'axios'
import io from 'socket.io-client'
import GuestBlogMessage from '../../../components/messageGuestBlog/index'
import GridBlurredBackdrop from '../../../components/author'
import '../../../resources/css/style.css'
import '../../../resources/css/blog-client.css'
import {publicIpv4} from 'public-ip';
let socket;

let ip;
if (typeof window === 'undefined') {
  ip = await import('ip');
}

const BlogClient = () => {
 const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const [template, setTemplateState] = useState([])
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [domain, setDomain] = useState("")
  const [share, setOpenShare] = useState(false)
  const [userId, setUserId] = useState()
  const [comments, setComments] = useState([])
  const [profile, setProfile] = useState([])
  const [pubIp, setIp] = useState('')
  const toast = useToast()
const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  useEffect(() => {
    fetchIntialBlog()
    socketInitialize()
    fetchIntialComment()
  }, [])


  const socketInitialize = async () => {
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    const resfresh = () => {
      fetchIntialComment()
    }

    socket.on("refresh-comment", resfresh);
  }

  const fetchIntialBlog = async () => {
     let publicIp  = await publicIpv4();
    setIp(publicIp)
    setDomain(window.location.href)
    const params = window.location.href.split('/')
    const res = await axios.post('/api/template/template', { id: params[4] })
    console.log(res.data.result[0].ids, "userId")
    const prof = await axios.post('/api/users/usersById', { id: res.data.result[0].ids })
    console.log({ ...prof.data.result[0].profile[0], name: `${prof.data.result[0].firstName} ${prof.data.result[0].lastName}` }, "user details")
    setProfile({ ...prof.data.result[0].profile[0], name: `${prof.data.result[0].firstName} ${prof.data.result[0].lastName}`, id: prof.data.result[0]._id })
    setUserId(res.data.result[0].ids)
    setTemplateState(res.data.result)
    console.log(res)
  }

  const fetchIntialComment = async () => {
    let params = window.location.href.split('/')
    const res = await axios.post('/api/comment/search', { id: params[4] })
    setComments(res.data.result)
  }

  const handleSaveComment = async () => {
 if (!recaptchaVerified) {
     toast({
		title: "Please complete the reCAPTCHA before posting comment.",
		description: "Warning",
		status: "warning",
		duration: 2000,
		isClosable: true,
		});
      return;
    } else {
    if(email !== "" && comment !== "" ) {
	    socket = io()
		const res = await axios.post('/api/comment/create', { id: template[0]._id, message: comment, email:email })
		socket.emit('add-comment', { result: res })
		setComment('')
        toast({
		title: "Successfully Added a Comment",
		description: "Success",
		status: "success",
		duration: 2000,
		isClosable: true,
		});
    } else {
       toast({
		title: "Please Fill up the blanks",
		description: "Incomplete",
		status: "warning",
		duration: 2000,
		isClosable: true,
		});
    }
	}
  }
  const handelAddLikes = async() => {
      let publicIp  = await publicIpv4();
      let params = window.location.href.split('/')
       try {
         await axios.post('/api/template/update-template-data', { id: params[4],  data: {ip: template[0].ip ? template[0].ip.includes(publicIp) ? "" : [...template[0].ip, publicIp] : [publicIp],likes: template[0].likes ?  template[0].likes + 1 : 1}, type : 2 })
        toast({
		title: "Liked",
		description: "Success",
		status: "success",
		duration: 2000,
		isClosable: true,
		});
       fetchIntialBlog()
       } catch(e) {
          console.log(e)
       }
       
    }

  const onChangeRecapcha = () => {
 setRecaptchaVerified(true); 
 }

  return (
    <Box className='client-blog'>
      <ChakraProvider>
        <GuestBlogMessage userId={userId} />
          <Navbar page='homepage' />
          <Box
            width={'100%'}
            height={'100%'}
            w={'100%'}
            position={'relative'}
            minHeight="100vh"
          >
            <Box height={'100%'}>
              {/* Add padding for left and right */}
              <Box
                width={'100%'}
                height={"100%"}
                className='client'
                minHeight="100vh"
                margin={'auto'}
                paddingY={20} // Top and bottom padding
                paddingX={8}  // Left and right padding
              >
                {template.map((row, key) => (
                  <Box paddingLeft={isLargerThan980? '200px': ""}key={key} paddingRight={isLargerThan980 ? '200px' : ""}> <div className="container-blog" key={row.title} dangerouslySetInnerHTML={{ __html: row.data }} /> </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box padding={ isLargerThan980 ? 20 : 5} position={'relative'} paddingLeft={isLargerThan980? '200px': ""} paddingRight={isLargerThan980? '200px': ""}>
             <Box position={'relative'}>
           <Text float={'left'}   fontSize={18} mb={2}> Comment </Text> 
         <Box position={'relative'}>
                  <Text float={'right'}   mr={'5'} color={'#232536'}>{template ? template[0]?  template[0].likes ? `${template[0].likes} likes` : "" : "": ""} </Text>  
        
          <Image
             float={'right'}
              alt={'Hero Image'}
              fit={'cover'}
              display={'inline-block'}
              align={'center'}
              w={'25px'}
              mr={'20px'}
              cursor={'pointer'}
              zIndex={1}
              h={'25px'}
              onClick={() => handelAddLikes()}
              src={
              template? template[0] ? template[0].ip.includes(pubIp)  ? '/like-blue.png': '/like.png' : "" : ""
              }
            />
  
          <Box position={'absolute'} right={10} display={share ? 'block': 'none'} bottom={0} p={2} width={'200px'}  >
            <Box position={'relative'} w={'80%'} borderRadius={8} bg={'#232536'} border={'1px solid #dddd'}  p={1} margin={'auto'}>
	        <Box ml={2} mt={2} display={'inline-block'}>
            <FacebookShareButton
				url={domain}
				quote={`Please like and Share`}
				hashtag="#MarkadongPinoy">
				<FacebookIcon logoFillColor="white" size={25} round/>
			</FacebookShareButton>
            </Box>
              <Box ml={2} display={'inline-block'}>
            <WhatsappShareButton 
                url={domain}
                quote={`Please like and Share`}
                hashtag="#MarkadongPinoy">
            <WhatsappIcon logoFillColor="white" size={25} round/>
           </WhatsappShareButton>
			</Box>
			<Box ml={2} display={'inline-block'}>
             <TwitterShareButton 
                url={domain}
                quote={`Please like and Share`}
                hashtag="#MarkadongPinoy">
            <TwitterIcon logoFillColor="white" size={25} round/>
           </TwitterShareButton>
              </Box>
            <Box ml={2} display={'inline-block'}>
            <ViberShareButton 
                url={domain}
                quote={`Please like and Share`}
                hashtag="#MarkadongPinoy">
            <ViberIcon logoFillColor="white" size={25} round/>
           </ViberShareButton>
           </Box>
          </Box>
        </Box>
          </Box>

            <Image
              alt={'Hero Image'}
              fit={'cover'}
              float={'right'}
              display={'inline-block'}
              align={'center'}
              w={'25px'}
              mr={'20px'}
              h={'25px'}
                 onClick={() => share ? setOpenShare(false) : setOpenShare(true)}
              src={
                '/share.png'
              }
            />
     
             </Box>
            <Input  value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Enter email' border={'2px solid #000000'} mb={6}/>

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              border={'2px solid #000000'}
              padding={4}
              placeholder='Add a Comment '
              size='xl'
            />
	<Box mt={10} display="flex" flexDirection="column" alignItems="center" height="100%" justifyContent="center">
  <ReCAPTCHA
    sitekey="6LfoxpYqAAAAAP27JqB_GiMEWoDby8gSfV_ujAeP"
    onChange={() => onChangeRecapcha()}
    className="recaptcha-container"
  />
  <Button
    cursor={'pointer'}
    onClick={handleSaveComment}
    mt={4} // Adjusted margin to give some space below the recaptcha
    background={'#232436'}
    color={'white'}
    width={isLargerThan980 ? '20%' : '50%'} 
	marginTop={10}// Adjusted width for better button sizing
  >
    Post
  </Button>
</Box>

            <GridBlurredBackdrop profile={profile} />
            {
              comments.map((e, key) => (
               e.status === true ? 
                <Box mb={2} key={key} border={'2px solid #e0e0e0'} p={4}>
                  <Avatar name={e.email} /> {e.email}
                  <Text pl={14} position={'relative'} bottom={'26px'} left={'-3px'}> {e.message} </Text>
                </Box> : ""
              ))
            }
          </Box>
          
      </ChakraProvider><Footer />
    </Box>
  )
}

export default BlogClient
