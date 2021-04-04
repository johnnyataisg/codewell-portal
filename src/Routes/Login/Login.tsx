import React, { Component, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import loginIllustration from '../../images/login.svg'
import LoginPresenter from './LoginPresenter'
import './style.css'

type State = {
  error: string
  isLoading: boolean
  password: string
  username: string
}

class Login extends Component<{}, State> {
  state = {
    error: '',
    isLoading: false,
    password: '',
    username: ''
  }

  render(): ReactElement {
    const { error, isLoading } = this.state

    return (
      <div id='login'>
        <div className='login-illustration'>
          <div className='login-image'>
            <h1>Codewell Learning</h1>
            <h2>Student Portal</h2>
            <img alt='login' className='login' src={loginIllustration} />
          </div>
        </div>
        <div className='login-input'>
          <form onSubmit={this.submit} id='login-form'>
            <div className='login-inputGroup'>
              <p className='login-error'>{error}</p>
              <div className='login-username'>
                <label htmlFor='username'>User name: </label>
                <input type='text' id='username' name='username' onChange={this.updateUsername} />
              </div>
              <div className='login-password'>
                <label htmlFor='password'>Password: </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={this.updatePassword}
                />
                <div>
                  <Link to={{ pathname: `/forgotPassword` }}>forgot password?</Link>
                </div>
              </div>
              {isLoading ? (
                <button className='button' type='submit' disabled>
                  Logging In...
                </button>
              ) : (
                <button className='button' type='submit'>
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }

  updateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value })
  }

  updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value })
  }

  submit = async (event: React.FormEvent): Promise<void> => {
    const { password, username } = this.state
    event.preventDefault()

    const params = {
      username: this.saferUserInput(username),
      password: this.saferUserInput(password)
    }

    await this.login(params)
  }

  saferUserInput = (value: string): string => {
    if (
      value.toLowerCase().indexOf('and') !== -1 &&
      value.indexOf('1=') !== -1 &&
      value.indexOf('--') !== -1
    ) {
      return value.replace(/1=/g, '').replace(/--/g, '')
    }

    return value
  }

  login = async (params: any) => {
    this.setState({ isLoading: true })
    const { password, username } = params
    const loginPresenter = new LoginPresenter(new Fetcher())
    await loginPresenter.login(username, password)

    if (Cookies.get('auth')) {
      window.location.pathname = '/'
    } else {
      this.setState({ error: 'Invalid username or password' })
    }

    this.setState({ isLoading: false })
  }
}

export default Login
