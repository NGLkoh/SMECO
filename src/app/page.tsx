'use client'
import React, {useState, useEffect} from 'react'

export default function Page() {

 	useEffect(() => {
      window.location.href = "http://localhost:3000/homepage";
	}, [])

  return <h1></h1>
}