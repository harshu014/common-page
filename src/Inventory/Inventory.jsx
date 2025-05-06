import {useState , useEffect} from "react";
import './inventory.css';
import { Link} from "react-router-dom";
import editimg from '../assets/edit.png';
import AddNewItem from "./Additem";

const inventoryData = [
  { item: "Carrot", quantity: 20, expirationDate: "6 days", totalValue: 2000 },
  { item: "Cheese", quantity: 10, expirationDate: "Unspecified", totalValue: 3200 },
  { item: "Yogurt-200gm", quantity: 20, expirationDate: "3 days", totalValue: 2198 },
  { item: "Paneer-1kg", quantity: 22, expirationDate: "5 days", totalValue: 22000 },
  { item: "Milk-1l", quantity: 50, expirationDate: "2 days", totalValue: 3000 },
  { item: "Turmeric", quantity: 20, expirationDate: "30 days", totalValue: 4200 },
  { item: "Black pepper", quantity: 10, expirationDate: "3 months", totalValue: 32000 },
  { item: "Kashmiri Mirch-1kg", quantity: 9, expirationDate: "2 months", totalValue: 2500 },
];


 function Inventory(){
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      let value = 0;
      let itemCount = 0;

      inventoryData.forEach(item => {
        value += item.totalValue;
        // itemCount += item.quantity;

      });
      const uniqueItems = [...new Set(inventoryData.map((item) => item.item))];
      itemCount = uniqueItems.length;

      setTotalValue(value);
      setTotalItems(itemCount);
    };

    calculateTotals();
  }, []);

    return(
    <>
    <div className="inventory">
        <div className="head">
        <h2>Inventory</h2>
        <div className="btn">
           <Link to ="#" className="btn-link"  data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Items</Link>
           <Link to ="/reorder" className="btn-link">Reorder</Link>
        </div>
        </div>
        <div className="total">
            <div className="div-1">
            <p>TOTAL VALUE ON HAND</p>
            <span>{totalValue}</span>
            </div>
            <div className="div-1">
            <p>TOTAL ITEMS</p>
            <span>{totalItems}</span>
            </div>
    
        </div>

        <div className="filter">
            <input type="text" placeholder="Search Items"/>
            <select name="" id="">
                <option value="#">All Items(in and out of stock)</option>
                <option value="#">items</option>
            </select>
            <select name="" id="">
                <option value="#">Category</option>
                <option value="#">Category-1</option>
            </select>
        </div>

        <div className="all-items">
          <table cellSpacing={0}>
            <tr>
                <th>Item</th>
                <th>Quantity in Stock</th>
                <th>Expiration Date</th>
                <th>Total Value</th>
                <th></th>
            </tr>
            {inventoryData.map(item => (
            <tr key={item.item}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>
                {/* {item.expirationDate}
                {item.expirationDate !== "Unspecified" && (
                  <span className="days-left">{` (${item.expirationDate.split(" ")[0]} DAYS LEFT)`}</span>
                )} */}
                {item.expirationDate}
              </td>
              <td>{item.totalValue}</td>
              <td><img src={editimg} alt="edit-icon" /></td>
            </tr>
            ))}
          </table>
        </div>

    </div>

 
   {/* add item modal start from here */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
     <div class="modal-content">
      <div class="modal-body">
        <AddNewItem/>

      </div>
    </div>
  </div>
</div>
    </>
    )
}
export default Inventory;











// import React, { useState, useEffect } from 'react';

// function Inventory() {
//   const [inventoryData, setInventoryData] = useState([]);

//   useEffect(() => {
//     // Fetch inventory data from your data source (e.g., API, database)
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/inventory'); // Replace with your actual API endpoint
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEdit = (item) => {
//     // Handle edit logic here (e.g., open a modal, navigate to a new page)
//     console.log('Editing item:', item);
//   };

//   const calculateDaysLeft = (expirationDate) => {
//     const today = new Date();
//     const expiration = new Date(expirationDate);
//     const differenceInDays = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));
//     return differenceInDays > 0 ? differenceInDays + ' days left' : 'Expired';
//   };

//   return (
//     <div className="inventory-container">
//       <h1>Inventory</h1>
//       <div className="total-values">
//         <div>
//           <span>Total Value on Hand:</span>
//           <span>{inventoryData.reduce((acc, item) => acc + item.totalValue, 0)}</span>
//         </div>
//         <div>
//           <span>Total Items:</span>
//           <span>{inventoryData.length}</span>
//         </div>
//       </div>
//       <div className="search-bar">
//         <input type="text" placeholder="Search items" />
//       </div>
//       <table className="inventory-table">
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Quantity in Stock</th>
//             <th>Expiration Date</th>
//             <th>Total Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventoryData.map((item) => (
//             <tr key={item.name}>
//               <td>{item.name}</td>
//               <td>{item.quantity} {item.unit}</td>
//               <td>
//                 {item.expirationDate} ({calculateDaysLeft(item.expirationDate)})
//               </td>
//               <td>{item.totalValue}</td>
//               <td><button onClick={() => handleEdit(item)}>Edit</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Inventory;