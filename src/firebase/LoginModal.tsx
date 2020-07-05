import React, {useEffect} from 'react';
import {Modal} from "semantic-ui-react";
import {initFirebaseUI} from "./firebase";

const firebaseInjectElId = 'firebaseui';

interface Props {
   setIsOpen: (a: boolean) => void;
}

function LoginModal(props: Props) {
   useEffect(() => {
      const el = document.querySelector('#firebaseui');
      if (el) {
         initFirebaseUI(el);
      }
   }, []);

   return (
      <Modal trigger={undefined} open>
         <Modal.Header>Login</Modal.Header>
         <Modal.Content>
            <div id='firebaseui' />
         </Modal.Content>
      </Modal>
   );
}

export default LoginModal;