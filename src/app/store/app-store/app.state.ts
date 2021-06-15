import { State, Selector, Action, StateContext } from '@ngxs/store';
import {SetDecodedToken, SetHeaderVisibility, SetRefreshToken, SetToken} from './app.action';
import {Injectable} from '@angular/core';

export class AppStateModel {
  headerVisibility: string;
  token: string;
  refreshToken: string;
  decodedToken: any;
}

@Injectable()
@State<AppStateModel>({
  name: 'App',
  defaults: {
    headerVisibility: 'visible',
    token: '',
    refreshToken: '',
    decodedToken: {}
  },
})

export class AppState {
  @Selector()
  static getHeaderState(state: AppStateModel): string {
    return state.headerVisibility;
  }

  @Selector()
  static getToken(state: AppStateModel): string {
    return state.token;
  }

  @Selector()
  static getRefreshToken(state: AppStateModel): string {
    return state.refreshToken;
  }

  @Selector()
  static getDecodedToken(state: AppStateModel): string {
    return state.decodedToken;
  }

  //   actions
  @Action(SetHeaderVisibility)
  setHeaderVisibility({ getState, setState }: StateContext<AppStateModel>, { headerVisibility }: SetHeaderVisibility): void {
    const state = getState();
    setState({
      ...state,
      headerVisibility,
    });
  }

  @Action(SetToken)
  setToken({ getState, setState }: StateContext<AppStateModel>, { token }: SetToken): void {
    const state = getState();
    setState({
      ...state,
      token,
    });
  }

  @Action(SetRefreshToken)
  setRefreshToken({ getState, setState }: StateContext<AppStateModel>, { refreshToken }: SetRefreshToken): void {
    const state = getState();
    setState({
      ...state,
      refreshToken,
    });
  }

  @Action(SetDecodedToken)
  setDecodedToken({ getState, setState }: StateContext<AppStateModel>, { decodedToken }: SetDecodedToken): void {
    const state = getState();
    setState({
      ...state,
      decodedToken,
    });
  }


}
