'use client'

import React, { useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import InputCustom from '../../components/inputs/index';

const AddSubUserIndex = ({ user, getTemplate, setAdd }) => {
  const toast = useToast();
  const [firstName, setFirstname] = useState(String);
  const [lastName, setlastName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  let fields = [
    {
      function: setFirstname,
      title: 'Enter First Name',
      placeholder: 'Juan',
      value: firstName,
    },
    {
      function: setlastName,
      title: 'Enter Last Name',
      placeholder: 'Dela Cruz',
      value: lastName,
    },
    {
      function: setEmail,
      title: 'Enter Sub User Email',
      placeholder: 'business@gmail.com',
      value: email,
    },
    {
      function: setPassword,
      title: 'Create your Password',
      placeholder: '@!#$$%',
      value: password,
    },
  ];

  const handleVerify = async () => {
    const res = await axios.post('/api/users/add-subUser', {
      ids: user,
      username: email,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      code: 1234,
      businessPermit: user.businessPermit,
      barangayClearance: user.barangayClearance,
    });

    if (res.data.message === 'true') {
      toast({
        title: 'Successfully Email Sent ',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      setAdd(false);
      getTemplate();
    } else {
      toast({
        title: 'Error Server',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box w="100%" maxW="600px" > {/* Center the box and set a max width */}
        {fields.map((row) => (
          <Box mb={1} key={row.title}> {/* Add spacing between text fields */}
            <InputCustom
              data={row}
              width="100%" // Set the width of the text fields
            />
          </Box>
        ))}
        <Button
          bg={'#FFD050'}
          w={'100%'} // Set the button to full width
          color={'white'}
          onClick={(e) => handleVerify(e)}
          _hover={{
            bg: '#232536',
          }}
        >
          Create
        </Button>
      </Box>
    </>
  );
};

export default AddSubUserIndex;
