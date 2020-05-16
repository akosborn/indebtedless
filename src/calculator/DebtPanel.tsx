import React from "react";
import {Form, Input, Label} from "semantic-ui-react";

interface Props {
   balance: number;
   setBalance: (v: number) => void;
   payment: number;
   setPayment: (v: number) => void;
   rate: number;
   setRate: (v: number) => void;
}

function DebtPanel(props: Props) {
   return (
      <div>
         <Form>
            <Form.Field>
               <Input labelPosition='right' type='number' placeholder='Balance'>
                  <Label basic>$</Label>
                  <input value={props.balance} onChange={e => props.setBalance(e.target.valueAsNumber)} />
                  <Label>.00</Label>
               </Input>
            </Form.Field>
            <Form.Field>
               <Input labelPosition='right' type='number' placeholder='Min Payment'>
                  <Label basic>$</Label>
                  <input value={props.payment} onChange={e => props.setPayment(e.target.valueAsNumber)} />
                  <Label>.00</Label>
               </Input>
            </Form.Field>
            <Form.Field>
               <Input
                  value={props.rate}
                  type='number'
                  onChange={e => props.setRate(e.target.valueAsNumber)}
                  label={{ basic: true, content: '%' }}
                  labelPosition='right'
                  placeholder='Interest rate'
               />
            </Form.Field>
         </Form>
      </div>
   );
}

export default DebtPanel;