import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import DebtPanel from "./DebtPanel";
import MediaGallery from "./MediaGallery";
import {Debt} from "../models/Debt";

function Calculator() {
   const [debts, setDebts] = useState<Debt[]>([]);
   const [budget, setBudget] = useState<number>(0);

   return (
      <Grid columns={2} divided>
         <Grid.Column width={3}>
            <DebtPanel deleteDebt={name => setDebts(deleteDebtByName(debts, name))}
                       debts={debts}
                       addDebt={debt => setDebts(addDebt(debts, debt))}
                       budget={budget}
                       setBudget={setBudget}
            />
         </Grid.Column>
         <Grid.Column width={13}>
            <MediaGallery budget={budget}
                          debts={debts}
            />
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