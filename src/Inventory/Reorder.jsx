import React, { useState } from 'react';
import './inventory.css';
import { Link } from "react-router-dom";

const reorderData = [
  { name: "Carrot", quantity: 20, unit: "Kg", expirationDate: "6 days", totalValue: 2000 },
  { name: "Cheese", quantity: 10, unit: "Kg", expirationDate: "Unspecified", totalValue: 3200 },
  { name: "Yogurt-200gm", quantity: 20, unit: "pkt", expirationDate: "3 days", totalValue: 2198 },
  { name: "Paneer-1kg", quantity: 22, unit: "pkt", expirationDate: "5 days", totalValue: 22000 },
  { name: "Milk-1l", quantity: 50, unit: "pkt", expirationDate: "2 days", totalValue: 3000 },
  { name: "Turmeric", quantity: 20, unit: "Kg", expirationDate: "30 days", totalValue: 4200 },
  { name: "Black pepper", quantity: 10, unit: "Kg", expirationDate: "3 months", totalValue: 32000 },
  { name: "Kashmiri Mirch-1kg", quantity: 9, unit: "pkt", expirationDate: "2 months", totalValue: 2500 },
];

function Reorder() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };


  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedItems(reorderData);
    } else {
      setSelectedItems([]);
    }
  };


  const totalValue = selectAll ? reorderData.reduce((acc, item) => acc + item.totalValue, 0) : selectedItems.reduce((acc, item) => acc + item.totalValue, 0);
  const totalItems = selectAll ? reorderData.length : selectedItems.length;


  return (
    <div className="inventory">
      <div className="head">
      <h2>Reorder From Inventory</h2>
        <div className="btn">
                 <Link to ="/inventory" className="cancel-btn-link">Cancel</Link>
        </div>
      </div>

      <div className="total">
        <div className="total-value">
        <p>TOTAL VALUE ADDED:</p>
        <span>{totalValue}</span>
        </div>
       <div className="total-items">
        <p>TOTAL ITEMS SELECTED:</p>
        <span>{totalItems}</span>
       </div>
      </div>
       <div className="filter">
            <input type="text" placeholder="Search Items"/>
            <select name="" id="">
                <option value="#">Out of Stock</option>
                <option value="#">items</option>
            </select>
            <select name="" id="">
                <option value="#">Category</option>
                <option value="#">Category-1</option>
            </select>
        </div>

      <table className="all-items">
        <thead>
          <tr>
            <th>
            <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />

            </th>
            <th>All Item</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {reorderData.map((item) => (
            <tr key={item.name}>
              {/* <td><input type="checkbox" checked={selectedItems.includes(item)} onChange={() => handleItemSelect(item)} /></td> */}
              <td>
              <input
                  type="checkbox"
                  checked={selectAll || selectedItems.includes(item)}
                  onChange={() => handleItemSelect(item)}
                />

              </td>
              <td>{item.name}</td>
              <td><input type="text" style={{width:"60px", textAlign:"center",marginRight:"5px"}} placeholder={item.quantity}/>{item.unit}</td>
              <td>{item.expirationDate}</td>
              <td>{item.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="reorder-bottom">
      <button className="order-button bg-success text-white" style={{border:"none",padding:"10px 25px"}}>Order Online</button>
      <button className="print-button" style={{backgroundColor:"#DEBF00",border:"none",padding:"10px 25px"}}>Print Details</button>
      </div>
    
    </div>
  );
}

export default Reorder;