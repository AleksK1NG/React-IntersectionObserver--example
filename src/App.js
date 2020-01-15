import React, { useState } from 'react'
import './App.css'
import { useBookSearch } from './useBookSearch'

const App = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { books, error, loading } = useBookSearch(query, pageNumber)

  const handleSearch = (e) => {
    console.log(e.target.value)
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="App">
      <input type="text" placeholder="Search" onChange={handleSearch} />
      {books?.map((book) => (
        <div key={book}>
          <p>{book}</p>
        </div>
      ))}

      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  )
}

export default App
