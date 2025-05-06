


import React, { useState, useEffect } from 'react';
import OrderModal from './OrderModal';
import EditModal from './EditModal';
import './Table.Module.css';
import frame from '../assets/Frame56.png';
import frame2 from '../assets/Frame2.png';
import frame3 from '../assets/Frame3.png';
import frame4 from '../assets/Frame4.png';
import axios from 'axios';

const OrdersPage = () => {
  // State for modals and order data
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // State for tables and merge functionality
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTableIds, setSelectedTableIds] = useState([]);
  const [mergeStatus, setMergeStatus] = useState(null);
  const [isMerging, setIsMerging] = useState(false);
  const [isUnmerging, setIsUnmerging] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [groupedTables, setGroupedTables] = useState([]);

  // Fetch tables from API
  const fetchTables = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tables/4`);
      if (!response?.data) {
        throw new Error("Failed to fetch tables");
      }
      
      // Sort tables by table_no in ascending order
      const sortedTables = response.data.tables.sort((a, b) => a.table_no - b.table_no);
      setTables(sortedTables);
      
      // Create grouped tables data structure from merged tables
      // const mergedTables = sortedTables.filter(t => t.isMerged);
      // const groups = {};
      
      // mergedTables.forEach(table => {
      //   if (!groups[table.mergedId]) {
      //     groups[table.mergedId] = {
      //       id: `group-${table.mergedId}`,
      //       name: `Group ${table.mergedId}`,
      //       tables: [],
      //       totalPrice: 0,
      //       totalGuests: 0
      //     };
      //   }

      const mergedTables = sortedTables.filter(t => t.isMerged);
const groups = {};

// First, sort the merged tables by their mergedId to ensure consistent ordering
const sortedMergedTables = [...mergedTables].sort((a, b) => a.mergedId.localeCompare(b.mergedId));

let groupCounter = 0;
const usedGroupIds = new Set();

sortedMergedTables.forEach(table => {
  if (!usedGroupIds.has(table.mergedId)) {
    groupCounter++;
    usedGroupIds.add(table.mergedId);
    groups[table.mergedId] = {
      id: `group-${table.mergedId}`,
      name: `Group ${String.fromCharCode(64 + groupCounter)}`, // A, B, C, etc.
      tables: [],
      totalPrice: 0,
      totalGuests: 0
    };
  }
  
 
        groups[table.mergedId].tables.push(table);
        groups[table.mergedId].totalPrice += parseFloat(table.price?.replace('₹', '') || 0);
        groups[table.mergedId].totalGuests += table.guests || 0;
      });
      
      setGroupedTables(Object.values(groups));
    } catch (err) {
      setError(err?.response?.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  //  Table selection handler
  const handleTableSelect = (tableNo) => {
    const table = tables.find((t) => t.table_no === tableNo);
    if (table?.isMerged && selectedTableIds.length > 0) return;

    setSelectedTableIds((prev) =>
      prev.includes(tableNo)
        ? prev.filter((num) => num !== tableNo)
        : [...prev, tableNo]
    );
    setError(null);
  };

  // Merge tables handler
  const handleMergeTables = async () => {
    setIsMerging(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tables: selectedTableIds,
          restId: Number(4),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Merge failed");
      }

      setMergeStatus(result.message);
      setSelectedTableIds([]);
      await fetchTables();
      setShowSidebar(false);
      
      setTimeout(() => setMergeStatus(null), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsMerging(false);
    }
  };

  // Unmerge table handler
  const handleUnmergeTable = async (mergedId) => {
    setIsUnmerging(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:3000/api/unmerge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mergedId: mergedId,
          resId: Number(4),
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Unmerge failed");
      }
  
      setMergeStatus(result.message);
      setSelectedTableIds([]);
      await fetchTables();
  
      setTimeout(() => setMergeStatus(null), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUnmerging(false);
    }
  };

  // Clear selection handler
  const handleClearSelection = () => {
    setSelectedTableIds([]);
    setError(null);
    setMergeStatus(null);
  };

  // Order modal handlers 
  const handleTableClick = (table) => {
    const orderData = {
      table: `Table ${table.table_no}`,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      items: [
        { id: 1, name: "Pasta Carbonara", modifier: "Extra cheese", quantity: 2, price: 1000.00 },
        { id: 2, name: "Pasta Carbonara", modifier: "Extra cheese", quantity: 2, price: 1000.00 },
        { id: 3, name: "Pasta Carbonara", modifier: "Extra cheese", quantity: 2, price: 1000.00 }
      ],
      totalItems: 6,
      totalPrice: 2650.00
    };
    
    setSelectedOrder(orderData);
    setIsOrderModalOpen(true);
  };

  const handleEditClick = () => {
    setIsOrderModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeAllModals = () => {
    setIsOrderModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderItem = (itemId, newQuantity) => {
    const updatedItems = selectedOrder.items.map(item => 
      item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );

    const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    setSelectedOrder({
      ...selectedOrder,
      items: updatedItems,
      totalItems: newTotalItems,
      totalPrice: newTotalPrice
    });
  };

  const handleOrderSubmit = () => {
    console.log("Order submitted:", selectedOrder);
    closeAllModals();
  };

  if (loading) return <div className="loading">Loading tables...</div>;
  if (error && !selectedTableIds.length) return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="dashboard-table">
      <header className="dashboard-header">
          <h1 className="page-title">Orders Page</h1>
          <div className="search-bar">
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <input 
              type="text" 
              placeholder="Search table or order..." 
              className="search-input"
            />
          </div>
        </header>

        <div className="dashboard-card-model">
          <div className="card-model">
            <div className="card-img-model">
              <img src={frame} alt="card icon"/>
            </div>
            <div className="card-content">
              <h3 className="card-title">Active Tables</h3>
              <p className="card-value">
                {tables.filter(t => !t.isMerged && t.status !== 'Empty').length}
              </p>
            </div>
          </div>

          <div className="card-model">
            <div className="card-img-model">
              <img src={frame2} alt="card icon"/>
            </div>
            <div className="card-content">
              <h3 className="card-title">In Progress</h3>
              <p className="card-value">
                {tables.filter(t => t.status === 'In Progress').length}
              </p>
            </div>
          </div>

          <div className="card-model">
            <div className="card-img-model">
              <img src={frame3} alt="card icon"/>
            </div>
            <div className="card-content">
              <h3 className="card-title">Total Orders</h3>
              <p className="card-value">34</p>
            </div>
          </div>

          <div className="card-model">
            <div className="card-img-model">
              <img src={frame4} alt="card icon"/>
            </div>
            <div className="card-content">
              <h3 className="card-title">Today's Revenue</h3>
              <div style={{display:'flex', gap:'10px', gap:"15px"}}>
                <p className="revenue-item">₹6,240 <strong> (UPI)</strong></p>
                <p className="revenue-item">₹7,240 <strong>(Card & Cash)</strong></p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <div className="container">
        <div className="tab-management">
          <div>
            <h1>Tables Overview</h1>
          </div>
          <div>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="merge-sidebar-toggle"
            >
              {showSidebar ? 'Hide Merge Panel' : 'Show Merge Panel'}
            </button>
          </div>
        </div>

        {mergeStatus && <div className="success-message">{mergeStatus}</div>}
        {error && <div className="error">Error: {error}</div>}

        {/* Merge Sidebar */}
        {/* {showSidebar && (
          <div className="merge-sidebar">
          </div>
        )} */}

{showSidebar && (
          <div className="merge-sidebar">
            <div style={{display:'flex',gap:'50px'}}>
              <h3>Select Tables to Merge</h3> 
              <button 
                onClick={() => {
                  setSelectedTableIds([]);
                  setShowSidebar(false);
                }}
                className="cancel-button"
              >
                X
              </button>
            </div>
            <div className="table-selection-list">
              {tables.map(table => {
                const isSelected = selectedTableIds.includes(table.table_no);
                const isGrouped = table.isMerged;
                
                return (
                  <div className="table-selection-item">
                    <div>
                      <div>Table {table.table_no}</div>
                      <div className="status-indicator">{table.status || 'Available'}</div>
                    </div>
                    <button 
                      className="select-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTableSelect(table.table_no);
                      }}
                      disabled={isGrouped || table.status === 'Empty'}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="sidebar-actions">
              {selectedTableIds.length > 0 && (
                <>
                  <p>Selected tables: {selectedTableIds.join(", ")}</p>
                  <button 
                    onClick={handleMergeTables}
                    disabled={selectedTableIds.length < 2 || isMerging}
                    className="merge-button"
                  >
                    {isMerging ? "Merging..." : "Merge Tables"}
                  </button>
                  <button
                    onClick={handleClearSelection}
                    className="clear-selection-button"
                    disabled={isMerging || isUnmerging}
                  >
                    Clear Selection
                  </button>
                </>
              )}
            </div>
          </div>
        )}


        {/* Grouped Tables Section */}
        {groupedTables.length > 0 && (
          <div className="grouped-section">
            <h2 className="section-title">Grouped Tables</h2>
            <div className="groups-grid">
              {groupedTables.map(group => (
                <div key={group.id} className="group-card">
                  <h2 className="group-title">{group.name}</h2>
                  <p className="group-total">Total: ₹{group.totalPrice.toFixed(2)}</p>
                  <p className="group-guests">Total guests: {group.totalGuests}</p>
                  
                  <div className="group-tables">
                    <h3 className="tables-title">Included Tables:</h3>
                    <ul className="tables-list">
                      {group.tables.map(table => (
                        <li 
                          key={table.table_no} 
                          className="table-item"
                        >
                          <span>
                            Table {table.table_no}: #{table.orderNumber} ({table.guests} guests)
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnmergeTable(table.mergedId);
                            }}
                            className="remove-button"
                            disabled={isUnmerging}
                          >
                            {isUnmerging ? "Unmerging..." : "Remove"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Tables Section - Now shown after grouped tables */}
        <div className="tables-section">
          {/* <h2 className="section-title">Available Tables</h2> */}
          <div className="tables-grid">
            {tables
              .filter(t => !t.isMerged)
              .map(table => {
                let statusClass = '';
                
                if (table.status === 'New Order') statusClass = 'new-order';
                else if (table.status === 'In Progress') statusClass = 'in-progress';
                else if (table.status === 'Completed') statusClass = 'completed';
                else statusClass = 'empty';
                
                return (
                  <div 
                    key={table.table_no}
                    className={`table-card ${statusClass} ${
                      table.isMerged ? 'merged' : ''
                    } ${selectedTableIds.includes(table.table_no) ? 'selected' : ''}`}
                    onClick={() => handleTableClick(table)}
                  >  
                    <div style={{display:'flex', gap:'160px'}}>
                      <h2 className="table-title">Table {table.table_no}</h2>
                      {table.isMerged ? (
                        <span className="merged-badge">Merged</span>
                      ) : (
                        <button 
                          className={`status-button ${statusClass}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Your status update logic here
                          }}
                        >
                          {table.status || 'Available'}
                        </button>
                      )}
                    </div>
                    
                    {table.status && table.status !== 'Empty' ? (
                      <>
                        <p>#{table.orderNumber}</p>
                        <p>{table.guests} guests • {table.time}</p>
                        <p className="table-price">{table.price}</p>
                      </>
                    ) : (
                      <>
                        <p>No active order</p>
                        <p>Available</p>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Modals */}
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={closeAllModals}
          onEdit={handleEditClick}
          orderData={selectedOrder}
        />

        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeAllModals}
          orderData={selectedOrder}
          onQuantityChange={updateOrderItem}
          onSubmit={handleOrderSubmit}
        />
      </div>
    </>
  );
};

export default OrdersPage;
