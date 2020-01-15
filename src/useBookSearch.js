import { useEffect, useState } from 'react'
import axios from 'axios'

export const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    let cancel
    setLoading(true)

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevState) => {
          const newState = [...new Set([...prevState, ...res.data.docs.map((book) => book.title)])]
          return newState
        })
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
      })
      .catch((error) => {
        // if error from axios cancel return
        if (axios.isCancel(error)) return
        setError(true)
        setLoading(false)
      })

    return () => {
      // cancel request every time useEffect recalls
      cancel()
    }
  }, [query, pageNumber])
  return { loading, books, error }
}
