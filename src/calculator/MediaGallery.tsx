import React from "react";
import {getNumberOfPayments, getPayoffAmount} from "./FinanceUtils";
import {Table} from "semantic-ui-react";
import StackedBarChart from "../charts/StackedBarChart";

interface Props {
   balance: number;
   payment: number;
   rate: number;
}

function MediaGallery(props: Props) {
   const numPayments = getNumberOfPayments(props.balance, props.rate, props.payment);
   return (
      <div>
         <StackedBarChart/>
         <div>
            <b><p>Months</p></b>
            <p>{numPayments}</p>
         </div>
         <Table celled>
            <Table.Header>
               <Table.Row>
                  <Table.HeaderCell>Payment</Table.HeaderCell>
                  <Table.HeaderCell>Balance</Table.HeaderCell>
                  <Table.HeaderCell>Interest</Table.HeaderCell>
                  <Table.HeaderCell>Interest % of Payment</Table.HeaderCell>
               </Table.Row>
            </Table.Header>

            <Table.Body>
               {[...Array(Math.floor(numPayments) || 0)].map((_, i) =>
                  <Table.Row>
                     <Table.Cell>{i + 1}</Table.Cell>
                     <Table.Cell>{getPayoffAmount(props.balance, props.rate, i + 1, props.payment)}</Table.Cell>
                     <Table.Cell>{(getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate).toFixed(2)}</Table.Cell>
                     <Table.Cell>{(((getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate) / props.payment) * 100).toFixed()}</Table.Cell>
                  </Table.Row>
               )}
            </Table.Body>
         </Table>

         <div>
            <b><p>Final Payment</p></b>
            <p>{getPayoffAmount(props.balance, props.rate, Math.floor(numPayments), props.payment)}</p>
         </div>
      </div>
   );
}

export default MediaGallery;