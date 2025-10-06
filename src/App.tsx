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
      <div className="text-red-500">
        <h1 className="font-bolder text-green flex justify-center items-center underline">Users List</h1>
        <div>
          { users && users?.map(user) => (
            <div key={users.id}>
              <p>User<span>{users?.username}</span></p>
            </div>
          )}

          {error && <div className="text-red-500 font-bold border bg-amber-600">{error.messae}</div>}
        </div>
      </div>
      
    </>
  )
}

export default App
