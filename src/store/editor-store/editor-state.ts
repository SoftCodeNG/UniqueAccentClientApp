import { State, Selector, Action, StateContext } from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SetEditorView} from './editor.action';

export class EditorStateModel {
  editorView: string;
}

@Injectable()
@State<EditorStateModel>({
  name: 'Editor',
  defaults: {
    editorView: undefined
  },
})

export class EditorState {
  @Selector()
  static getEditorView(state: EditorStateModel): string {
    return state.editorView;
  }


  //   actions
  @Action(SetEditorView)
  setEditorView({ getState, setState }: StateContext<EditorStateModel>, { editorView }: SetEditorView): void {
    const state = getState();
    setState({
      ...state,
      editorView,
    });
  }
}
