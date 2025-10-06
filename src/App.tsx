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
      console.error(error)
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-gray800 p-6">
        <h1 className="text-4xl font-bold text-gray-200 mb-6">Users List</h1>
        <div className="w-full max-w-5xl bg-gray-700 shadow-lg rounded-2xl p-4 grid grid-cols-2 gap-2">
          { users && users?.map(user => (
            <div key={user.id}>
              <p className='text-lg font-semibold  text-white '>User: <span className='text-green-500 hover:bg-gray-800 cursor-pointer'>{user?.username}</span></p>
            </div>
          )
        )}

          {error && <div className="text-red-500 text-center ">{error}</div>}
        </div>
      </div>
      
    </>
  )
}

export default App
