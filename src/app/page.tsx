'use client'
import React, { useEffect} from 'react'

export default function Page() {

 	useEffect(() => {
      window.location.href = "/homepage";
	}, [])

  return <h1></h1>
}