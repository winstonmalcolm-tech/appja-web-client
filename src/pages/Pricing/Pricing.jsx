import './pricing.css';
import PriceCard from '../../components/PriceCard/PriceCard';

const Pricing = () => {

  const plans = [
    {
      plan: "Hobbyist",
      cost: "$0",
      benefits: [
        "Ads",
        "3 Apps",
        "100MB Limit per app"
      ]
    }, 
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
    <div className="pricing_container">

      {
        plans.map((data, i) => <PriceCard key={i} data={data} />)
      }

    </div>
  )
}

export default Pricing