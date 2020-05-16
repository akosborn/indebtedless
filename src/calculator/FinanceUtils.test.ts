import {getNumberOfPayments, getPayoffAmount} from "./FinanceUtils";

test("payment duration", () => {
   expect(getNumberOfPayments(3500, 0.005, 100))
      .toBe(38.57);
});

test("payoff amount", () => {
   expect(getPayoffAmount(3500, 0.005, 38, 100))
      .toBe(56.83);
});