import { State, Selector, Action, StateContext } from '@ngxs/store';
import {GetAllProfile} from './profile.action';
import {Injectable} from '@angular/core';

export class ProfileStateModel {
  allProfile: any[];
}

@Injectable()
@State<ProfileStateModel>({
  name: 'Profile',
  defaults: {
    allProfile: []
  },
})

export class ProfileState {
  @Selector()
  static getAllProfile(state: ProfileStateModel): any[] {
    return state.allProfile;
  }


  //   actions
  @Action(GetAllProfile)
  setApplicationTheme({ getState, setState }: StateContext<ProfileStateModel>, { allProfile }: GetAllProfile): void {
    const state = getState();
    setState({
      ...state,
      allProfile,
    });
  }
}
