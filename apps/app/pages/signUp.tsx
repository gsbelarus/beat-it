import {SubmitHandler, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from "react-redux";
import s from '../styles/pages/LoginAndSignUpForm.module.css'
import MainContainer from "../components/MainContainer";
import Link from "next/link";
import {createNewUser} from "../store/slices/authSlice";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

interface formInterface {
  email: string,
  password: string,
  repeatPassword: string
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
  const router = useRouter()
  const isAuth = useSelector(state => state.auth.isAuth)
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
    if ((data.password, data.repeatPassword)) {
      const result = await dispatch(createNewUser({email: data.email, password: data.password}))
      if (result) {
        router.push('/login')
      }
      reset()
    }
  }
  if (isAuth || Cookies.get('userId') !== undefined) {
    router.push('/')
  }

  return (
    <div className={s.body}>
      <h1 className={s.text}>Sign up</h1>
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
                  value: value => value === getValues('password') || 'passwords must match'
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
