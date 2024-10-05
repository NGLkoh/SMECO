'use client'

import React, { Component } from 'react'
import { Center, Box } from '@chakra-ui/react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Banner from '../../components/banner'
import Category from '../../components/category/index'
import FeaturedPost from '../../components/featuredPost/index'
import Content from '../../components/content/index'
import ImageBanner from '../../components/imagebanner'
import ColumnCenter from '../../components/column_center'
import Footer from '../../components/footer'
import FeaturedBlog from '../../components/featured_blog'
import FeaturedImage from '../../components/featured_image'
export default class index extends Component  {
  render () {
		return (<> 
	<Navbar page='homepage' />
	<FeaturedBlog/>
	<FeaturedImage/>
	<ColumnCenter/>
     {/* <Content/>
	<Category/>
	<ImageBanner/>
	<ListAuthor/> */}
	<Footer/>
	
	</>)
  }
}


index.layout = Template