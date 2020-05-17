import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import DebtPanel from "./DebtPanel";
import MediaGallery from "./MediaGallery";
import {Debt} from "../models/Debt";

function Calculator() {
   const [balance, setBalance] = useState(0);
   const [payment, setPayment] = useState(0);
   const [rate, setRate] = useState(0);
   const [debts, setDebts] = useState([] as Debt[]);

   return (
      <Grid columns={2} divided>
         <Grid.Column width={3}>
            <DebtPanel deleteDebt={name => setDebts(deleteDebtByName(debts, name))} debts={debts} addDebt={debt => setDebts(addDebt(debts, debt))} balance={balance} setBalance={setBalance} payment={payment} setPayment={setPayment} rate={rate} setRate={setRate} />
         </Grid.Column>
         <Grid.Column width={13}>
            <MediaGallery balance={balance} payment={payment} rate={rate / 100 / 12} />
         </Grid.Column>
      </Grid>
   );
}

function addDebt(debts: Debt[], newDebt: Debt): Debt[] {
   return [...debts, newDebt];
}

function deleteDebtByName(debts: Debt[], nameToDelete: string): Debt[] {
   return debts.filter(d => d.name !== nameToDelete);
}

export default Calculator;