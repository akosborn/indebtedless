export function getPayoffAmount(originalBalance: number, rate: number, paymentsMade: number, paymentAmt: number): number {
   return +(originalBalance * Math.pow(1 + rate, paymentsMade) - ((paymentAmt / rate) * (Math.pow(1 + rate, paymentsMade) - 1))).toFixed(2);
}

export function getNumberOfPayments(currentBalance: number, rate: number, paymentAmt: number): number {
   return +(Math.log(Math.pow(1 - (currentBalance * rate) / paymentAmt, (-1))) / Math.log(1 + rate)).toFixed(2);
}