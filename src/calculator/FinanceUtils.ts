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
   payment: number;
}

export interface Schedule {
   [name: string]: Snapshot[];
}

export function getSchedule(debts: Debt[], budget: number): Schedule {
   const byRateDesc: Debt[] = sortBy(debts, d => d.rate).reverse();
   return getPaymentSchedule(byRateDesc, budget, {}, 0);
}

function getPaymentSchedule(debts: Debt[], budget: number, schedule: Schedule, paymentNumber: number): Schedule {
   const minPayments: number = !paymentNumber ?
       sumBy(debts, d => min([d.minPayment, d.principal]) || 0) :
       sumBy(debts, d => min([d.minPayment, schedule[d.name][paymentNumber - 1]?.principal || 0]) || 0);

   if (budget >= minPayments) {
      let excess: number = budget - minPayments;

      const getActualPayment = (balance: number, minPayment: number): number => {
         if (excess > 0) {
            const remainingAfterMinPayment = balance - minPayment;
            if (remainingAfterMinPayment > 0) {
               const excessToApply: number = min([remainingAfterMinPayment, excess]) || 0;
               excess-= excessToApply;
               return minPayment + excessToApply;
            } else {
               return minPayment;
            }
         } else {
            return minPayment;
         }
      };

      if (minPayments > 0) {
         debts.forEach(d => {
            const monthlyInterestRate: number = d.rate / 100 / 12;
            if (!paymentNumber) {
               const minPayment: number = min([d.minPayment, d.principal]) || 0;
               const actualPayment: number = getActualPayment(d.principal, minPayment);
               const principalAfterPayment: number = d.principal - actualPayment;
               const interest: number = monthlyInterestRate * principalAfterPayment;
               schedule[d.name] = [];
               schedule[d.name][0] = {
                  id: 0,
                  debtName: d.name,
                  payment: parseFloat(actualPayment.toFixed(2)),
                  principal: parseFloat((principalAfterPayment + interest).toFixed(2))
               };
            } else {
               const prevSnap: Snapshot | undefined = schedule[d.name][paymentNumber - 1];
               if (prevSnap && prevSnap.principal > 0) {
                  const minPayment: number = min([d.minPayment, prevSnap.principal]) || 0;
                  const actualPayment: number = getActualPayment(prevSnap.principal, minPayment);
                  const principalAfterPayment: number = prevSnap.principal - actualPayment;
                  const interest: number = monthlyInterestRate * principalAfterPayment;
                  schedule[d.name][paymentNumber] = {
                     id: paymentNumber,
                     debtName: d.name,
                     payment: parseFloat(actualPayment.toFixed(2)),
                     principal: parseFloat((principalAfterPayment + interest).toFixed(2))
                  };
               }
            }
         });
         return getPaymentSchedule(debts, budget, schedule, paymentNumber + 1);
      }
   }
   return schedule;
}