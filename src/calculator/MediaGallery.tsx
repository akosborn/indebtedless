import React from "react";
import {getSchedule, Schedule, Snapshot} from "./FinanceUtils";
import {Table} from "semantic-ui-react";
import StackedBarChart from "../charts/StackedBarChart";
import {Debt} from "../models/Debt";
import {keys, max, sum, values} from 'lodash';
import moment from "moment";
import PaymentLineChart from "../charts/PaymentLineChart";

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
            name: moment().add(index + 1, 'month').format("MMM 'YY"),
            value: parseFloat(sum(keys(schedule).map(s => schedule[s][index]?.principal || 0)).toFixed(2))
         }
      });

   // ToDo: Move this logic to the payment line chart component
   const paymentsByMonth: { [k: string]: number | string }[] = [...Array(payPeriods)]
      .map((_, index) => {
         const init: { [k: string]: number | string } = { name: moment().add(index + 1, 'month').format("MMM 'YY") };
         return keys(schedule).reduce((prev, curr) => {
            const snapshot: Snapshot | undefined = schedule[curr][index];
            prev[curr] = snapshot?.payment || 0;
            return prev;
         }, init);
      });

   return (
      <div>
         <StackedBarChart data={balanceByMonth}/>
         <PaymentLineChart data={paymentsByMonth} />
         <div>
            <b><p>Months</p></b>
            <p>{payPeriods}</p>
         </div>
         <Table celled>
            <Table.Header>
               <Table.Row>
                  <Table.HeaderCell>Month</Table.HeaderCell>
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
                        <Table.Cell>{moment().add(i + 1, 'month').format("MMM 'YY")}</Table.Cell>
                        <Table.Cell>{sum(props.debts.map(d => schedule[d.name][i]?.principal || 0))}</Table.Cell>
                        {props.debts.map(d =>
                           <>
                              <Table.Cell>{schedule[d.name][i]?.principal?.toFixed(2) || 0}</Table.Cell>
                              <Table.Cell>{schedule[d.name][i]?.payment?.toFixed(2) || 0}</Table.Cell>
                           </>
                        )}
                     </Table.Row>
                  );
               })}
            </Table.Body>
         </Table>
      </div>
   );
}

export default MediaGallery;