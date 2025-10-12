import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'


function App() {


  const [ users, setUsers ] = useState<any[]>([])
  const [ albums, setAlbums ] = useState<any[]>([])
  const [ error, setError ] = useState<string | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)


  const getUsers = async() => {
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
        setError('Uknown error when fetching users')
      }
    }
  }

  const getAlbums = async () => {
    try {
      const resposne = await axios.get('http://jsonplaceholder.typicode.com/albums')
      console.log(resposne?.data)
      setAlbums(resposne?.data)
    }catch(error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        setError(error.message)
      }else if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Uknown error when fetching albmus")
      }
    }
  }


  const promiseAll = () => {
    setLoading(true)
    Promise.all([
      getUsers(),
      getAlbums()
    ]).finally(() =>  setLoading(false))
  }

  useEffect(() => {
    promiseAll()
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-gray-800 p-6">
        <h1 className="text-4xl font-bold text-gray-200 mb-6">Users List</h1>
  
        {/* Outer grid: displays user cards */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users && users.map(user => (
            <div
              key={user.id}
              className="bg-gray-700 border border-gray-500 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-600 transition"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-2">
                {user.username}
              </h2>
              <div className="grid grid-cols-1 gap-1">
                <p className="text-gray-200">
                  <span className="font-semibold text-gray-300">Email:</span> {user?.email}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-gray-300">Name:</span> {user?.name}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-gray-300">Phone:</span> {user?.phone}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-gray-300">Website:</span> {user?.website}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-gray-300">Company:</span> {user?.company?.name}
                </p>
              </div> 
            </div>
          ))}
  
          {error && (
            <div className="text-red-500 text-center col-span-full">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}

export default App
