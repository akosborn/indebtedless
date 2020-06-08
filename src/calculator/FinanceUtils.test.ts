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
      { name: 'A', rate: 0.25, principal: 2, minPayment: 1 },
      { name: 'B', rate: 0.5, principal: 2, minPayment: 1 },
      { name: 'C', rate: 0.75, principal: 2, minPayment: 1 },
      ], 4))
      .toEqual({
         'A': [
            { id: 0, debtName: 'A', principal: 1.02, payment: 1 },
            { id: 1, debtName: 'A', principal: 0, payment: 1.02 }
         ],
         'B': [
            { id: 0, debtName: 'B', principal: 1.04, payment: 1 },
            { id: 1, debtName: 'B', principal: 0, payment: 1.04 }
         ],
         'C': [
            { id: 0, debtName: 'C', principal: 0, payment: 2 }
         ]
      })
});