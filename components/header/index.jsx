'use client'
import Head from 'next/head'
import React from 'react'

const Header = () => {
   return (<Head>
  {/* Google tag (gtag.js) */}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5SH1J2DZ49"></script>
         <script
            dangerouslySetInnerHTML={{
               __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-5SH1J2DZ49');
               `,
            }}
         ></script>
		<meta name="description" content="Discover innovative strategies and tools to boost your brand's visibility and engagement."/> 	
		<link rel="canonical" href="https://www.markadongpinoy.com/"/> 	
		<meta property="og:locale" content="en_US"/> 	
		<meta property="og:type" content="website"/> 	
		<meta property="og:title" content="Elevate your Business Marketing Game"/> 	
		<meta property="og:description" content="Discover innovative strategies and tools to boost your brand's visibility and engagement."/> 	
		<meta property="og:url" content="https://www.markadongpinoy.com/"/> 	
		<meta property="og:site_name" content="Markadongpinoy Site"/> 	
		<meta property="article:modified_time" content="2024-11-07T04:07:00+00:00"/> 
		<meta property="og:image" content="https://www.markadongpinoy.com/BANNER2.png"/> 
		<meta property="og:image:width" content="1111"/> 	
		<meta property="og:image:height" content="646"/> 	
		<meta property="og:image:type" content="image/png"/> 	
		<meta name="twitter:card" content="summary_large_image"/> 
			<meta name="twitter:image" content="https://www.markadongpinoy.com/BANNER2.png"/> 
   </Head>)
}

export default Header