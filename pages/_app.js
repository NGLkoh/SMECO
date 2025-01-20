import React from "react";
import{ Box, ChakraProvider, extendTheme} from '@chakra-ui/react'
import PropTypes from  'prop-types'
import { useState } from "react";
import { Component } from "react";
import Header from "../components/header";

const theme = extendTheme({
 styles: {
  global: () => ({
   body: {
     bg: "",
    } 
  })
 }
})

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
}

function App({ Component, pageProps}){

const Layout = Component.Layout || EmptyLayout;

 return (<ChakraProvider theme={theme}>
      <Header/>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
    </ChakraProvider>)
}

const EmptyLayout = ({children}) =>  <> {children}</>

export default App