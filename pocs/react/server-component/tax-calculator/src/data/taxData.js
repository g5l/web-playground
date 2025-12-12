export const products = [
  {id: 'electronics', name: 'Electronics', basePrice: 1000},
  {id: 'clothing', name: 'Clothing', basePrice: 50},
  {id: 'food', name: 'Food & Groceries', basePrice: 100},
  {id: 'books', name: 'Books', basePrice: 25},
  {id: 'luxury', name: 'Luxury Items', basePrice: 5000}
];

export const states = [
  {code: 'CA', name: 'California'},
  {code: 'NY', name: 'New York'},
  {code: 'TX', name: 'Texas'},
  {code: 'FL', name: 'Florida'},
  {code: 'WA', name: 'Washington'}
];

export const years = [2022, 2023, 2024, 2025];

export const taxRates = {
  2022: {
    CA: {
      electronics: 0.0925,
      clothing: 0.0725,
      food: 0.0,
      books: 0.0,
      luxury: 0.1025
    },
    NY: {
      electronics: 0.08875,
      clothing: 0.04,
      food: 0.0,
      books: 0.0,
      luxury: 0.08875
    },
    TX: {
      electronics: 0.0825,
      clothing: 0.0825,
      food: 0.0,
      books: 0.0,
      luxury: 0.0825
    },
    FL: {
      electronics: 0.07,
      clothing: 0.07,
      food: 0.0,
      books: 0.0,
      luxury: 0.07
    },
    WA: {
      electronics: 0.101,
      clothing: 0.101,
      food: 0.065,
      books: 0.0,
      luxury: 0.101
    }
  },
  2023: {
    CA: {
      electronics: 0.095,
      clothing: 0.075,
      food: 0.0,
      books: 0.0,
      luxury: 0.105
    },
    NY: {
      electronics: 0.09,
      clothing: 0.045,
      food: 0.0,
      books: 0.0,
      luxury: 0.09
    },
    TX: {
      electronics: 0.0825,
      clothing: 0.0825,
      food: 0.0,
      books: 0.0,
      luxury: 0.0825
    },
    FL: {
      electronics: 0.07,
      clothing: 0.07,
      food: 0.0,
      books: 0.0,
      luxury: 0.07
    },
    WA: {
      electronics: 0.102,
      clothing: 0.102,
      food: 0.065,
      books: 0.0,
      luxury: 0.102
    }
  },
  2024: {
    CA: {
      electronics: 0.0975,
      clothing: 0.0775,
      food: 0.0,
      books: 0.0,
      luxury: 0.1075
    },
    NY: {
      electronics: 0.0925,
      clothing: 0.05,
      food: 0.0,
      books: 0.0,
      luxury: 0.0925
    },
    TX: {
      electronics: 0.085,
      clothing: 0.085,
      food: 0.0,
      books: 0.0,
      luxury: 0.085
    },
    FL: {
      electronics: 0.075,
      clothing: 0.075,
      food: 0.0,
      books: 0.0,
      luxury: 0.075
    },
    WA: {
      electronics: 0.104,
      clothing: 0.104,
      food: 0.067,
      books: 0.0,
      luxury: 0.104
    }
  },
  2025: {
    CA: {
      electronics: 0.10,
      clothing: 0.08,
      food: 0.0,
      books: 0.0,
      luxury: 0.11
    },
    NY: {
      electronics: 0.095,
      clothing: 0.055,
      food: 0.0,
      books: 0.0,
      luxury: 0.095
    },
    TX: {
      electronics: 0.0875,
      clothing: 0.0875,
      food: 0.0,
      books: 0.0,
      luxury: 0.0875
    },
    FL: {
      electronics: 0.08,
      clothing: 0.08,
      food: 0.0,
      books: 0.0,
      luxury: 0.08
    },
    WA: {
      electronics: 0.106,
      clothing: 0.106,
      food: 0.07,
      books: 0.0,
      luxury: 0.106
    }
  }
};

export function calculateTax(productId, stateCode, year, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error(`Product ${productId} not found`);
  }

  const yearData = taxRates[year];
  if (!yearData) {
    throw new Error(`Tax data for year ${year} not found`);
  }

  const stateData = yearData[stateCode];
  if (!stateData) {
    throw new Error(`Tax data for state ${stateCode} not found`);
  }

  const taxRate = stateData[productId];
  if (taxRate === undefined) {
    throw new Error(`Tax rate for product ${productId} in state ${stateCode} not found`);
  }

  const subtotal = product.basePrice * quantity;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return {
    product,
    stateCode,
    year,
    quantity,
    subtotal,
    taxRate,
    taxAmount,
    total
  };
}
  