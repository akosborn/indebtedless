import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './calculator/Calculator';
import styles from './App.module.css';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import classNames from "classnames";
import {initFirebaseUI} from "./firebase/firebase";
import {auth, User} from "firebase";
import { Button } from 'semantic-ui-react';
import * as firebaseui from 'firebaseui';
import LoginModal from "./firebase/LoginModal";

function App() {
   useEffect(() => {
      auth().onAuthStateChanged(u => {
         setUser(u || undefined);
      });
   }, []);

   const [user, setUser] = useState<User>();
   const [loginOpen, setLoginOpen] = useState<boolean>(false);

   return (
      <div>
         <Menu stackable>
            <Menu.Item>
               <img alt="logo" src={logo}/>
               IndebtedLess
            </Menu.Item>

            <Menu.Item
               name='sign-in'
               position='right'
            >
               {user ?
                  <Button onClick={() => {
                     auth().signOut()
                        .then(() => {
                           firebaseui.auth.AuthUI.getInstance()?.delete()
                              .then(d => {
                                 const el = document.querySelector('#firebaseui');
                                 if (el) {
                                    initFirebaseUI(el);
                                 }
                              });
                        })
                  }}>
                     Logout
                  </Button> :
                  <Button onClick={() => setLoginOpen(true)}>
                     Login
                  </Button>
               }
            </Menu.Item>
         </ Menu>
         {loginOpen && <LoginModal setIsOpen={setLoginOpen} />}
         <div className={classNames(styles.primaryContainer, 'App')}>
            <Calculator/>
         </div>
      </div>
   );
}

export default App;
