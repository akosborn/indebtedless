import {Debt} from "../models/Debt";
import {min, sortBy, sumBy} from 'lodash';

export function getPayoffAmount(originalBalance: number, rate: number, paymentsMade: number, paymentAmt: number): number {
   return +(originalBalance * Math.pow(1 + rate, paymentsMade) - ((paymentAmt / rate) * (Math.pow(1 + rate, paymentsMade) - 1))).toFixed(2);
}

export function getNumberOfPayments(currentBalance: number, rate: number, paymentAmt: number): number {
   return +(Math.log(Math.pow(1 - (currentBalance * rate) / paymentAmt, (-1))) / Math.log(1 + rate)).toFixed(2);
}

interface Snapshot {
   id: number;
   debtName: string;
   principal: number;
}

interface Schedule {
   [name: string]: Snapshot;
}

function getSchedule(debts: Debt[], budget: number): Schedule {
   const byRateAsc: Debt[] = sortBy(debts, d => d.rate);
   const schedule: Schedule = debts.reduce((newObj, d) => {
      newObj[d.name] = {
         debtName: d.name,
         id: 0,
         principal: d.principal
      };
      return newObj;
   }, {} as Schedule);
   return getPaymentSchedule(byRateAsc, budget, schedule);
}

export function getPaymentSchedule(debts: Debt[], budget: number, schedule: Schedule): Schedule {
   const minPayments: number = sumBy(debts, d => d.minPayment);
   let excess: number = budget - minPayments;

   debts.forEach(d => {
      const principal = schedule[d.name].principal;
      if (principal < d.minPayment) {

      }

      const payment = min([principal, (d.minPayment + excess)]);
   });

   return {};
}