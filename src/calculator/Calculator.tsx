import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import DebtPanel from "./DebtPanel";
import MediaGallery from "./MediaGallery";

function Calculator() {
   const [balance, setBalance] = useState(0);
   const [payment, setPayment] = useState(0);
   const [rate, setRate] = useState(0);

   return (
      <Grid columns={2} divided>
         <Grid.Column width={3}>
            <DebtPanel balance={balance} setBalance={setBalance} payment={payment} setPayment={setPayment} rate={rate} setRate={setRate} />
         </Grid.Column>
         <Grid.Column width={13}>
            <MediaGallery balance={balance} payment={payment} rate={rate / 100 / 12} />
         </Grid.Column>
      </Grid>
   );
}

export default Calculator;