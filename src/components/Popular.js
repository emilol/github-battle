import React from 'react'
import LanguagesNav from './LanguagesNav'
import ReposGrid from './ReposGrid'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

function popularReducer (state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true
    }
  } else if (action.type === 'success') {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: 'Error fetching data. Try again',
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

function useFetch(selectedLanguage) {
  const [state, dispatch] = React.useReducer(
    popularReducer, 
    { error: null, loading: true }
  )

  const repos = React.useRef([])
  
  React.useEffect(() => {
    if (repos.current.includes(selectedLanguage)) return;
    repos.current.push(selectedLanguage)

    dispatch({ type: 'fetch' })

    fetchPopularRepos(selectedLanguage)
      .then((data) => 
        dispatch({ type: 'success', selectedLanguage, repos: data })
      )
      .catch((error) => {
        console.warn('Error fetching repos:', error)
        dispatch({ type: 'error'})
      })
  }, [selectedLanguage, repos])

  return state
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All')
  const { [selectedLanguage]: repos, loading, error } = useFetch(selectedLanguage)

  return <React.Fragment>
    <LanguagesNav 
      selected={selectedLanguage}
      onUpdateLanguage={setSelectedLanguage}
    />

    {loading && <Loading text='Fetching Repos' />}

    {error && <p className='center-text error'>{error}</p>}

    {repos && <ReposGrid repos={repos} />}
  </React.Fragment>
}