

'use client'

import React, { useState } from 'react'
import {TableContainer , Table, useDisclosure, Flex, Accordion, AccordionButton,AccordionItem , AccordionIcon , AccordionPanel, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Text, Input  } from '@chakra-ui/react'
import Head from 'next/head'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";
import { FaCommentDots, FaEllipsisH, FaFile, FaPlus, FaTrash } from 'react-icons/fa'; 
const fileTypes = ["JPG", "PNG", "GIF"];
 
 const featured_image = ({ name, hight, width, image, section_title, handleChangeStateTemplate }) => {
	const [file, setFile] = useState(null);
	const handleChange = (file) => {
		 var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			setFile(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};

	};
	const handleSave = () => {
	}

	 return (<><Box mt={2}>
			<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem>
		    <AccordionButton background={'#232536'} color={'#ffffff'} _hover={{ background: '#232536', color: "#ffffff" }}>
             <Box as='span' flex='1' textAlign='left'>
			  <Text fontSize='xl' fontWeight={600}  mb={2} >{section_title}</Text>
			</Box>
				<AccordionIcon />
			</AccordionButton>
           <AccordionPanel pb={4}>
           <Box mt={2}>
			<Text mb='8px'>{image.title}</Text>
		   
               <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
		   </Box>
		   <Box mt={2}>
			<Text mb='8px'>{hight.title}</Text>
			<Input
				type='text'
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
				size='sm'
			/>
			</Box>

			   <Box mt={2}>
					<Text mb='8px'>{width.title}</Text>
					<Input
						type='text'
						bg={'#FFFFFF'}
						color={'#4A5568'}
						borderRadius={8}
						size='sm'
					/>
			    </Box>
                  <Button colorScheme='teal' mt={4} width={'100%'} bg={'#FFD050'} variant='solid' onClick={handleSave}>
				   Save
				  </Button>

				</AccordionPanel>
				</AccordionItem>
				</Accordion>
			</Box>
		</>)
}

const featured_blog = ({ name, hight, width, discription, section_title, handleChangeStateTemplate }) => {
        const [data, setData] = useState({})
		const handelSave = () => {
			console.log(data)
	    }
		return (<>
		<Box mt={2}>
			<Accordion  defaultIndex={[0]} allowMultiple>
			<AccordionItem>
		    <AccordionButton background={'#232536'} color={'#ffffff'} _hover={{ background: '#232536', color: "#ffffff" }}>
             <Box as='span' flex='1' textAlign='left'>
			  <Text fontSize='xl' fontWeight={600}  mb={2} >{section_title}</Text>
			</Box>
				<AccordionIcon />
			</AccordionButton>
           <AccordionPanel pb={4}>
			<Text mb='8px'>{name.title}</Text>
			<Input
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
				onChange={(e) => setData({...data,[(name.title).toLowerCase()]: {"value" :e.target.value, "title":name.title}})}
				size='sm'
			/>
			
			<Box mt={2}>
			<Text mb='8px'>{discription.title}</Text>
			<Input
				type='text'
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
		        onChange={(e) => setData({...data, [(discription.title).toLowerCase()]: {"value" :e.target.value, "title":discription.title}  })}
				size='sm'
			/>
			</Box>

		   <Box mt={2}>
			<Text mb='8px'>{hight.title}</Text>
			<Input
				type='text'
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
				onChange={(e) => setData({...data, [(hight.title).toLowerCase()]: {"value" :e.target.value, "title":hight.title}  })}
				size='sm'
			/>
			</Box>

			   <Box mt={2}>
					<Text mb='8px'>{width.title}</Text>
					<Input
						type='text'
						bg={'#FFFFFF'}
						color={'#4A5568'}
						onChange={(e) => setData({...data, [(width.title).toLowerCase()]: {"value" :e.target.value, "title":width.title}  })}
						borderRadius={8}
						size='sm'
					/>
			    </Box>
				<Button colorScheme='teal' mt={4} width={'100%'} bg={'#FFD050'} variant='solid' onClick={handelSave}>
				   Save
				  </Button>
				</AccordionPanel>
				</AccordionItem>
				</Accordion>
			</Box>
		</>)
	}

const featured_description = ({ header, hight, width, discription, section_title, handleChangeStateTemplate }) => {
 const [data, setData] = useState({})
		const handelSave = () => {
			console.log(data)
	    }
		return (<>
		<Box mt={2}>
			<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem>
		    <AccordionButton background={'#232536'} color={'#ffffff'} _hover={{ background: '#232536', color: "#ffffff" }}>
             <Box as='span' flex='1' textAlign='left'>
			  <Text fontSize='xl' fontWeight={600}  mb={2} >{section_title}</Text>
			</Box>
				<AccordionIcon />
			</AccordionButton>
           <AccordionPanel pb={4}>
			<Text mb='8px'>{header.title}</Text>
			<Input
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
				onChange={(e) => setData({...data, [(header.title).toLowerCase()]: {"value" :e.target.value, "title":header.title}  })}
				size='sm'
			/>
			
			<Box mt={2}>
			<Text mb='8px'>{discription.title}</Text>
			<Input
				type='text'
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
				onChange={(e) => setData({...data, [(discription.title).toLowerCase()]: {"value" :e.target.value, "title":discription.title}  })}
				size='sm'
			/>
			</Box>

		   <Box mt={2}>
			<Text mb='8px'>{hight.title}</Text>
			<Input
				type='text'
				bg={'#FFFFFF'}
				color={'#4A5568'}
				borderRadius={8}
			    onChange={(e) => setData({...data, [(hight.title).toLowerCase()]: {"value" :e.target.value, "title":hight.title}  })}
				size='sm'
			/>
			</Box>

			   <Box mt={2}>
					<Text mb='8px'>{width.title}</Text>
					<Input
						type='text'
						bg={'#FFFFFF'}
						color={'#4A5568'}
						borderRadius={8}
			            onChange={(e) => setData({...data, [(width.title).toLowerCase()]: {"value" :e.target.value, "title":width.title}  })}
						size='sm'
					/>
			    </Box>
                 <Button colorScheme='teal' mt={4} width={'100%'} bg={'#FFD050'} variant='solid' onClick={handelSave}>
				   Save
				  </Button>
				</AccordionPanel>
				</AccordionItem>
				</Accordion>
			</Box>
		</>)
	}

const AddNewCategory = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
	const [ defualtTemplale, setdefualtTemplate] = useState([
	  {
		"section": featured_blog,
	    "section_id": "featured_blog",
		"section_title":"Featured Blog",
		"name": {"value": "Juan Dela Cruz", "title": "Name"},
		"discription" : {"value": "Posted on 27th January 2024", "title": "Discription"},
		"header":  {"value": "Step-by-step guide to choosing great font pairs", "title": "Header"},
		"width" : {"value": "100%", "title": "Width"},
		"height":  {"value": "100%", "title": "Height"}
	  },
	  {
		"section": featured_image,
	    "section_id": "featured_image",
		"section_title":"Featured Image",
		"image": {"value": "sample", "title": "Image"},
	    "width" : {"value": "100%", "title": "Width"},
		"height":  {"value": "100%", "title": "Height"}
	 },
	  {
		"section": featured_description,
        "section_id": "featured_discription",
		"section_title":"Featured Discription",
		"header":  {"value": "Step-by-step guide to choosing great font pairs", "title": "Header"},
		"discription" : {"value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.", "title": "Discription"},
		"width" : {"value": "100%", "title": "Width"},
		"height":  {"value": "100%", "title": "Height"}
	 }
	])
  const handleChangeStateTemplate = () => {
  
  }

  const [ add, setAdd ] = useState(false)
   return (
	<ChakraProvider>

   <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize={'xl'} fontWeight={'600'}>Categories</Box>
          </HStack>
          <Flex alignItems={'center'}>
			<Button
              bg={'#FFD050'} variant='solid'
              size={'md'}
		      color={'#ffffff'}
              mr={4}
			  leftIcon={<FaPlus/>}>
              Add New
            </Button>
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='unstyled' color='#2C5282' backgroundColor={'white'} borderRadius={'10px'} maxW={'99%'}>
    <Thead height={'20'} fontSize={'20em'}>
      <Tr >
        <Th  fontSize={'15px'}>Category Title</Th>
        <Th  fontSize={'15px'}>Date Created</Th>
		<Th  fontSize={'15px'}>Posts</Th>
		<Th  fontSize={'15px'}>Author</Th>
		<Th  fontSize={'15px'}></Th>
      </Tr>
    </Thead>

    <Tbody color='black' height={'xs'} >
      <Tr> 
        <Td fontSize={'1.2em'} fontWeight={'bold'}>Technology</Td>
        <Td >Updated 3 weeks ago</Td>
        <Td>12 Posts</Td>
		<Td>Joe Bloggs</Td>
		<Td fontSize={'20'}><FaEllipsisH></FaEllipsisH></Td>
      </Tr>
      <Tr>
        <Td fontSize={'1.2em'} fontWeight={'bold'}>Fashion</Td>
        <Td>Updated 3 weeks ago</Td>
        <Td>30 Posts</Td>
		<Td>Joe Bloggs</Td>
		<Td fontSize={'20'}><FaEllipsisH></FaEllipsisH></Td>
      </Tr>
      <Tr>
        <Td fontSize={'1.2em'} fontWeight={'bold'}>Food</Td>
        <Td>Updated 3 weeks ago</Td>
        <Td>08 Posts</Td>
		<Td>Joe Bloggs</Td>
		<Td fontSize={'20'}><FaEllipsisH></FaEllipsisH></Td>
      </Tr>
    </Tbody>
   
  </Table>
</TableContainer>) : (
  <>  {
		defualtTemplale.map((e, key) => (<>{<e.section key={e.section_id} handleChangeStateTemplate={handleChangeStateTemplate} name={e.name} hight={e.hight} header={e.header}  width={e.width} image={e.image} discription={e.discription} section_title={e.section_title} />} </>))
	  }

  </>)
}
 

</ChakraProvider>) 
}

export default AddNewCategory