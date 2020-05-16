import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './calculator/Calculator';
import styles from './App.module.css';

function App() {
   return (
      <div className="App">
         <div className={'ui top fixed menu'}>
            <div className="item">
               <img alt="logo" src={logo}/>
               IndebtedLess
            </div>
         </div>
         <div className={styles.primaryContainer}>
            <Calculator/>
         </div>
      </div>
   );
}

export default App;
