import React, { useState, useRef, useCallback } from 'react'
import './App.css'
import { useBookSearch } from './useBookSearch'

const App = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const observerRef = useRef()

  const { books, error, loading, hasMore } = useBookSearch(query, pageNumber)

  const lastBookElementRef = useCallback(
    (node) => {
      // dont call api if we are loading
      if (loading) return
      // if observer already exists disconect, by deafult its null on first render
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries, observer) => {
        // if node is visible and hasMore check
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible entries => ', entries[0].target.innerHTML)
          // set page for pagination
          setPageNumber((prevState) => prevState + 1)
        }
      })
      // if last element exists
      if (node) observerRef.current.observe(node)
      console.log('lastBookElementRef => ', node)
    },
    [loading, hasMore],
  )

  const handleSearch = (e) => {
    console.log(e.target.value)
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="App">
      <input type="text" placeholder="Search" value={query} onChange={handleSearch} />
      {books?.map((book, index) => {
        // check last book and return it
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          )
        } else {
          return (
            <div key={book} key={book}>
              {book}
            </div>
          )
        }
      })}

      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  )
}

export default App
