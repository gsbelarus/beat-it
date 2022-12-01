import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {auth} from "../../api";

const initialState = {
  isAuth: false,
  email: null
}

export const createNewUser = createAsyncThunk('auth/createNewUser',
  async (data) => {
    try {
      const resp = await auth.signUp(data)
      if (resp.data.statusCode === 0) {
        return true
      } else {
        alert(resp.data.message)
        return false
      }
    } catch (err) {
      alert(err)
      return false
    }
  }
)
export const logIn = createAsyncThunk('auth/logIn',
  async (data) => {
    try {
      const resp = await auth.login(data)
      if (resp.data.statusCode !== 0) {
        alert(resp.data.message)
      }
    } catch (err) {
      alert(err)
    }
  }
)
export const Me = createAsyncThunk('auth/Me',
  async (data, {dispatch}) => {
    try {
      const resp = await auth.me()
      dispatch(setEmail(resp.data.email))
    } catch (err) {
      alert(err)
    }
  }
)

export const logOut = createAsyncThunk('auth/Me',
  async (_, {dispatch}) => {
    try {
      const resp = await auth.logout()
      dispatch(setEmail(null))
      dispatch(setIsAuth(false))
    } catch (err) {
      alert(err)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const {setIsAuth, setEmail} = authSlice.actions
export default authSlice.reducer
