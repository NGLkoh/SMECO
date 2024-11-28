'use client'

import React, { Component } from 'react'
import Template from '../../components/template/index'
import Navbar from '../../components/nabvar'

import PrivacyPolicy from '../../components/privacy-policy'
import Footer from '../../components/footer'


export default class index extends Component  {
  render () {
		return (<> 
	<Navbar page='homepage' />
   <PrivacyPolicy/>
	<Footer/>
	
	</>)
  }
}


index.layout = Template