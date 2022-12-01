const axios = require('axios')

const instance= axios.default.create({
  baseURL:"http://localhost:4201/"
})

export const signUp = (data) => {
  return instance.post('signUp',data)
}
export const login = (data) => {
  return instance.post('login',data)
}
