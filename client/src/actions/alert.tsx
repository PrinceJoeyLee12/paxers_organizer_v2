import { SET_BACKDROP, SET_DIALOG_BOX } from './types';

export const setBackdrop = (state: Boolean) => async (dispatch: any) => {
  dispatch({
    type: SET_BACKDROP,
    payload: state,
  });
};

export const setDialogBox =
  (state: any, title: any) => async (dispatch: any) => {
    dispatch({
      type: SET_DIALOG_BOX,
      payload: {
        isOpen: state,
        title,
      },
    });
  };
