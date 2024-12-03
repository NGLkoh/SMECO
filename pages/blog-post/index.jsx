'use client'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
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
	<Footer/>
	
	</>)
  }
}


index.layout = Template