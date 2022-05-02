import React from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import '../styles/CustomerProducts/Body/index.css';

const productMock = [
  {
    value: 4.49,
    image: 'https://www.carone.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/3/133579_B.jpg',
    name: 'Becks 330ml',
  },
  {
    value: 4.49,
    image: 'https://www.carone.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/3/133579_B.jpg',
    name: 'Becks 330ml',
  },
];

export default function CustomerProducts() {
  return (
    <>
      <NavBar />

      <body>

        <div className="products-container">
          {
            productMock.map((product, index) => (
              <ProductCard key={ index } dataCard={ product } />
            ))
          }
        </div>

      </body>

      {/* <Footer /> */}
    </>
  );
}
