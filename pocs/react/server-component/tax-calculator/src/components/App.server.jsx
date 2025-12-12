import TaxResult from './TaxResult.server.jsx';
import { products, states, years } from '../data/taxData.js';

export default function App({ calculationResult }) {
  return (
    <div className="container">
      <header className="header">
        <h1>Tax Calculation System</h1>
        <p>Calculate taxes for different products across states and years</p>
      </header>

      <div className="content">
        <div className="card">
          <h2>Calculate Tax</h2>
          <div
            id="tax-form-root"
            data-products={JSON.stringify(products)}
            data-states={JSON.stringify(states)}
            data-years={JSON.stringify(years)}
          />
        </div>

        <div className="card">
          <TaxResult result={calculationResult} />
        </div>
      </div>
    </div>
  );
}
