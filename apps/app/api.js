const axios = require('axios')

const instance= axios.default.create({
  baseURL:"http://localhost:4201/"
})

export const getUser = () => {
  return instance.get('getUser')
}

export const setUser = (data) => {
  return instance.post('newUser',data)
}
