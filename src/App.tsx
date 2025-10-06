import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'


function App() {


  const [ users, setUsers ] = useState<any[]>([])
  const [ error, setError ] = useState<string | null>(null)


  const getData = async() => {
    try {
      const response = await axios.get('http://jsonplaceholder.typicode.com/users')
      console.log(response?.data)
      setUsers(response?.data)
    }catch(error)  {
      if (axios.isAxiosError(error)) {
        setError(error.message)
      } else if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Uknown error')
      }
    }
  }


  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
      <div className="text-red-500">x</div>
      
    </>
  )
}

export default App
