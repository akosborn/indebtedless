import React from "react";
import FormModal from "./Modal";
import {Debt} from "../models/Debt";
import {Button, Card, Form, Grid, Icon, Input, Label} from "semantic-ui-react";
import styles from './DebtPanel.module.css';
import {sumBy} from 'lodash';

interface Props {
   debts: Debt[];
   addDebt: (d: Debt) => void;
   deleteDebt: (name: string) => void;
   budget: number;
   setBudget: (n: number) => void;
}

function DebtPanel(props: Props) {
   return (
      <div className={styles.root}>
         <Form>
            <Form.Field>
               <label>Monthly Budget</label>
               <Input labelPosition='right' type='number' placeholder='Budget'>
                  <Label basic>$</Label>
                  <input value={props.budget} onChange={e => props.setBudget(e.target.valueAsNumber)} />
                  <Label>.00</Label>
               </Input>
            </Form.Field>
         </Form>
         <Card className={styles.card}>
            <Card.Content header='Loans' />
            {props.debts.map(d =>
               <Card.Content>
                  <Grid columns={2}>
                     <Grid.Column width={10}>
                        <div>{d.name}</div>
                        <div>${d.principal} at {d.rate * 100}%</div>
                     </Grid.Column>
                     <Grid.Column width={6} style={{ verticalAlign: 'middle', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button icon onClick={() => props.deleteDebt(d.name)}>
                           <Icon name='delete' />
                        </Button>
                     </Grid.Column>
                  </Grid>
               </Card.Content>
            )}
            <Card.Content extra style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <span>
                  ${sumBy(props.debts, v => v.principal)}
               </span>
               <span>
                  <FormModal addDebt={props.addDebt}/>
               </span>
            </Card.Content>
         </Card>
      </div>
   );
}

export default DebtPanel;