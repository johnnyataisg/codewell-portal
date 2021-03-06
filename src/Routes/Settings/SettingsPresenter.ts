import { updateUser } from 'Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'
import IProfile from './Interfaces/IProfile'
import ISettingsPresenter from './ISettingsPresenter'

class SettingsPresenter implements ISettingsPresenter {
  private readonly fetcher: IFetcher
  private readonly homeDataStore: IHomeDataStore

  constructor(fetcher: IFetcher, homeDataStore: IHomeDataStore) {
    this.fetcher = fetcher
    this.homeDataStore = homeDataStore
  }

  public async getUserProfile(): Promise<IProfile> {
    if (Object.keys(this.homeDataStore.home.userData).length === 0) {
      await this.homeDataStore.syncHomeData(this.fetcher, true)
    }
    return this.homeDataStore.home.userData as IProfile
  }

  public async updateUserProfile(newProfile: IProfile): Promise<string> {
    const response = await this.fetcher.fetch({
      body: newProfile,
      method: 'PUT',
      url: updateUser
    })
    if (response.errorType) {
      return response.message
    } else {
      await this.homeDataStore.syncHomeData(this.fetcher, false)
      return 'Successfully updated user profile'
    }
  }
}

export default SettingsPresenter
