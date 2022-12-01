import {SubmitHandler, useForm} from 'react-hook-form'
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import s from '../styles/components/loginForm.module.css'
import MainContainer from "../components/MainContainer";
import Link from "next/link";

interface formInterface {
  email: string,
  password: string,
  repeatPassword:string
}

const SignUpWithStore = () => {
  return (
    <MainContainer>
      <SignUp/>
    </MainContainer>
  )
}



const SignUp = () => {
  const dispatch = useDispatch()
  const isAuth = false
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: {errors},
    reset,
  } = useForm<formInterface>({
    mode: 'all',
  })
  const onSubmit = async (data) => {
    if((data.password,data.repeatPassword)) {
      //dispatch(setIsAuth(true))
      reset()
    }
  }
  if (isAuth) {
    return <Navigate to={'/Profile'}/>
  }

  return (
    <div className={s.body}>
      <h1>Sign up</h1>
      <div className={s.container}>
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
                required: "required filed",
                validate:value => value === getValues('password') || 'passwords must match'
              })}
                   onFocus={() => {
                     clearErrors('password')
                   }}
                   placeholder={"Password"}
                   type='password'
            />
            {errors.password && <span className={s.textField_errorMessage}>{errors.password.message}</span>}
          </div>
          <div className={s.textField}>
            <input className={s.textField_field} {...register('repeatPassword',
              {
                required: "required filed",
                validate: {
                  value:value => value === getValues('password') || 'error'
                }
              })}
                   onFocus={() => {
                     clearErrors('repeatPassword')
                   }}
                   placeholder={"Repeat password"}
                   type='password'
            />
            {errors.repeatPassword && <span className={s.textField_errorMessage}>{errors.repeatPassword.message}</span>}
          </div>
          <div className={s.loginButton}>
            <button className={s.loginButton_button}>Sign up</button>
          </div>
          <div className={s.changeFormLink}>
            <Link href={'/login'} className={s.changeFormLink_link}>Log in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpWithStore
