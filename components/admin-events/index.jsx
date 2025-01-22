
import React, { useEffect, useState } from 'react';
import { Text, Box, Textarea, Button, useToast, Input, Image, HStack, TableContainer, Thead, Tr, Th, Table, Tbody, Td  } from '@chakra-ui/react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import moment from 'moment';
import ModalImage from '../modal/viewModalImage'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import EditEvent from '../modal/editEvent'
import ModalUserEvent from '../modal/viewListOfEventUsers'
const fileTypes = ["JPG", "PNG", "GIF"];

const AdminEvents = ({user}) => {
  console.log(user, "USER ID")
  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  const [source, setSource] = useState("");
  const [fileName, setFileName] = useState("");
  const [selected, setSelected] = useState({});
  const [description, setDescription] = useState();
  const [modalEditEvent, setModalEditEvent] = useState(false);
  const [viewUSers, setViewUSers] = useState(false);
  const [users, setUsers] = useState(false);
  const toast = useToast()

  useEffect(() => {
    getEvent()
  }, []);

 const closeEditEventModal = () => {
    setModalEditEvent(false)
 }

  const closeModalUSers = () => {
    setViewUSers(false)
 }
  
 const handleViewUser = (data) => {
    setUsers(data)
    setViewUSers(true)
 }
  
  const getEvent = async () => {

    try {
        setEvent([])
      const res = await axios.post('/api/event/event');

     res.data.result.map(async(row) => { 
     let userListName = []
       row.users.map(async(userId) => { 
         const resUser = await axios.post('/api/users/getProfilePicture', {
         id: userId,
      });
           resUser.data.result.map(user => userListName.push(`${user.firstName} ${user.lastName}`))
      })
      
        setEvent(oldState => [...oldState, {...row, usersList : userListName}])
    })
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChange = async (file)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${file.name}`)
           new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
              setFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

  const handleAddEvent = async () => {
    try{ 
        await axios.post('/api/s3/upload', {filename: fileName, base64: file})
        await axios.post('/api/event/create', {
        id: user._id,
        title: title,
        fileName: fileName,
        description: description
      });

        toast({
          title: 'Success Created Event', 
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })

      setTitle("")
      getEvent();
     } catch(e){
         toast({
          title: 'Error Created Event' + e, 
          status: 'warning',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
   }     
  };
   
   const handleOpenModal = (title, source) => {
      setOpen(true)
      setTitle(title)
      setSource(source)
   }

   const onCloseModal = () => {
     setOpen(false)
    }

  const handleEdit = (e) => {
    console.log(e)
	setSelected(e)
	setModalEditEvent(true)
  }

       console.log(event)

  const handleDelete =  async(id) => {
    await axios.post('/api/event/remove', { id: id })
    toast({
      title: "Are you sure?",
      description: "Do you really want to delete this event?",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: 'top',
      render: () => (
        <Box color="white" p={3} bg="red.500" borderRadius="md">
          <Button onClick={() => confirmDelete(id)} colorScheme="red">Yes, Delete</Button>
          <Button ml={3} onClick={() => toast.closeAll()}>Cancel</Button>
        </Box>
      ),
    });
  };

   const confirmDelete = (postId) => {
    // Logic to delete the post, likely an API request or state update
    console.log('Deleting post with ID:', postId);
    setEvent(event.filter(post => post._id !== postId)); // Remove post from state
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Box >
		<HStack spacing={8} alignItems={'center'}>
		  <Box fontSize={'xl'} fontWeight={'600'}>Announcement</Box>
		</HStack>

      <Box mt={2}>
        <Text>Banner</Text>
       <FileUploader name="file" handleChange={(e) => handleChange(e)} types={fileTypes} />
       <Text mt={2} >Title</Text>
       <Input  mt={2} border={'2px solid #dddddd'} onChange={(e) => setTitle(e.target.value)} />

        <Text mt={2}>Description</Text>
       <Textarea mt={2} border={'2px solid #dddddd'} onChange={(e) => setDescription(e.target.value)} />

       <Button mt={2} color={'#ffffff'} background={'#ffb509'} onClick={() => handleAddEvent()}> Add </Button>
     </Box> 
    <TableContainer mt={6}>
     	<Table variant='simple' border={'2px solid #dddddd'}>
			<Thead border={'2px solid #dddddd'}>
			<Tr border={'2px solid #dddddd'}>
				<Th border={'2px solid #dddddd'}>Title</Th>
                <Th border={'2px solid #dddddd'}>Banner</Th>
                <Th border={'2px solid #dddddd'}>Description</Th>
				<Th border={'2px solid #dddddd'}>Users</Th>
				<Th border={'2px solid #dddddd'}>Date</Th>
                <Th border={'2px solid #dddddd'}>Action</Th>
			</Tr >
			</Thead>
			<Tbody border={'2px solid #dddddd'}>

          {
          event ?  event.map(e => <Tr key={e._id}>
				<Td border={'2px solid #dddddd'}>{e.title}</Td>
				<Td > <Image
			height="60px"
             ml={2}
			onClick={ ()  => handleOpenModal('Banner', e.fileName)}
			cursor={'pointer'}
            display={'inline-block'}
			src={`https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${e.fileName}`}
			/>   </Td>
                <Td border={'2px solid #dddddd'}>{e.description}</Td>
                <Td border={'2px solid #dddddd'}><Text cursor={'pointer'} onClick={() => handleViewUser(e.usersList)}> View Participant</Text></Td>
				<Td border={'2px solid #dddddd'}>{e.date ? moment(e.date).calendar() :  "N/A"}</Td>
                <Td border={'2px solid #dddddd'}> <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} mr={4} onClick={() => handleEdit(e)}>
                  <FaPen/>
                </Button>
                 <Button bg={'black'} variant="solid" color={'#ffffff'} size={'md'} mr={4} onClick={() => handleDelete(e._id)}>
                  <FaTrash/>
                </Button></Td>
			</Tr> ) : ""
          }
			
			</Tbody>
		</Table>
		</TableContainer>
      <ModalUserEvent  title={'Users'} open={viewUSers} onCloseModal={closeModalUSers} users={users}/>
      <ModalImage open={open} onCloseModal={onCloseModal} source={source} title={title}/>
      <EditEvent modalEditEvent={modalEditEvent}  closeEditEventModal={closeEditEventModal} refresh={getEvent} editState={selected}/>
     </Box>
  );
};

export default AdminEvents;
