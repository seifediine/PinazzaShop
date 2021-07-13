import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants'

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
