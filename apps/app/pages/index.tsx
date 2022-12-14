import MainContainer from '../components/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, Me, logOut } from '../store/slices/authSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import s from '../styles/pages/index.module.css';

const IndexWithStore = () => {
  return (
    <MainContainer>
      <Index />
    </MainContainer>
  );
};

const Index = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const router = useRouter();
  if (!isAuth) {
    if (typeof document !== 'undefined') {
      if (Cookies.get('userId') !== undefined) {
        const initializeUser = async () => {
          await dispatch(Me());
        };
        initializeUser();
        dispatch(setIsAuth(true));
      } else {
        router.push('/login');
      }
    }
  } else {
    if (userEmail === null) {
      return <div>Loading...</div>;
    }
    return (
      <div className={s.body}>
        <span className={s.text}>user email: {userEmail}</span>
        <div>
          <button
            className={s.logOutButton}
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }
};

export default IndexWithStore;
