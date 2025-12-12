import TaxResult from './TaxResult.server.jsx';
import TaxForm from './TaxForm.client.jsx';
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
          <TaxForm products={products} states={states} years={years} />
        </div>

        <div className="card">
          <TaxResult result={calculationResult} />
        </div>
      </div>
    </div>
  );
}
