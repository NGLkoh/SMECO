'use client';

import React from 'react';
import {
  Box,
  Text,
  ChakraProvider,
  Heading,
  List,
  ListItem,
  Link,
  VStack,
  Divider,
  Container,
} from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <ChakraProvider>
      <Box width="100%" backgroundColor="#f9f9f9" minHeight="100vh">
        <Container maxW="container.lg" paddingY={12}>
          {/* Header Section */}
          <Box textAlign="center" mb={8}>
            <Heading size="2xl" mb={4}>
              Privacy Policy
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="90%" marginX="auto">
              SMECO respects your privacy and is committed to protecting your
              personal data. This Privacy Policy explains how we collect, use,
              and safeguard your information in compliance with the Philippine
              Data Privacy Act of 2012 (Republic Act No. 10173).
            </Text>
          </Box>

          {/* Content Sections */}
          <VStack spacing={8} align="stretch">
            {[
              {
                title: '1. Information We Collect',
                description: 'We collect the following types of information:',
                items: [
                  'Personal Data: Name, email address, contact number, and other details provided during registration.',
                  'Business Data: Business name, type, location, and details of your products or services.',
                  'Usage Data: Information about how you use SMECO, such as logins, page visits, and preferences.',
                  'Cookies and Tracking Data: Information collected through cookies and similar technologies.',
                ],
              },
              {
                title: '2. How We Use Your Information',
                description:
                  'The information collected is used for the following purposes:',
                items: [
                  'To provide, operate, and maintain our system and services.',
                  'To communicate with you, including sending updates, notifications, and support.',
                  'To improve system functionality and user experience.',
                  'For marketing and promotional purposes, with your consent.',
                  'To comply with legal requirements.',
                  'Conducting analytics to improve system functionality.',
                ],
              },
              {
                title: '3. Use of Cookies',
                description:
                  'Cookies are small files stored on your device to enhance your experience on SMECO. We use cookies for:',
                items: [
                  'Session Management: To keep you logged in and improve navigation.',
                  'Performance Monitoring: To analyze system performance and usage trends.',
                  'Personalization: To remember your preferences and settings.',
                ],
                note:
                  'You can manage or disable cookies through your browser settings, but this may affect the functionality of SMECO.',
              },
              // Add other sections similarly...
            ].map((section, index) => (
              <Box
                key={index}
                padding={6}
                backgroundColor="white"
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="lg" mb={4} >
                  {section.title}
                </Heading>
                <Text fontSize="md" color="gray.700" mb={4}>
                  {section.description}
                </Text>
                <List spacing={3} pl={4}>
                  {section.items.map((item, i) => (
                    <ListItem key={i} fontSize="md" color="gray.600">
                      {item}
                    </ListItem>
                  ))}
                </List>
                {section.note && (
                  <Text fontSize="sm" color="gray.500" mt={4}>
                    {section.note}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>

          <Divider my={8} />

          {/* Footer Section */}
          <Box textAlign="center" mt={8}>
            <Text fontSize="sm" color="gray.500">
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </Text>
            <Text fontSize="sm" >
              Email:{' '}
              <Link href="mailto:Capeest.2021@gmail.com" fontWeight="bold">
                Capeest.2021@gmail.com
              </Link>
            </Text>
            <Text fontSize="sm">
              Phone:{' '}
              <Link href="tel:+639369940234" fontWeight="bold">
                +63 9369 940 234
              </Link>
            </Text>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default PrivacyPolicy;
