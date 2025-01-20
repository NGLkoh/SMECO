'use client'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Banner from '../../components/banner'
import Category from '../../components/category/index'
import Graphics from '../../components/graphics/index'
import ImageBanner from '../../components/imagebanner'
import ListAuthor from '../../components/listAuthors'
import Footer from '../../components/footer'

export default class index extends Component  {
  render () {
		return (<> 
		
	<Navbar page='homepage' />
	<Banner/>
	<Graphics/>

	<Category/>
	<ImageBanner/>
	<ListAuthor/>
	<Footer/>
	
	</>)
  }
}


index.layout = Template