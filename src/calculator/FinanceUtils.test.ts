import {getNumberOfPayments, getPayoffAmount, getSchedule} from "./FinanceUtils";

test("payment duration", () => {
   expect(getNumberOfPayments(3500, 0.005, 100))
      .toBe(38.57);
});

test("payoff amount", () => {
   expect(getPayoffAmount(3500, 0.005, 38, 100))
      .toBe(56.83);
});

test('payment schedule', () => {
   expect(getSchedule([{ name: 'A', rate: 0, principal: 2, minPayment: 1 }], 1))
      .toEqual({
         'A': [
            { id: 0, debtName: 'A', principal: 1, payment: 1 },
            { id: 1, debtName: 'A', principal: 0, payment: 1 }
         ]
      })
});

test('payment schedule', () => {
   expect(getSchedule([{ name: 'A', rate: 0, principal: 2, minPayment: 1 }], 5))
      .toEqual({
         'A': [
            { id: 0, debtName: 'A', principal: 0, payment: 2 }
         ]
      })
});

test('payment schedule', () => {
   expect(getSchedule([
      { name: 'A', rate: 25, principal: 100, minPayment: 10 },
      { name: 'B', rate: 5, principal: 100, minPayment: 10 },
      { name: 'C', rate: 75, principal: 100, minPayment: 10 },
      ], 120))
      .toEqual({
         'A': [
            { id: 0, debtName: 'A', principal: 91.88, payment: 10 },
            { id: 1, debtName: 'A', principal: 0, payment: 91.88 }
         ],
         'B': [
            { id: 0, debtName: 'B', principal: 90.38, payment: 10 },
            { id: 1, debtName: 'B', principal: 62.52, payment: 28.12 },
            { id: 2, debtName: 'B', principal: 0, payment: 62.52 }
         ],
         'C': [
            { id: 0, debtName: 'C', principal: 0, payment: 100 }
         ]
      })
});