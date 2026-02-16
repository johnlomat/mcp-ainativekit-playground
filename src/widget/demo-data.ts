// Demo data for widget development

export const demoData = {
  weather: {
    location: 'Demo City',
    temperature: 25,
    humidity: 60,
    windSpeed: 12,
    feelsLike: 27,
    uvIndex: 5,
    weatherCode: 0
  },
  products: [
    {
      id: 1,
      name: 'Wireless Headphones',
      short_description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and comfortable over-ear design.',
      permalink: '#',
      prices: {
        price: '7999',
        regular_price: '9999',
        sale_price: '7999',
        currency_symbol: '$',
        currency_minor_unit: 2
      },
      on_sale: true,
      average_rating: '4.5',
      review_count: 128,
      images: [{ src: 'https://picsum.photos/seed/headphones/400/300', alt: 'Wireless Headphones' }],
      categories: [{ name: 'Electronics' }],
      is_in_stock: true
    },
    {
      id: 2,
      name: 'Running Shoes',
      short_description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper for all-day comfort.',
      permalink: '#',
      prices: {
        price: '12999',
        regular_price: '12999',
        sale_price: '',
        currency_symbol: '$',
        currency_minor_unit: 2
      },
      on_sale: false,
      average_rating: '4.8',
      review_count: 256,
      images: [{ src: 'https://picsum.photos/seed/shoes/400/300', alt: 'Running Shoes' }],
      categories: [{ name: 'Footwear' }],
      is_in_stock: true
    },
    {
      id: 3,
      name: 'Coffee Maker',
      short_description: 'Programmable drip coffee maker with thermal carafe, brew strength control, and auto-shutoff.',
      permalink: '#',
      prices: {
        price: '4999',
        regular_price: '5999',
        sale_price: '4999',
        currency_symbol: '$',
        currency_minor_unit: 2
      },
      on_sale: true,
      average_rating: '4.2',
      review_count: 89,
      images: [{ src: 'https://picsum.photos/seed/coffee/400/300', alt: 'Coffee Maker' }],
      categories: [{ name: 'Kitchen' }],
      is_in_stock: true
    },
    {
      id: 4,
      name: 'Backpack',
      short_description: 'Water-resistant travel backpack with laptop compartment, USB charging port, and anti-theft design.',
      permalink: '#',
      prices: {
        price: '5999',
        regular_price: '5999',
        sale_price: '',
        currency_symbol: '$',
        currency_minor_unit: 2
      },
      on_sale: false,
      average_rating: '4.6',
      review_count: 342,
      images: [{ src: 'https://picsum.photos/seed/backpack/400/300', alt: 'Backpack' }],
      categories: [{ name: 'Accessories' }],
      is_in_stock: true
    },
    {
      id: 5,
      name: 'Smartwatch',
      short_description: 'Fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life.',
      permalink: '#',
      prices: {
        price: '19999',
        regular_price: '24999',
        sale_price: '19999',
        currency_symbol: '$',
        currency_minor_unit: 2
      },
      on_sale: true,
      average_rating: '4.3',
      review_count: 67,
      images: [{ src: 'https://picsum.photos/seed/watch/400/300', alt: 'Smartwatch' }],
      categories: [{ name: 'Electronics' }],
      is_in_stock: false
    }
  ]
}
