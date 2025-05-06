import React, { useState } from 'react';

function AddNewItem() {
  const [itemName, setItemName] = useState('');
  const [itemUnit, setItemUnit] = useState('');
  const [inStock, setInStock] = useState('');
  const [inStockUnit, setInStockUnit] = useState('gm'); // Default unit
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      itemName,
      itemUnit,
      inStock,
      inStockUnit,
      expiryDate,
      category,
      totalAmount,
    });
    alert("Item added succesfully");
    reloadPage();

  };

  return (
    <div className="add-newitem-container">
      <h3>ADD NEW ITEM</h3>
      <form onSubmit={handleSubmit}>

        <div className="input-box">
        <div className="form-group">
          <label htmlFor="itemName">Item Name*</label>
          <br />
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemUnit">Item Unit</label>
          <br />
          <input
            type="text"
            id="itemUnit"
            value={itemUnit}
            onChange={(e) => setItemUnit(e.target.value)}
          />
        </div>

        </div>
        
        <div className="input-middle-box">
        <div className="form-group">
          <label htmlFor="inStock">In Stock</label>
          <br />
          <input
            type="number"
            id="inStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <br />
        <select
          id="inStockUnit"
          style={{width:"60px", fontSize:"13px"}}
          value={inStockUnit}
          onChange={(e) => setInStockUnit(e.target.value)}
          
        >
          <option value="gm">gm</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="ltr">ltr</option>
        </select>

        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <br />
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        </div>
        
        <div className="input-box">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <br />
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </div>
        </div>
      


         <div class="modal-footer">
        <button type="button" style={{backgroundColor:"red", padding:"10px 16px",border:"none"}} data-bs-dismiss="modal">Cancel</button>
        <button type="submit" style={{backgroundColor:"#DEBF00", padding:"10px 16px",border:"none"}}>Add Item</button>
        </div>

      </form>
    </div>
  );
}

export default AddNewItem;