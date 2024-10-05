

'use client'

import React from 'react'
import {Text , Box, Input} from '@chakra-ui/react'
import Head from 'next/head'

const InputCustom = (props: any) => {
   console.log(props)
   return (<Box margin={"auto"} p={2}>  
			<Box mt={2} >
			<Text mb='8px'>{props.data.title}</Text>
			<Input
				value={props.data.value}
				// value={value}
				// onChange={handleChange}
				bg={'#FFFFFF'}
				onChange={(e) =>  props.data.function(e.target.value)}
				color={'#4A5568'}
				borderRadius={8}
				placeholder={props.data.placeholder}
				size='sm'
			/>
			</Box>  
		</Box>) 
}

export default InputCustom

