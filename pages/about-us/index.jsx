'use client'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'
import Content from '../../components/content/index'
import ListAuthor from '../../components/listAuthors'
import Footer from '../../components/footer'
export default class index extends Component  {
    render () {
		return (<> 
		
	<Navbar page='about-us'/>
	
      <Content/>
	{/*<Category/>
	<ImageBanner/>*/}
	<ListAuthor/> 
	<Footer/>
	
	</>)
  }
}


index.layout = Template