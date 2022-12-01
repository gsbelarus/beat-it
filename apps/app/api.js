import {headers} from "next/headers";

const axios = require('axios')

const instance = axios.default.create({
  baseURL: "http://localhost:4201/",
  withCredentials:true
})

export const auth = {
  signUp(data){
    return instance.post('signUp', data)
  },
  login(data){
    return instance.post('login', data)
  },
  logout(){
    return instance.delete('login')
  },
  me(){
    return instance.get('me')
  }
}
