

'use client'

import React, { useState } from 'react'
import {TableContainer , Table, useDisclosure, Flex, Accordion, AccordionButton,AccordionItem , AccordionIcon , AccordionPanel, Thead,IconButton, HStack, Box,  Tr, Th, Button,  ChakraProvider, Tbody, Td, Text, Input  } from '@chakra-ui/react'
import Head from 'next/head'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";
import { FaTrash } from 'react-icons/fa'; 
const fileTypes = ["JPG", "PNG", "GIF"];
 
 const featured_image = ({ name, hight, width, image, section_title, handleChangeStateTemplate }) => {
	const [file, setFile] = useState(null);
    const [data, setData] = useState({})

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
		let dataNew = {...data, "image": {"value": file , "title": "image"}} 
		handleChangeStateTemplate(dataNew)
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
				onChange={(e) => setData({...data,[(hight.title).toLowerCase()]: {"value" :e.target.value, "title":hight.title}})}
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
						onChange={(e) => setData({...data,[(width.title).toLowerCase()]: {"value" :e.target.value, "title":width.title}})}
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
        const [data, setData] = useState({ 
	    "section_id": "featured_blog",
		"section_title": section_title})
		const handelSave = () => {
			handleChangeStateTemplate(data)
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
 const [data, setData] = useState({
       })
		const handelSave = () => {
			handleChangeStateTemplate(data)
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

const Template = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
	const [ templale, setTemplate] = useState([])
	const [ defualtTemplale, setdefualtTemplate] = useState([
	  {
		"section": featured_blog,
	    "section_id": "featured_blog",
		"section_title":"Featured Blog",
		"name": {"value": "Juan Dela Cruz", "title": "Name"},
		"discription" : {"value": "Posted on 27th January 2024", "title": "Discription"},
		"header":  {"value": "Step-by-step guide to choosing great font pairs", "title": "Header"},
		"width" : {"value": "100%", "title": "Width"},
		"hight":  {"value": "100%", "title": "Hight"}
	  },
	  {
		"section": featured_image,
	    "section_id": "featured_image",
		"section_title":"Featured Image",
		"image": {"value": "sample", "title": "Image"},
	    "width" : {"value": "100%", "title": "Width"},
		"hight":  {"value": "100%", "title": "Hight"}
	 },
	  {
		"section": featured_description,
        "section_id": "featured_discription",
		"section_title":"Featured Discription",
		"header":  {"value": "Step-by-step guide to choosing great font pairs", "title": "Header"},
		"discription" : {"value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.", "title": "Discription"},
		"width" : {"value": "100%", "title": "Width"},
		"hight":  {"value": "100%", "title": "Hight"}
	 }
	])

  const handleChangeStateTemplate = (data) => {
	setTemplate([{...templale, data}])
  }
  const handleTemplateSave = () => {
	console.log(templale)
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
            <Box fontSize={'xl'} fontWeight={'600'}>Create Template</Box>
          </HStack>
          <Flex alignItems={'center'}>
			{add  ? <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => setAdd(false)}>
              Back
            </Button> <Button
              bg={'#FFD050'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => handleTemplateSave()}>
              Save Template
            </Button></> : <><Button
              bg={'#232536'} variant='solid'
			  color={'#ffffff'}
			  size={'md'}
              mr={4}
			 onClick={(e) => setAdd(true)}>
              Add
            </Button></> }
		
			<Button
              bg={'#FFD050'} variant='solid'
              size={'md'}
		      color={'#ffffff'}
              mr={4}
			  leftIcon={<FaTrash />}>
              Delete
            </Button>
           
          </Flex>
        </Flex>

{ add == false ? (<TableContainer>
  <Table variant='striped' colorScheme='$F7FAFC'>
    <Thead>
      <Tr  background='#232536' color={'white'}>
        <Th  color={'white'}>Title</Th>
        <Th  color={'white'}>Date Created</Th>
        <Th  color={'white'} isNumeric>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td >inches</Td>
        <Td >millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td color={'black'}>yards</Td>
        <Td color={'black'}>metres (m)</Td>
        <Td  color={'black'} isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
   
  </Table>
</TableContainer>) : (
  <>  {
		defualtTemplale.map((e) => (<Box key={e.section_id}>{<e.section  handleChangeStateTemplate={handleChangeStateTemplate} name={e.name} hight={e.hight} header={e.header}  width={e.width} image={e.image} discription={e.discription} section_title={e.section_title} />} </Box>))
	  }

  </>)
}
 

</ChakraProvider>) 
}

export default Template