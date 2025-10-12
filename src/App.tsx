import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState<any[]>([])
  const [albums, setAlbums] = useState<any[]>([])
  const [photos, setPhotos] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const photosPerPage = 20

  const getUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (error) {
      handleError(error, 'fetching users')
    }
  }

  const getAlbums = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
      setAlbums(response.data)
    } catch (error) {
      handleError(error, 'fetching albums')
    }
  }

  const getPhotos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
      setPhotos(response.data)
    } catch (error) {
      handleError(error, 'fetching photos')
    }
  }

  const handleError = (error: unknown, context: string) => {
    console.error(error)
    if (axios.isAxiosError(error)) {
      setError(`Axios error while ${context}: ${error.message}`)
    } else if (error instanceof Error) {
      setError(`Error while ${context}: ${error.message}`)
    } else {
      setError(`Unknown error while ${context}`)
    }
  }

  const promiseAll = () => {
    setLoading(true)
    Promise.all([getUsers(), getAlbums(), getPhotos()]).finally(() => setLoading(false))
  }

  useEffect(() => {
    promiseAll()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(photos.length / photosPerPage)
  const startIndex = (currentPage - 1) * photosPerPage
  const currentPhotos = photos.slice(startIndex, startIndex + photosPerPage)

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-gray-800 p-6">
        <h1 className="text-4xl font-bold text-gray-200 mb-6">Users List</h1>

        {/* USERS */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-700 border border-gray-500 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-600 transition"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-2">{user.username}</h2>
              <div className="grid grid-cols-1 gap-1 text-gray-200">
                <p><span className="font-semibold text-gray-300">Email:</span> {user.email}</p>
                <p><span className="font-semibold text-gray-300">Name:</span> {user.name}</p>
                <p><span className="font-semibold text-gray-300">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold text-gray-300">Website:</span> {user.website}</p>
                <p><span className="font-semibold text-gray-300">Company:</span> {user.company?.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ALBUMS */}
        <div className="grid grid-cols-4 w-full max-w-6xl gap-2 mt-5">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border border-gray-500 rounded-2xl bg-gray-700 p-2 hover:bg-gray-600"
            >
              <h1 className="text-white">
                Title: <span className="text-green-500">{album.title}</span>
              </h1>
            </div>
          ))}
        </div>

        {/* PHOTOS (Paginated) */}
        <div className="grid grid-cols-6 w-full max-w-6xl gap-2 mt-10">
          {currentPhotos.map((photo) => (
            <div
              key={photo.id}
              className="border border-gray-500 rounded-2xl bg-gray-700 hover:bg-gray-600 p-2 flex flex-col items-center"
            >
              <img
                className="rounded-lg mb-2"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
              <p className="text-xs text-gray-200 text-center">{photo.title}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* ERROR */}
        {error && <div className="text-red-500 text-center col-span-full mt-4">{error}</div>}
      </div>
    </>
  )
}

export default App
