import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {signUp,login} from "../../api";

const initialState = {
  isAuth: null
}

export const createNewUser = createAsyncThunk('auth/createNewUser',
  async (data) => {
    try {
      const resp = await signUp(data)
      if(resp.data.statusCode === 0) {
        return true
      }else{
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
  async (data,{dispatch}) => {
    try {
      const resp = await login(data)
      if(resp.data.statusCode === 0) {
        alert(resp.data.userId)
        dispatch(setIsAuth(true))
      }else{
        alert(resp.data.message)
      }
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
    }
  }
})

export const {setIsAuth} = authSlice.actions
export default authSlice.reducer
