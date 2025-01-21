'use client';
import FeaturedPost from '../../components/featuredPost/index'
import React from 'react';
import { Image, Box, Icon, Text, SimpleGrid, Heading } from '@chakra-ui/react';
import { FaLightbulb, FaHandshake, FaBullhorn, FaPen, FaPaperPlane, FaCheckCircle, FaShareAlt } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';
const Graphics = () => {
  const featuresSmall = [
    {
      icon: FaLightbulb,
      title: "Marketing Tool",
      description: "Create engaging blog posts that showcase your business offerings, share updates, and connect with your audience.",
      delay: "0.2s",
    },
    {
      icon: FaHandshake,
      title: "User Engagement",
      description: "Allow visitors to comment on your blog posts, like content, and easily share it across their social media networks. ",
      delay: "0.4s",
    },
    {
      icon: FaBullhorn,
      title: "Product Promotion",
      description: "Elevate your brand by promoting your products directly through our platform. Promote your product listings with your blog posts to engage your audience. ",
      delay: "0.6s",
    },
  ];

  const featuresBig = [
    {
      image: 'https://img.freepik.com/free-vector/referral-program-abstract-concept-vector-illustration-referral-marketing-method-friend-recommendation-acquire-new-customer-product-promotion-social-media-influencer-loyalty-abstract-metaphor_335657-2939.jpg?t=st=1737266558~exp=1737270158~hmac=2cca4180d7d8a3dabacd76b13370d3773bbef22ef0b7c64f6e31402f99d02662&w=826',
      title: "Engage Your Audience",
      description: "Leverage our platform to connect with your customers and grow your reach effectively.",
      reverse: false,
    },
    {
      image: 'https://img.freepik.com/free-vector/business-leader-standing-arrow-holding-flag-flat-vector-illustration-cartoon-people-training-doing-business-plan-leadership-victory-challenge-concept_74855-9812.jpg?t=st=1737266434~exp=1737270034~hmac=15d3ed5e30eda24a5ffc14ffadb62936dd34fdf989e243b61f2aea61aa90f528&w=996',
      title: "Grow Your Business",
      description: "Maximize your potential with tools and support that help you scale your business.",
      reverse: true,
    },
  ];

  const steps = [
    { icon: FaPen, title: "Write", description: "Start by sharing your unique value with the world. This one step will help you clearly communicate what makes your business stand out." },
    { icon: FaPaperPlane, title: "Post", description: "Regularly post about what you do and how it benefits your audience. Consistency is key to keeping your business top of mind." },
    { icon: FaCheckCircle, title: "Review", description: "Take time to review your marketing efforts. See what’s working and what’s not, so you can refine your strategy and keep growing your reach." },
    { icon: FaShareAlt, title: "Share", description: "Don’t hesitate to share your success stories, tips, and updates. The more you share, the more your business will grow through word of mouth and increased visibility." },
  ];

  return (
    <>
      <Box width={"100%"} height={"auto"} position={"relative"} padding="2% 0 0 0">
        {/* Heading Section */}
        <Box textAlign="center" py={10}>
          <Heading as="h1" size="xl" marginBottom={4}>
            Welcome to Markadong Pinoy
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Empowering Local Businesses with Tools, Platforms, and Free Resources.
          </Text>
        </Box>

        {/* Features Small Section */}
        <section>
          <Box paddingY={20} paddingX={20} padding={["0 5%", "0 10%", "0 20%"]}>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {featuresSmall.map((feature, index) => (
                <Box
                  marginBottom={5}
                  key={index}
                  backgroundColor="white"
                  padding={6}
                  borderRadius="16px"
                  boxShadow="md"
                  transition="transform 0.3s"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                  textAlign="center"
                  paddingTop={'50px'}
                  height={"auto"}
                >
                  <Icon as={feature.icon} boxSize={12} color="#ffd050" paddingBottom={4} />
                  <Heading as="h5" size="md" marginBottom={2}>
                    {feature.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </section>

        <FeaturedPost />

        {/* Work Process Section */}
        <section className="mini" id="work-process" style={{ backgroundColor: '#ffd050', width: '100%' }}>
          <Box textAlign="center" py={10} px={["10%", "10%", "15%"]}>
            <Heading as="h1" size="xl" marginBottom={4} color="gray.700">
              Work Process
            </Heading>
            <Text fontSize="md" marginBottom={8} color="gray.600">
              Follow our structured steps to ensure your business thrives. We simplify the journey.
            </Text>

            <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
              {steps.map((step, index) => (
                <Box
                  key={index}
                  backgroundColor="white"
                  padding={6}
                  borderRadius="md"
                  boxShadow="md"
                  textAlign="center"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "lg", transition: "0.3s ease" }}
                >
                  <Icon as={step.icon} boxSize={12} color="#ffd050" marginBottom={4} />
                  <Text fontWeight="bold" marginBottom={2} fontSize="lg">
                    {step.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {step.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </section>

        {featuresBig.map((feature, index) => (
          <section key={index}>
            <Box 
              display="flex" 
              flexDirection={feature.reverse ? "row-reverse" : "row"} 
              alignItems="center" 
              py={10} 
              paddingTop={'20px'}
              paddingBottom={'20px'}
              padding={["0 10%", "0 15%", "0 20%"]}
              justifyContent={["center", null, null]}
            >
              <Box flex={1} textAlign="center">
                <LazyLoad height={200}>
                  <Image src={feature.image} alt={feature.title} boxSize="90%" marginBottom={4} />
                </LazyLoad>
              </Box>
              <Box flex={1} padding={4} textAlign="center">
                <Heading as="h2" size="lg" marginBottom={4}>
                  {feature.title}
                </Heading>
                <Text>{feature.description}</Text>
              </Box>
            </Box>
          </section>
        ))}
      </Box>
    </>
  );
};

export default Graphics;
