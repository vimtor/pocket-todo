import { useHistory, useParams, useLocation } from 'react-router-dom'

export const useRouter = () => {
  const history = useHistory()
  const params = useParams()
  const location = useLocation()

  return {
    navigate: history.push,
    goBack: history.goBack,
    pathname: history.location.pathname,
    search: location.search,
    listen: history.listen,
    params,
  }
}

export { BrowserRouter as RouterProvider } from 'react-router-dom'
