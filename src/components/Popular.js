import React from 'react'
import LanguagesNav from './LanguagesNav'
import { fetchPopularRepos } from '../utils/api'
 
class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null,
    })

    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null
      }))
      .catch((error) => {
        console.warn('Error fetching repos:', error)

        this.setState({
          error: `There was an error fetching repositories.`
        })
      })
  }

  isLoading() {
    return this.state.repos === null && this.state.error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state
    return <React.Fragment>
      <LanguagesNav 
        selected={selectedLanguage}
        onUpdateLanguage={this.updateLanguage}
      />

      {this.isLoading() && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
    </React.Fragment>
  }
}

export default Popular;
