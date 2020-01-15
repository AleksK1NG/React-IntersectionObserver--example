import { useEffect } from 'react'
import axios from 'axios'

export const useBookSearch = (query, pageNumber) => {
  useEffect(() => {
    let cancel

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        // if error from axios cancel return
        if (axios.isCancel(error)) return
      })

    return () => {
      // cancel request every time useEffect recalls
      cancel()
    }
  }, [query, pageNumber])
  return null
}
