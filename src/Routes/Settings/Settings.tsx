import React, { Component, ReactElement } from 'react'
import Footer from 'Common/Footer'
import homeDataStore from 'Model/HomeDataStore'
import ISettings from './Interfaces/ISettings'
import SettingsPresenter from './SettingsPresenter'
import SideNav from 'Common/SideNav'
import './style.css'

type State = {
  userSettings: ISettings
}

const presenter = new SettingsPresenter(homeDataStore)
class Settings extends Component<{}, State> {
  state = {
    userSettings: {
      birthdate: '',
      city: '',
      state: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getUserSettings()
  }

  render(): ReactElement {
    const { userSettings } = this.state

    return (
      <div id='settings'>
        <SideNav />
        <h1>Settings</h1>
        <div className='settings-content'>
          <div>
            <span>First Name: </span> {userSettings.firstName}
          </div>
          <div>
            <span>Last Name: </span> {userSettings.lastName}
          </div>
          <div>
            <span>Email Name: </span> {userSettings.email}
          </div>
          <div>
            <span>Age: </span> {userSettings.birthdate}
          </div>
          <div>
            <span>City: </span> {userSettings.city}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  getUserSettings = async (): Promise<void> => {
    const settings = await presenter.getUserSettings()
    this.setState({ userSettings: settings })
  }
}

export default Settings
