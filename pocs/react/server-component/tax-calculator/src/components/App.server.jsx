import TaxResult from './TaxResult.server.jsx';
import {products, states, years} from '../data/taxData.js';

export default function App({calculationResult}) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Tax Calculation System</title>
      <link rel="stylesheet" href="/styles/global.css"/>
      <link rel="stylesheet" href="/styles/TaxForm.css"/>
      <link rel="stylesheet" href="/styles/TaxResult.css"/>
    </head>
    <body>
    <div className="container">
      <header className="header">
        <h1>Tax Calculation System</h1>
        <p>Calculate taxes for different products across states and years</p>
      </header>

      <div className="content">
        <div className="card">
          <h2>Calculate Tax</h2>
          <div id="tax-form-root" data-products={JSON.stringify(products)} data-states={JSON.stringify(states)} data-years={JSON.stringify(years)}></div>
        </div>

        <div className="card">
          <TaxResult result={calculationResult}/>
        </div>
      </div>
    </div>
    <script type="module" src="/client.js"></script>
    </body>
    </html>
  );
}
