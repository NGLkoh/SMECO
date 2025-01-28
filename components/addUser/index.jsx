import React, { useState, useEffect } from 'react';
import { 
  TableContainer, 
  Table, 
  Select, 
  useDisclosure, 
  Flex, 
  useToast, 
  Thead, 
  IconButton, 
  HStack, 
  Box, 
  Tr, 
  Th, 
  Button, 
  ChakraProvider, 
  Tbody, 
  Td, 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogContent, 
  AlertDialogOverlay 
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import axios from "axios";
import AddSubUserIndex from './add';
import { FaTrash, FaEye } from 'react-icons/fa'; 
import ModalImage from '../modal/viewModalImage';
import moment from 'moment';

const AddSubUserAdmin = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState('');
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for the delete confirmation dialog
  const [deletingUserId, setDeletingUserId] = useState(null); // Store user ID for deletion

  const cancelRef = React.useRef();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.post('/api/users/users');
      setUsers(res.data.result);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post('/api/users/remove', { id: deletingUserId });
      toast({
        title: 'Successfully Deleted',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      getUser(); // Refresh users after deleting
      setIsDeleteConfirmOpen(false); // Close the dialog after deletion
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error deleting user',
        description: 'There was an error while deleting the user. Please try again.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (title, source) => {
    setOpen(true);
    setTitle(title);
    setSource(source);
  };

  const handleConfirmUser = async (id, value, name) => {
    const res = await axios.post('/api/users/verify-user', { id: id, value: value });
    toast({
      title: `Successfully Update Status for: ${name}`,
      status: 'success',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    });
    console.log(res);
    getUser();
  };

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
          <Box fontSize={'xl'} fontWeight={'600'}>View Users</Box>
        </HStack>
        <Flex alignItems={'center'} />
      </Flex>

      {add === false ? (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr background="#232536" color={'white'}>
                <Th color={'white'}>Name</Th>
                <Th color={'white'}>Email</Th>
                <Th color={'white'}>Uploaded ID</Th>
                <Th color={'white'}>Business Permit</Th>
                <Th color={'white'}>Barangay Clearance</Th>
                <Th color={'white'}>User Type</Th>
                <Th color={'white'}>Date Created</Th>
                <Th color={'white'}>Verify</Th>
                <Th color={'white'}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users && users.map((e) => (
                e.userType !== "admin" && (
                  <Tr key={e._id}>
                    <Td>{e.firstName} {e.lastName}</Td>
                    <Td>{e.email}</Td>
                    <Td>
                      <Button
                        bg={'black'} variant='solid'
                        color={'#ffffff'}
                        size={'md'}
                        onClick={() => handleOpenModal('Identification Card', e.ID)}
                        mr={4}
                      >
                        <FaEye />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        bg={'black'} variant='solid'
                        color={'#ffffff'}
                        size={'md'}
                        onClick={() => handleOpenModal('Business Permit', e.businessPermit)}
                        mr={4}
                      >
                        <FaEye />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        bg={'black'} variant='solid'
                        color={'#ffffff'}
                        size={'md'}
                        onClick={() => handleOpenModal('Barangay Clearance', e.barangayClearance)}
                        mr={4}
                      >
                        <FaEye />
                      </Button>
                    </Td>
                    <Td>{e.userType}</Td>
                    <Td>{moment(e.dateCreated).calendar()}</Td>
                    <Td>
                      <Select
                        placeholder='Select option'
                        onChange={(r) => handleConfirmUser(e._id, r.target.value, `${e.firstName} ${e.lastName}`)}
                        value={e.active}
                        width={'150px'}
                      >
                        <option value={false}>unverify</option> 
                        <option value={true}>verified</option>
                      </Select>
                    </Td>
                    <Td position={'relative'}>
                      <Box display={'inline'}>
                        <Button
                          bg={'black'} variant='solid'
                          onClick={() => {
                            setDeletingUserId(e._id); // Set the user ID for deletion
                            setIsDeleteConfirmOpen(true); // Show the confirmation dialog
                          }}
                          color={'#ffffff'}
                          size={'md'}
                          mr={4}
                        >
                          <FaTrash />
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                )
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Box position={'relative'} height={'auto'}>
            <AddSubUserIndex user={user} getTemplate={getTemplate} setAdd={setAdd} />
          </Box>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Yes, Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <ModalImage open={open} onCloseModal={onCloseModal} source={source} title={title} />
    </ChakraProvider>
  );
};

export default AddSubUserAdmin;
