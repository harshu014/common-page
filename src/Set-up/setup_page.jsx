import React, { useState } from 'react';
import './SetupPage.css';
import {HiOutlineInformationCircle } from 'react-icons/hi'
import { MdContentCopy } from 'react-icons/md'; 

const SetupPage = () => {
  const dashboardId = 'REST-A-1234';
  const [copied, setCopied] = useState(false);

  const [tabletRequests, setTabletRequests] = useState([
    { id: 'TAB001', time: 'Apr 17, 2025 - 10:23 AM' },
    { id: 'TAB005', time: 'Apr 17, 2025 - 10:23 AM' },
    { id: 'TAB008', time: 'Apr 17, 2025 - 10:23 AM' },
  ]);

  const [connectedTablets, setConnectedTablets] = useState([
    { id: 'TAB002', date: 'Apr 17, 2025' },
    { id: 'TAB003', date: 'Apr 17, 2025' },
    { id: 'TAB004', date: 'Apr 17, 2025' },
    { id: 'TAB006', date: 'Apr 17, 2025' },
    { id: 'TAB007', date: 'Apr 17, 2025' },
  ]);

  const [newTabletId, setNewTabletId] = useState('');

  const approveTablet = (tablet) => {
    setConnectedTablets([...connectedTablets, { id: tablet.id, date: 'Apr 17, 2025' }]);
    setTabletRequests(tabletRequests.filter(t => t.id !== tablet.id));
  };

  const rejectTablet = (id) => {
    setTabletRequests(tabletRequests.filter(t => t.id !== id));
  };

  const removeTablet = (id) => {
    setConnectedTablets(connectedTablets.filter(t => t.id !== id));
  };

  const addTablet = () => {
    if (newTabletId) {
      setConnectedTablets([...connectedTablets, { id: newTabletId, date: 'Apr 17, 2025' }]);
      setNewTabletId('');
    }
  };

  const copyDashboardId = () => {
    navigator.clipboard.writeText(dashboardId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="setup-container">
      <h1 className="setup-title">Setup Page</h1>

      <div className="card">
      <p> Dashboard Unique ID</p>
        <div className="card-header">
          <div className='left-content'>
            <div>
            <p className="description"> Your Unique Dashboard ID</p>
            <p className="dashboard-id">{dashboardId}</p>
            </div>
            <div className="copy-area">
            <button className="copy-button" onClick={copyDashboardId}>  <MdContentCopy size={20} />Copy ID</button>
            {copied && <span className="copied-text">Copied!</span>}
            </div>
          </div>
          <div className='right-content'>
           <a className="info-link" style={{color:"blue",fontSize:"15px"}} href="#">How to Connect Tablets</a>
           <p className='info-link'>Enter this ID on your tablet to connect it to this dashboard</p>
           <HiOutlineInformationCircle size={24}  style={{position:"absolute", top:'35px',left:"5px",color:"blue"}}/>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="section-title">Tablet Requests</h4>
        <table className="data-table" >
          <thead style={{backgroundColor:"rgba(238, 237, 237, 0.507)"}}>
            <tr>
              <th>Tablet ID</th>
              <th>Request Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tabletRequests.map((tablet) => (
              <tr key={tablet.id}>
                <td>{tablet.id}</td>
                <td>{tablet.time}</td>
                <td>
                  <button className="btn approve" onClick={() => approveTablet(tablet)}>Approve✓</button>
                  <button className="btn reject" onClick={() => rejectTablet(tablet.id)}>Reject☓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h5>Add Table</h5>
        <div className='add-tablet'>
        <input
          className="input"
          type="text"
          placeholder="Enter the table ID (e.g. TAB002)"
          value={newTabletId}
          onChange={(e) => setNewTabletId(e.target.value)}
        />
        <button className="btn add" onClick={addTablet}>Add Tablet</button>
        </div>
      </div>

      <div className="card">
        <h4 className="section-title">Connected Tablets</h4>
        <table className="data-table">
        <thead style={{backgroundColor:"rgba(238, 237, 237, 0.507)"}}>
            <tr>
              <th>Tablet ID</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {connectedTablets.map((tablet) => (
              <tr key={tablet.id}>
                <td>{tablet.id}</td>
                <td>{tablet.date}</td>
                <td>
                  <button className="btn reject" onClick={() => removeTablet(tablet.id)}>Remove☓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SetupPage;