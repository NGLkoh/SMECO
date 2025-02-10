

'use client'

import React, {useState, useEffect} from 'react'
import {Modal , ModalOverlay, Text,useToast, ModalContent, ModalHeader, ModalCloseButton,Input,Textarea,  ModalBody , ModalFooter, Button} from '@chakra-ui/react'
import axios from "axios";
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";
import ReactSearchBox from 'react-search-box';

const HandleB2BChat =  ({userId, modalB2B, closeB2BModal, getMessage}) => {
   const [ Id, setId] = useState()
   const [ name, setName] = useState()
   const [ description, setMessage] = useState()
   const [records, setRecords ] = useState([])
   const toast = useToast()

  useEffect(() => {
      getUser();
  }, []);


   const handleCreateChat = async () => {
		try{ 
		let res = await axios.post('/api/message/create-guest', {
			userId: userId,
			message:  description,
			name: name,
			id: Id
		});
        toast({
		title: "Already Succefully create message",
		description: "Successfully create message",
		status: "success",
		duration: 2000,
		isClosable: true,
		});
         getMessage()
		} catch(e) {
		
	}
	}

 const getUser = async () => {
    try {
      const res = await axios.post('/api/users/users');
      let result = res.data.result;
		result.map((row) =>
		setRecords((oldState) => [
			...oldState,
			{ key: `${row.firstName} ${row.lastName ? row.lastName : ""}`, value: `${row.firstName} ${row.lastName ? row.lastName : ""}`, id: row._id },
		])
		);
		setName("")
		setId("")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal isOpen={modalB2B} onClose={() => closeB2BModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Message</ModalHeader>
          <ModalCloseButton />
           
          <ModalBody>
               <Text fontSize={11} mt={2} mb={2}>Name:  </Text>
                  {
                   Id ? <Input disabled="true" value={name}/> : <ReactSearchBox
						placeholder="Search Here1"
						data={records}
                        value={name}
						onSelect={(record) => {
                            console.log(record, "DATA")
                            setId(record.item.id)
							setName(record.item.key)
						//   window.location.href = record.item.link;
						}}
						onFocus={() => {
						  console.log('This function is called when is focused');
						}}
						onChange={(value) => console.log(value)}
						autoFocus
						inputBoxStyles={{
						  height: '40px',
						  padding: '10px 15px',
						  border: '1px solid #ccc',
						  borderRadius: '5px',
						  fontSize: '14px',
						  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						  width: '100%', // Full width for mobile
						}}
					  />
                  }
	             
               <Text fontSize={11} mt={2} mb={2}>Message:</Text>
               <Textarea onChange={(e) => setMessage(e.target.value)} />

          </ModalBody>

          <ModalFooter>
			 <Button mr={3} onClick={() => handleCreateChat()}>
              Send Message
            </Button>
            <Button variant='ghost' mr={3} onClick={() => closeB2BModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HandleB2BChat