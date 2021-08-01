import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch User Login Request
    dispatch({ type: USER_LOGIN_REQUEST })

    // After the request we wanna dispatch the user login, let's create a config object because when we're actually sending data, we wanna send in the headers a content type of application/json
    const config = {
      // This is also where we pass the token for our protected route
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    // Dispatch User Login Success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // Set User to Local Storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // Dispatch User Login fail
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    // Dispatch User Register Request
    dispatch({ type: USER_REGISTER_REQUEST })

    // After the request we wanna dispatch the user register, let's create a config object because when we're actually sending data, we wanna send in the headers a content type of application/json
    const config = {
      // This is also where we pass the token for our protected route
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    // Dispatch User Register Success
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    // Login the user right after the registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // Set User to Local Storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // Dispatch User Register fail
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    // Dispatch User Details Request
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    // After the request we wanna dispatch the user details, let's create a config object because when we're actually sending data, we wanna send in the headers a content type of application/json
    const config = {
      // This is also where we pass the token for our protected route
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    // Dispatch User details Success
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // Dispatch User Register fail
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    // Dispatch User Update Profile Request
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    // After the request we wanna dispatch the user details, let's create a config object because when we're actually sending data, we wanna send in the headers a content type of application/json
    const config = {
      // This is also where we pass the token for our protected route
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    // Dispatch User details Success
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // Dispatch User Register fail
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  // Remove from local storage
  localStorage.removeItem('userInfo')
  // Dispatch the action USER_LOGOUT
  dispatch({ type: USER_LOGOUT })
  // Reset the user orders and details
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
}
