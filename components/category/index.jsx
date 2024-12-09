'use client';

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Card, ChakraProvider, Heading, CardBody, Button, useMediaQuery, Spinner, Alert, AlertIcon, Link } from "@chakra-ui/react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching categories
  const [error, setError] = useState(""); // Error state to handle API failures
  const [isLargerThan980] = useMediaQuery("(min-width: 980px)");

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true); // Set loading state to true
    try {
      const res = await axios.post("/api/category/all");
      const uniqueCategories = Array.from(
        new Map(res.data.result.map((cat) => [cat.title, cat])).values()
      );
      setCategories(uniqueCategories);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (e) {
      console.error(e);
      setError("Failed to load categories. Please try again later.");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const redirectToCategoryPage = (categoryId) => {
    // Replace this with your navigation logic (e.g., using react-router's useNavigate)
    window.location.href = `/category/${categoryId}`; // For basic navigation
  };

  return (
    <ChakraProvider>
      <Box width="100%" height={isLargerThan980 ? "523px" : "auto"} w="100%">
        <Box m="10%">
          <Box width="80%" margin="auto">
            <Text
              align="center"
              fontSize="30px"
              fontFamily="sans-serif"
              fontWeight={600}
              marginBottom={10}
            >
              List of Categories
            </Text>

            {/* Display loading spinner */}
            {loading ? (
              <Box textAlign="center">
                <Spinner size="lg" />
              </Box>
            ) : error ? (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            ) : (
              <div className="slider-container">
                <Slider
                  infinite={true}
                  speed={200}
                  slidesToShow={isLargerThan980 ? 4 : 1}
                  slidesToScroll={isLargerThan980 ? 4 : 1}
                  autoplay={true}
                >
                  {categories.map((category) =>
                    category.title ? (<Link href={`/category-page/${category._id},${category.title}`} key={category._id}>
                      <div >
                        <Card
                          textAlign="center"
                          w="100%"
                          display="inline-block"
                          cursor="pointer"
                          onClick={() => redirectToCategoryPage(category._id)} // Use onClick to redirect to category page
                        >
                          <CardBody>
                            <Heading mb={2} fontSize="25px" size="lg" fontWeight={600}>
                              {category.title}
                            </Heading>
                            <Button mt={4} colorScheme="yellow">
                              View Posts
                            </Button>
                          </CardBody>
                        </Card>
                      </div>
                    </Link>
                    ) : null
                  )}
                </Slider>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Category;
