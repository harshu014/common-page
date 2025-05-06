import React, { useState } from "react";
import "./OModal.css";
import bottle from '../assets/Frame8.png'

const OrderModal = ({ isOpen, onClose, onEdit, orderData }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  if (!isOpen) return null;

  const handleAddItemsClick = () => {
    setIsSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Order Details</h2>
            <button className="edit-btn-itm" onClick={handleAddItemsClick}>
              Add Items
            </button>
            <button className="edit-btn-mdl" onClick={onEdit}>
              Edit
            </button>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="order-details">
            <div className="order-group">
              <h3>{orderData.table}</h3>
              <p className="order-date">04 April, 12:33 PM</p>
            </div>

            <div className="divider"></div>

            <div className="order-items">
              <div className="order-item">
                <div className="item-details">
                  <h4>Pasta Carbonara</h4>
                  <p className="item-modifier">Extra cheese</p>
                </div>
                <div className="item-quantity-price">
                  <span className="quantity">×6</span>
                  <span className="price">₹5,000.00</span>
                </div>
              </div>

              <div className="order-item">
                <div className="item-details">
                  <h4>Pasta Carbonara</h4>
                  <p className="item-modifier">Extra cheese</p>
                </div>
                <div className="item-quantity-price">
                  <span className="quantity">×2</span>
                  <span className="price">₹1,000.00</span>
                </div>
              </div>

              <div className="order-item">
                <div className="item-details">
                  <h4>Pasta Carbonara</h4>
                  <p className="item-modifier">Extra cheese</p>
                </div>
                <div className="item-quantity-price">
                  <span className="quantity">×8</span>
                  <span className="price">₹8,000.00</span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="order-total">
              <div className="total-items">
                <span>Total</span>
                <span>06</span>
              </div>
              <div className="total-price">
                <span>₹14,000.00</span>
              </div>
            </div>

            <div className="divider"></div>

            <button className="accept-button">Accept and Print</button>
          </div>
        </div>
      </div>

      {/* Slider Modal */}
      {isSliderOpen && (
        <div className="slider-modal-container">
          <div
            className="slider-modal-overlay"
            onClick={handleCloseSlider}
          ></div>
          <div className="slider-modal-content">
            <div className="slider-modal-inner-content">
              <div className="slider-modal-header">
                <h2>Add more items</h2>
                <button
                  className="slider-modal-close"
                  onClick={handleCloseSlider}
                >
                  &times;
                </button>
              </div>

              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search item..."
                  className="search-input"
                />
              </div>

              <div className="complimentary-section">
                <h3>Complimentary items</h3>
               
              </div>

              <div className="item-list">
                <div >
                  <img
                    src={bottle} 
                    alt="Water Bottle"
                    className="card-image-btl"
                  />

                  <button className="add-button-btl">Add</button>
                </div>
                <div className="complimentry-p">
                  <p>Watter Bottle</p>
                  <p>500 ml</p>
                  <p>Rs. 50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default OrderModal;