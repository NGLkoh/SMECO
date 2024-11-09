'use client'

import React, { Component } from 'react'
import { Center, Box } from '@chakra-ui/react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Banner from '../../components/banner'
import Category from '../../components/category/index'
import FeaturedPost from '../../components/featuredPost/index'
import Content from '../../components/content/index'
import FeaturedSecond from '../../components/blog-featured-second/index'
import BlogFeatured from '../../components/blog-featured/index'
import Footer from '../../components/footer'


export default class index extends Component  {
  render () {
		return (<> 
	<Navbar/>
	 <BlogFeatured/>
     <FeaturedSecond/>
	<Footer/>
	</>)
  }
}


index.layout = Template