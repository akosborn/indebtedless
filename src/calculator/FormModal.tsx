import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Label, Modal} from "semantic-ui-react";
import {Debt} from "../models/Debt";

interface Props {
   name?: string;
   principal?: number;
   minPayment?: number;
   rate?: number;
   upsertDebt: (d: Debt) => void;
   isOpen: boolean;
   setIsOpen: (o: boolean) => void;
   onClose: () => void;
}

function FormModal(props: Props) {
   const [name, setName] = useState<string>(props.name || '');
   const [principal, setPrincipal] = useState<number>(props.principal || 0);
   const [minPayment, setMinPayment] = useState<number>(props.minPayment || 0);
   const [rate, setRate] = useState<number>(props.rate || 0);

   const saveDebt = () => {
      if (props.name) {
         props.upsertDebt({
            name,
            principal,
            minPayment,
            rate
         });
      }
   }

   useEffect(() => {
      setName(props.name || '');
   }, [props.name]);

   useEffect(() => {
      setPrincipal(props.principal || 0);
   }, [props.principal]);

   useEffect(() => {
      setMinPayment(props.minPayment || 0);
   }, [props.minPayment]);

   useEffect(() => {
      setRate(props.rate || 0);
   }, [props.rate]);

   useEffect(saveDebt, [name, principal, minPayment, rate]);

   const clear = () => {
      setName('');
      setPrincipal(0);
      setMinPayment(0);
      setRate(0);
   };

   return (
      <Modal trigger={<Button onClick={() => props.setIsOpen(true)}>Add</Button>}
             open={props.isOpen}
             onClose={() => {
                props.setIsOpen(false);
                props.onClose();
             }}
             size='small'
      >
         <Modal.Content image>
            <Modal.Description>
               <Form>
                  <Form.Field>
                     <label>Name</label>
                     <input value={name}
                            onChange={e => {
                               setName(e.target.value);
                            }}
                            placeholder='Name'
                     />
                  </Form.Field>
                  <Form.Field>
                     <label>Principal</label>
                     <Input labelPosition='right' type='number' placeholder='Principal'>
                        <Label basic>$</Label>
                        <input value={principal}
                               onChange={e => {
                                  setPrincipal(e.target.valueAsNumber);
                               }}
                        />
                     </Input>
                  </Form.Field>
                  <Form.Field>
                     <label>Min Payment</label>
                     <Input labelPosition='right' type='number' placeholder='Min Payment'>
                        <Label basic>$</Label>
                        <input value={minPayment}
                               onChange={e => {
                                  setMinPayment(e.target.valueAsNumber);
                               }}
                        />
                     </Input>
                  </Form.Field>
                  <Form.Field>
                     <label>Interest Rate</label>
                     <Input
                        value={rate}
                        type='number'
                        onChange={e => {
                           setRate(e.target.valueAsNumber);
                        }}
                        label={{ basic: true, content: '%' }}
                        labelPosition='right'
                        placeholder='Interest rate'
                     />
                  </Form.Field>
                  {!props.name &&
                     <Button type='submit'
                             onClick={() => {
                                props.setIsOpen(false);
                                props.upsertDebt({
                                   name,
                                   rate,
                                   minPayment,
                                   principal
                                });
                                clear();
                             }}>
                         Add
                     </Button>
                  }
               </Form>
            </Modal.Description>
         </Modal.Content>
      </Modal>
   );
}

export default FormModal;