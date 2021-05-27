import api from '../utils/api';
import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';

// import { getAuthMenuItems, getGuestMenuItems } from './menuItems';

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
export const loadUser = () => async (dispatch: any) => {
  try {
    const res = await api.get('/auth');
    //  dispatch(getAuthMenuItems());
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// @route    GET api/auth/google
// @desc     Register User using Google Oauth
// @access   Public
export const googleSignIn = (setResponse: any) => async (dispatch: any) => {
  try {
    await api.get('/auth/google');
    dispatch(loadUser());
  } catch (err) {
    setResponse(err.response.data.msg, err.response.status);
  }
};

// @route    POST api/user/register
// @desc     Register User
// @access   Public
export const register =
  (formData: {}, setResponse: any) => async (dispatch: any) => {
    try {
      const res = await api.post('/user/register', formData);
      setResponse('', res.status, {});
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      setResponse(
        err.response.data.msg,
        err.response.status,
        err.response.data.errors
      );
    }
  };

// @route    POST api/auth/login
// @desc     Login in user
// @access   Public
export const login =
  (formData: {}, setResponse: any) => async (dispatch: any) => {
    try {
      const res = await api.post('/auth/login', formData);
      setResponse('', res.status, {});
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      setResponse(
        err.response.data.msg,
        err.response.status,
        err.response.data.errors
      );
    }
  };

// @route    POST api/auth/forgotPassword
// @desc     Forgot Password
// @access   Public
export const forgotPassword =
  (formData: {}, setResponse: any) => async (dispatch: any) => {
    try {
      const res = await api.post('/auth/forgot-password', formData);
      setResponse(
        'We already sent you an link, Please check your inbox.',
        res.status,
        {}
      );
    } catch (err) {
      setResponse(
        err.response.data.msg,
        err.response.status,
        err.response.data.errors
      );
    }
  };

// @route    POST api/auth/reset-password
// @desc     Reset Password
// @access   Private
export const resetPassword =
  (formData: {}, setResponse: any) => async (dispatch: any) => {
    try {
      const res = await api.post('/auth/reset-password', formData);
      setResponse(
        'You successfully reset your password try to login.',
        res.status
      );
    } catch (err) {
      setResponse(err.response.data.msg, err.response.status);
    }
  };

export const logout = () => async (dispatch: any) => {
  localStorage.removeItem('prevPath');
  dispatch({ type: LOGOUT });
  //   dispatch(getGuestMenuItems());
};
