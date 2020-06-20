import React, {useState} from "react";
import FormModal from "./Modal";
import {Debt} from "../models/Debt";
import {Button, Card, Form, Grid, Icon, Input, Label} from "semantic-ui-react";
import styles from './DebtPanel.module.css';
import {sumBy} from 'lodash';

interface Props {
   debts: Debt[];
   upsertDebt: (d: Debt) => void;
   deleteDebt: (name: string) => void;
   budget: number;
   setBudget: (n: number) => void;
}

function DebtPanel(props: Props) {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [debtToEdit, setDebtToEdit] = useState<Debt | undefined>()

   return (
      <div className={styles.root}>
         <Form>
            <Form.Field>
               <label>Monthly Budget</label>
               <Input labelPosition='right' type='number' placeholder='Budget'>
                  <Label basic>$</Label>
                  <input value={props.budget}
                         onChange={e => props.setBudget(e.target.valueAsNumber)}

                         min={sumBy(props.debts, d => d.minPayment)}
                  />
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
                        <div>${d.principal} at {d.rate}%</div>
                     </Grid.Column>
                     <Grid.Column width={6} style={{ verticalAlign: 'middle', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button icon onClick={() => {
                           setDebtToEdit(d);
                           setIsOpen(true);
                        }}>
                           <Icon name='edit' />
                        </Button>
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
                  <FormModal isOpen={isOpen}
                             setIsOpen={setIsOpen}
                             upsertDebt={props.upsertDebt}
                             {...debtToEdit}
                  />
               </span>
            </Card.Content>
         </Card>
      </div>
   );
}

export default DebtPanel;