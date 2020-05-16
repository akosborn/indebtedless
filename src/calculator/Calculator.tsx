import React from 'react';
import {Grid} from "semantic-ui-react";
import DebtPanel from "./DebtPanel";
import MediaGallery from "./MediaGallery";

function Calculator() {
   return (
      <Grid columns={2} divided>
         <Grid.Column width={3}>
            <DebtPanel/>
         </Grid.Column>
         <Grid.Column width={13}>
            <MediaGallery/>
         </Grid.Column>
      </Grid>
   );
}

export default Calculator;