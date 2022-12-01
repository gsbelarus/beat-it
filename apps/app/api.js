const axios = require('axios')

const instance= axios.default.create({
  baseURL:"http://localhost:4201/"
})

export const setUser = (data) => {
  return instance.post('newUser',data)
}

export const signUp = (data) => {
  return instance.post('signUp',data)
}
