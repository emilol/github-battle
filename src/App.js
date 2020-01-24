import React from 'react';
import './App.css';
import Popular from './components/Popular'
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className='container'>
          <Battle />
        </div>
      </ThemeProvider>
    )
  }
}
