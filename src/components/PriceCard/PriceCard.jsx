import { Link } from 'react-router-dom';
import { IoMdCheckmark } from "react-icons/io";
import "./pricecard.css";

const PriceCard = ({ data }) => {
  return (
    <div className="pricing_card">
        <div className="price_card_type">
          <h1>{data.plan }</h1>
        </div>

        <div className="price_card_charge">
          <h3>{data.cost}</h3>
          <p>/one time payment</p>
        </div>

        <div className="price_card_package">
          <ul>
            {data.benefits.map((benefit, i) => <li key={i}><IoMdCheckmark size={20}/> { benefit }</li>)}
          </ul>

          <Link>Get Started</Link>
        </div>
    </div>
  )
}

export default PriceCard