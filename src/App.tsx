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

function App() {
   useEffect(() => {
      const el = document.querySelector('#firebaseui');
      if (el) {
         initFirebaseUI(el);
         setInitialized(true);
      }

      auth().onAuthStateChanged(u => {
            setUser(u || undefined);
            if (!u && !initialized) {
               const el = document.querySelector('#firebaseui');
               if (el) {
                  initFirebaseUI(el);
               }
            }
         }
      );
   }, []);

   const [user, setUser] = useState<User>();
   const [initialized, setInitialized] = useState<boolean>(false);

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
                  <Button onClick={() => auth().signOut()}>
                     Logout
                  </Button> :
                  <div id='firebaseui' />
               }
            </Menu.Item>
         </ Menu>
         <div className={classNames(styles.primaryContainer, 'App')}>
            <Calculator/>
         </div>
      </div>
   );
}

export default App;
