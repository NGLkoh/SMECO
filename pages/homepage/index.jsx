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
import ListAuthor from '../../components/listAuthors'
export default class index extends Component  {
  render () {
		return (<> 
	<Navbar/>
	<Banner/>
	<FeaturedPost/>
     <Content/>
	<Category/>
	<ImageBanner/>
	<ListAuthor/>
	</>)
  }
}


index.layout = Template