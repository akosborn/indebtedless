import React from "react";
import {getPayoffAmount, getSchedule, Schedule} from "./FinanceUtils";
import {Table} from "semantic-ui-react";
import StackedBarChart from "../charts/StackedBarChart";
import {Debt} from "../models/Debt";
import {keys, max, sum, values} from 'lodash';

interface Props {
   debts: Debt[];
   budget: number;
}

function MediaGallery(props: Props) {
   const schedule: Schedule = getSchedule(props.debts, props.budget);
   const payPeriods: number = max([...values(schedule).map(s => s.length)]) || 0;
   const balanceByMonth: {name: string, value: number}[] = [...Array(payPeriods)]
      .map((_, index: number) => {
         return {
            name: `Month ${index}`,
            value: sum(keys(schedule).map(s => schedule[s][index]?.principal || 0))
         }
      });

   return (
      <div>
         <StackedBarChart data={balanceByMonth}/>
         <div>
            <b><p>Months</p></b>
            <p>{payPeriods}</p>
         </div>
         <Table celled>
            <Table.Header>
               <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Total Balance</Table.HeaderCell>
                  {props.debts.map(d =>
                     <>
                        <Table.HeaderCell>{d.name} Balance</Table.HeaderCell>
                        <Table.HeaderCell>{d.name} Payment</Table.HeaderCell>
                     </>
                  )}
               </Table.Row>
            </Table.Header>

            <Table.Body>
               {[...Array(payPeriods)].map((_, i) => {
                  return (
                     <Table.Row>
                        <Table.Cell>{i}</Table.Cell>
                        <Table.Cell>0</Table.Cell>
                        {props.debts.map(d =>
                           <>
                              <Table.Cell>{schedule[d.name][i]?.principal || 0}</Table.Cell>
                              <Table.Cell>{schedule[d.name][i]?.payment || 0}</Table.Cell>
                           </>
                        )}
                     </Table.Row>
                  );
               })}
            </Table.Body>

            {/* <Table.Body>*/}
            {/*   {[...Array(Math.floor(numPayments) || 0)].map((_, i) =>*/}
            {/*      <Table.Row>*/}
            {/*         <Table.Cell>{i + 1}</Table.Cell>*/}
            {/*         <Table.Cell>{getPayoffAmount(props.balance, props.rate, i + 1, props.payment)}</Table.Cell>*/}
            {/*         <Table.Cell>{(getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate).toFixed(2)}</Table.Cell>*/}
            {/*         <Table.Cell>{(((getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate) / props.payment) * 100).toFixed()}</Table.Cell>*/}
            {/*      </Table.Row>*/}
            {/*   )}*/}
            {/*</Table.Body>*/}
         </Table>

         {/*<div>*/}
         {/*   <b><p>Final Payment</p></b>*/}
         {/*   <p>{getPayoffAmount(props.balance, props.rate, Math.floor(numPayments), props.payment)}</p>*/}
         {/*</div>*/}
      </div>
   );
}

export default MediaGallery;