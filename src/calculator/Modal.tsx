import React, {useState} from 'react';
import {Button, Form, Input, Label, Modal} from "semantic-ui-react";
import {Debt} from "../models/Debt";

interface Props {
   addDebt: (d: Debt) => void;
}

function FormModal(props: Props) {
   const [isOpen, setIsOpen] = useState(false);
   const [name, setName] = useState("");
   const [principal, setPrincipal] = useState(0);
   const [minPayment, setMinPayment] = useState(0);
   const [rate, setRate] = useState<number>(0);

   const clear = () => {
      setName("");
      setPrincipal(0);
      setMinPayment(0);
      setRate(0);
   };

   return (
      <Modal trigger={<Button onClick={() => setIsOpen(true)}>Add</Button>} open={isOpen} onClose={() => setIsOpen(false)} size='small'>
         <Modal.Content image>
            <Modal.Description>
               <Form>
                  <Form.Field>
                     <label>Name</label>
                     <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
                  </Form.Field>
                  <Form.Field>
                     <label>Principal</label>
                     <Input labelPosition='right' type='number' placeholder='Principal'>
                        <Label basic>$</Label>
                        <input value={principal} onChange={e => setPrincipal(e.target.valueAsNumber)} />
                        <Label>.00</Label>
                     </Input>
                  </Form.Field>
                  <Form.Field>
                     <label>Min Payment</label>
                     <Input labelPosition='right' type='number' placeholder='Min Payment'>
                        <Label basic>$</Label>
                        <input value={minPayment} onChange={e => setMinPayment(e.target.valueAsNumber)} />
                        <Label>.00</Label>
                     </Input>
                  </Form.Field>
                  <Form.Field>
                     <label>Interest Rate</label>
                     <Input
                        value={rate}
                        type='number'
                        onChange={e => setRate(e.target.valueAsNumber)}
                        label={{ basic: true, content: '%' }}
                        labelPosition='right'
                        placeholder='Interest rate'
                     />
                  </Form.Field>
                  <Button type='submit'
                          onClick={() => {
                             setIsOpen(false);
                             props.addDebt({
                                name,
                                rate: rate * 0.01,
                                minPayment,
                                principal
                             });
                             clear();
                          }}>
                     Add
                  </Button>
               </Form>
            </Modal.Description>
         </Modal.Content>
      </Modal>
   );
}

export default FormModal;