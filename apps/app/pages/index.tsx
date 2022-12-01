import MainContainer from "../components/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "../store/slices/authSlice";
import {useRouter} from "next/router";

const IndexWithStore = () => {
  return (
    <MainContainer>
      <Index/>
    </MainContainer>
  )
}

const Index = () => {
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()
  const router = useRouter()
  dispatch(setIsAuth(false))
  if(isAuth == null){
    return (
      <div>
        Loading...
      </div>
    )
  }
  console.log(!isAuth)
  if(!isAuth){
    router.push('/login')
  }else{
    return(
      <div>
        user
      </div>
    )
  }
}

export default IndexWithStore;
