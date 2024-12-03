'use client'

import React from 'react'
import {Box, Container , Text} from '@chakra-ui/react'

interface ColumnProps {
  content? : string;
  title?: string;
}
const ColumnCenter = ({content, title} : ColumnProps) => {
   return (<Box height={'auto'} w={'100%'} paddingLeft={'20%'} paddingRight={'20%'} pb={'4%'} pt={'4%'}>
		<Box>
		 <Text fontSize={'2xl'} fontWeight={600}>
		   {
			title ? title : <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</>} 
			
		</Text>
		<Container fontSize={'12px'}>
			{content ? content : <>There are many benefits to a joint design and development system. Not only
						does it bring benefits to the design team, but it also brings benefits to
						engineering teams. It makes sure that our experiences have a consistent look
						and feel, not just in our design specs, but in production</>
			} 
		</Container>
        </Box>
    </Box>)
}

export default ColumnCenter