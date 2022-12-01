import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuth:null
}



const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setIsAuth: (state,action) => {
      state.isAuth = action.payload
    }
  }
})

export const {setIsAuth} = authSlice.actions
export default authSlice.reducer
