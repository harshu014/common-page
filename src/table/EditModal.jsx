import React from 'react';
import './EditModal.css';
const EditModal = ({ isOpen, onClose, orderData, onQuantityChange, onSubmit }) => {
  if (!isOpen) return null;

  const handleIncrement = (index) => {
    const newQuantity = orderData.items[index].quantity + 1;
    onQuantityChange(index, newQuantity);
  };

  const handleDecrement = (index) => {
    if (orderData.items[index].quantity > 1) {
      const newQuantity = orderData.items[index].quantity - 1;
      onQuantityChange(index, newQuantity);
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        {/* Modal header */}
        <div className="edit-modal-header">
          <h2>Order Details</h2>
          <button className="edit-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        
        {/* Order info */}
        <div className="edit-order-info">
          <h3>{orderData.table}</h3>
          <p className="edit-order-date">{orderData.date}</p>
        </div>

        <div className="edit-divider"></div>

        {/* Order items */}
        <div className="edit-order-items">
          {orderData.items.map((item, index) => (
            <div className="edit-order-item" key={index} style={{display:'flex' ,gap:"80px"}}>
              <div className="edit-item-details" >
                <h4>{item.name}</h4>
                <p className="edit-item-modifier">{item.modifier}</p>
              </div>
              <div className="edit-item-controls">
                <div className="quantity-control">
                  <button className="decrement" onClick={() => handleDecrement(index)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="increment" onClick={() => handleIncrement(index)}>+</button>
                </div>
                <div className="price-display" style={{marginLeft:"120px"}}>
                  <span className="price">₹{(item.quantity * item.price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order total */}
        <div className="edit-divider"></div>
        <div className="edit-order-total">
          <div className="edit-total-items" >
            <span>Total</span>
            <span style={{marginLeft:'150px'}}>{orderData.totalItems}</span>
          </div>
          <div className="edit-total-price">
            <span>₹{orderData.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="edit-divider"></div>
        <button className="edit-accept-button" onClick={onClose}>Accept and Print</button>
      </div>
    </div>
  );
};


export default EditModal;