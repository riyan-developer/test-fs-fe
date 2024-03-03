import { Helmet } from 'react-helmet-async';

import RiskOwnerView from 'src/sections/riskOwner/view/risk-owner-view';

const RiskOwnerPage = () => (
    <>
      <Helmet>
        <title> Risk Owner </title>
      </Helmet>
      <RiskOwnerView />
    </>
);

export default RiskOwnerPage;
