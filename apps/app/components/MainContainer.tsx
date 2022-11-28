import React from "react";
import s from '../styles/components/mainContainer.module.css'
import {Provider} from "react-redux";
import {store} from "../store/store";

const MainContainer = ({children}) => {
  return (
    <Provider store={store}>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.header}>
            <button>
              Login
            </button>
          </div>
          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default MainContainer
