import React from 'react'
import { Box} from '@chakra-ui/react'
import Navbar from '../nabvar'

export default function Template({children}) {
return (<Box>
     <Navbar/>
     <Box className='main'>{children}</Box>
</Box>)

}