import React from 'react'
import PriceCard from '../../components/PriceCard/PriceCard';


const Purchase = () => {
  const plans = [
    {
        plan: "Standard",
        cost: "$15",
        benefits: [
          "No Ads",
          "Unlimited Apps",
          "No Storage limit"
        ]
    }
  ];

  return (
    <center>
      <PriceCard data={plans[0]} purchase={true}/>
    </center>
  )
}

export default Purchase