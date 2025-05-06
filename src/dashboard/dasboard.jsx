import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css';
import BellIcon from '../assets/bell-icon.png';
import DelIcon from '../assets/del_icon.webp';
import Sales from "./Sales";
import UserImg from "../assets/woman.png";

const Dashboard = () => {
  const data = {
    totalOrders: 120,
    totalSales: 50000,
    averageOrder: 420,
    processingOrders: 5,
    salesGrowth: "+2% more than yesterday"
  };

  return (
    <>
    <div className="dashboard">
     <div className="dash-head">
        <div className="left">
        <h3>Dashboard</h3>
        <p style={{color:"grey"}}>The Spring</p>
        </div>
        <div className="right">
        <button><img src={DelIcon} alt="" className="del_icon" />Delivery</button>
        <img src={BellIcon} alt="" className="bell_icon"/>
        <img src={UserImg} alt="user" className="user_img"/>
        </div>
     </div>
     <div className="overview">
       <h4>Overview</h4> 
       <div className="overview-container">
         <div className="box">
          <p>Total Order</p>
          <span>{data.totalOrders}</span>
          <p style={{color:"green", marginTop:"20px",opacity:"0.7"}}>{data.salesGrowth}</p>
        </div>
        <div className="box">
          <p>Total Sales</p>
          <span>₹{data.totalSales.toLocaleString()}</span>
        </div>
       <div className="box">
          <p>Average Order</p>
          <span>₹{data.averageOrder}</span>
        </div>
       <div className="box">
          <p>Processing Orders</p>
          <span>{data.processingOrders}</span>
        </div>
    </div>
     </div>
     <Sales/>
  </div>
   
   
    </>
    
  );
};

export default Dashboard;