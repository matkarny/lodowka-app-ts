import React from 'react';
import './ProductPopup.scss';

export interface ProductPopupProps {}

const ProductPopup: React.SFC<ProductPopupProps> = () => {
  return (
    <div className="tooltip-wrapper">
      <span className="tool" data-tip="DUPA" />
    </div>
  );
};

export default ProductPopup;
