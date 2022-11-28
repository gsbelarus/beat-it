import React from "react";
import {SubmitHandler, useForm} from 'react-hook-form'
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import s from '../styles/Components/loginForm.module.css'
import {setIsAuth} from "../store/slices/authSlice";

interface formInterface {
  email: string,
  password: string
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const isAuth = false
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: {errors},
    reset,
  } = useForm<formInterface>({
    mode: 'all',
  })
  const onSubmit = data => {
    dispatch(setIsAuth(true))
    reset()
  }

  if (isAuth) {
    return <Navigate to={'/Profile'}/>
  }

  return (
    <div className={s.body}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textField}>
          <input className={s.textField_field} {...register('email',
            {
              required: "required filed",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter the valid email'
              }
            })}
                 onFocus={() => {
                   clearErrors('email')
                 }}
                 placeholder={"Email"}
                 type='text'
          />
          {errors.email && <span className={s.textField_errorMessage}>{errors.email.message}</span>}
        </div>
        <div className={s.textField}>
          <input className={s.textField_field} {...register('password',
            {
              required: "required filed"
            })}
                 onFocus={() => {
                   clearErrors('password')
                 }}
                 placeholder={"Password"}
                 type='password'
          />
          {errors.password && <span className={s.textField_errorMessage}>{errors.password.message}</span>}
        </div>
        <div className={s.loginButton}>
          <button className={s.loginButton_button}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
