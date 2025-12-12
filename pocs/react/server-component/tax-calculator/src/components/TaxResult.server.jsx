export default function TaxResult({result}) {
  if (!result) {
    return (
      <div className="tax-result--empty">
        <h2 className="tax-result__empty-title">No Calculation Yet</h2>
        <p className="tax-result__empty-text">
          Fill out the form above and click "Calculate Tax" to see the results.
        </p>
      </div>
    );
  }

  const {product, stateCode, year, quantity, subtotal, taxRate, taxAmount, total} = result;

  return (
    <div className="tax-result">
      <h2 className="tax-result__title">Tax Calculation Result</h2>

      <div className="tax-result__section">
        <h3 className="tax-result__section-title">Purchase Details</h3>
        <div className="tax-result__row">
          <span className="tax-result__label">Product:</span>
          <span className="tax-result__value">{product.name}</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">State:</span>
          <span className="tax-result__value">{stateCode}</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">Tax Year:</span>
          <span className="tax-result__value">{year}</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">Quantity:</span>
          <span className="tax-result__value">{quantity}</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">Unit Price:</span>
          <span className="tax-result__value">${product.basePrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="tax-result__section">
        <h3 className="tax-result__section-title">Tax Calculation</h3>
        <div className="tax-result__row">
          <span className="tax-result__label">Subtotal:</span>
          <span className="tax-result__value">${subtotal.toFixed(2)}</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">Tax Rate:</span>
          <span className="tax-result__value">{(taxRate * 100).toFixed(2)}%</span>
        </div>
        <div className="tax-result__row">
          <span className="tax-result__label">Tax Amount:</span>
          <span className="tax-result__value">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="tax-result__row tax-result__row--total">
          <span className="tax-result__label">Total:</span>
          <span className="tax-result__value">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
