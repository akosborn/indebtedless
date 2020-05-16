import React from "react";
import {getNumberOfPayments, getPayoffAmount} from "./FinanceUtils";

interface Props {
   balance: number;
   payment: number;
   rate: number;
}

function MediaGallery(props: Props) {
   const numPayments = getNumberOfPayments(props.balance, props.rate, props.payment);
   return (
      <div>
         <div>
            <b><p>Months</p></b>
            <p>{numPayments}</p>
         </div>
         {[...Array(Math.floor(numPayments) || 0)].map((_, i) =>
            <div style={{ display: "flex" }}>
               <div style={{ marginRight: 10 }}>
                  <b><p>Interest at {i + 1} months</p></b>
                  <p>{(getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate).toFixed(2)}</p>
               </div>
               <div>
                  <b><p>% of Payment to Interest at {i + 1} months</p></b>
                  <p>{(((getPayoffAmount(props.balance, props.rate, i + 1, props.payment) * props.rate) / props.payment) * 100).toFixed()}</p>
               </div>
            </div>
         )}
         <div>
            <b><p>Final Payment</p></b>
            <p>{getPayoffAmount(props.balance, props.rate, Math.floor(numPayments), props.payment)}</p>
         </div>
      </div>
   );
}

export default MediaGallery;