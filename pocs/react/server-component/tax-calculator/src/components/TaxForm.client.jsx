'use client';

import { useState } from 'react';

export default function TaxForm({ products, states, years, onCalculate, initialValues }) {
  const [formData, setFormData] = useState(() => ({
    productId: initialValues?.productId ?? products[0]?.id ?? '',
    stateCode: initialValues?.stateCode ?? states[0]?.code ?? '',
    year: initialValues?.year ?? years[years.length - 1] ?? 2025,
    quantity: initialValues?.quantity ?? 1,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'year' ? parseInt(value, 10) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="tax-form">
      <div className="tax-form__group">
        <label htmlFor="productId" className="tax-form__label">
          Product:
        </label>
        <select
          id="productId"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="tax-form__select"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (${product.basePrice})
            </option>
          ))}
        </select>
      </div>

      <div className="tax-form__group">
        <label htmlFor="stateCode" className="tax-form__label">
          State:
        </label>
        <select
          id="stateCode"
          name="stateCode"
          value={formData.stateCode}
          onChange={handleChange}
          className="tax-form__select"
        >
          {states.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name} ({state.code})
            </option>
          ))}
        </select>
      </div>

      <div className="tax-form__group">
        <label htmlFor="year" className="tax-form__label">
          Tax Year:
        </label>
        <select
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="tax-form__select"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="tax-form__group">
        <label htmlFor="quantity" className="tax-form__label">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="tax-form__input"
        />
      </div>

      <button type="submit" className="tax-form__button">
        Calculate Tax
      </button>
    </form>
  );
}
