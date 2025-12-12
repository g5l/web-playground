export default function TaxResult({ result }) {
  if (!result) {
    return (
      <div>
        <h2>No Calculation Yet</h2>
        <p>
          Fill out the form above and click "Calculate Tax" to see the results.
        </p>
      </div>
    );
  }

  const {
    product,
    stateCode,
    year,
    quantity,
    subtotal,
    taxRate,
    taxAmount,
    total,
  } = result;

  return (
    <div>
      <h2>Tax Calculation Result</h2>

      <div>
        <h3>Purchase Details</h3>
        <div>
          <span>Product:</span>
          <span>{product.name}</span>
        </div>
        <div>
          <span>State:</span>
          <span>{stateCode}</span>
        </div>
        <div>
          <span>Tax Year:</span>
          <span>{year}</span>
        </div>
        <div>
          <span>Quantity:</span>
          <span>{quantity}</span>
        </div>
        <div>
          <span>Unit Price:</span>
          <span>${product.basePrice.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <h3>Tax Calculation</h3>
        <div>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div>
          <span>Tax Rate:</span>
          <span>{(taxRate * 100).toFixed(2)}%</span>
        </div>
        <div>
          <span>Tax Amount:</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
