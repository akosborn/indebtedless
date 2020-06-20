import React from "react";
import {getSchedule, Schedule} from "./FinanceUtils";
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
            name: `Month ${index + 1}`,
            value: parseFloat(sum(keys(schedule).map(s => schedule[s][index]?.principal || 0)).toFixed(2))
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
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>0</Table.Cell>
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