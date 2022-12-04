import {signUp} from "../api.ts";

const trueData={
  email:'sashazernin1@gmail.com',
  password:1234
}

const falseData1={
  email: 'sashazernin1@gmail.com'
}

const falseData2={
  email:'sashazernin1@gmail.com',
  password:1234,
  age:123
}

it('singUp should return ok',async () => {
  const res = await signUp(trueData)
  expect(res.data.message).toBe('ok')
})

it('signUp should return error1', async () => {
  const res = await signUp(falseData1)
  expect(res.data.message).toBe('you must pass the object:{\'email\':email,\'password\':password}')
})

it('signUp should return error2', async () => {
  const res = await signUp(falseData2)
  expect(res.data.message).toBe('you must pass the object:{\'email\':email,\'password\':password}')
})

it('signUp should return error3', async () => {
  const res = await signUp({})
  expect(res.data.message).toBe('you must pass the object:{\'email\':email,\'password\':password}')
})
