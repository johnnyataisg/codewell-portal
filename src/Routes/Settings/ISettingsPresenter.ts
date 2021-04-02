import IProfile from './Interfaces/IProfile'

interface ISettingsPresenter {
  getUserProfile(): Promise<IProfile>
  updateUserProfile(newProfile: IProfile): Promise<void>
}

export default ISettingsPresenter
