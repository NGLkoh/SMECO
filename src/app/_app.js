
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, ChakraProvider, extendTheme} from '@chakra-ui/react'
import '../resources/css/style.css'
import Header from '../../components/header/index'

import ReactDOM from "react-dom";
import App from "./App";
import ReactGA from "react-ga4";

ReactGA.initialize("G-5SH1J2DZ49");

ReactDOM.render(<App />, document.getElementById("root"));
const theme = extendTheme({
	styles: {
	 global: () => ({
		body:{
		bg: ""
	 }})
	}
})

App.prototype = {
  component: PropTypes.any,
  pageProps: PropTypes.any
}

function App({pageProps}) {
  const Layout = Component.Layout || EmptyLayout
 return (<ChakraProvider theme={theme}> <Box><Layout> <Header/><Component {...pageProps} /> </Layout> </Box></ChakraProvider>)
}

const EmptyLayout = ({ children}) =>  <> {children} </>
export default App