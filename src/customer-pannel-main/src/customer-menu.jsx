
// // Older Version Keep this its a working one with a good running tabs activity
// import React, { useState, useEffect } from "react";
// import Sidebar from "./sidebar";
// import axios from "axios";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function Menu() {
  
//   const refreshPage = () => {
//     window.location.reload();
//   };

//   const restaurantId = 1 ;
//   const tableNo = 2 ;

//   function getDate() {
//     const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//     const today = new Date();
//     const mn = today.getMonth() ;
//     const year = today.getFullYear();
//     const date = today.getDate();
//     return `${date}  ${month[mn]}  ${year}`;
//   }
//   function getTime(){
//     const d = new Date();
//     let hour = d.getHours();
//     let minutes = d.getMinutes();
//     if(hour < 13){ return `${hour}:${minutes} AM` }
//     return `${hour-12}:${minutes} PM`
//   }

//   useEffect(() => {

//     // Fetch data and process dish images
//     const fetchData = async () => {
//       const response = await fetch("https://eatopae-backend-trials.onrender.com/api/menu",{method: "GET"}); // Replace with your API endpoint
//       const data = await response.json();
//       // Add quantity = 0 and handle image processing
//       const updatedData = data.map((item) => {
//         const base64Image = item.dish_images?.[0]?.dish_image; // Access first image in the dish_images array
//         const imageFormat = '*' // Assume JPEG as default or get dynamically if available
        
//         return {
//           ...item,
//           quantity: 0, // Add default quantity
//           image: base64Image 
//             ? `data:image/${imageFormat};base64,${base64Image}` 
//             : "/sklton_img.png", // Fallback image
//         };
        
//       });
      

//       // setQrData()
//       console.log(updatedData);
//       setItems(updatedData);
//       setAllItems(updatedData)
      
//     };
//     // const fetchQr = async() =>{
//     //   const responseQr = await fetch("http://localhost:3000/api/qr/"+restaurantId,{method: "GET"}); // Replace with your API endpoint
//     //   const imgData = await responseQr.json();

//     //   const uint8Array = new Uint8Array(imgData.qr_code.data); 
//     //   const blob = new Blob([uint8Array], { type: 'image/png' }); 
//     //   const Qr = URL.createObjectURL(blob);

//     //   if(Qr) setQr(Qr);
//     // };
//     // const fetchOrderId = async() =>{
//     //   const responseOrderId = await fetch("http://localhost:3000/api/orderid/"+tableNo,{method: "GET"}); // Replace with your API endpoint
//     //   const oid = await responseOrderId.json();
//     //   console.dir(oid);
//     //   setOrderId(oid.order_no);
//     // };

//     // fetchOrderId();
//     fetchData();
//     // fetchQr();
//   }, []);
  
  

//   const handleIncrease = (id) => {
//     setItems(
//       items.map((item) =>
//         item.dish_id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const handleDecrease = (id) => {
//     setItems(
//       items.map((item) =>
//         item.dish_id === id && item.quantity > 0
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const [allItems,setAllItems] = useState([]);
//   const [items, setItems] = useState([]);
//   const [previousItems,setPreviousItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isBillModalOpen, setIsBillModalOpen] = useState(false);
//   const [isPaymentModalOpen, setisPaymentModalOpen] = useState(false);
//   const [isQRModalOpen, setisQRModalOpen] = useState(false);
//   const [paymentMethod,setPaymentMethod] = useState("cash");
//   const [isFinalSubmit,setIsFinalSubmit] = useState(false);
//   const [qr,setQr] = useState("/payment-imgs/image 23.svg");
//   const [orderId,setOrderId] = useState(219);
  


//   const handleChange = ( id )=>{
//     console.log("clicked "+id)
//     if((id==0)){
//       setItems(allItems)
//     } else {
//       setItems(allItems.filter(item => item.category_id == id)) 
//     }
//     console.log(items)
    
//   }

  
  
//   const setToZero = () =>{  // set to zero
//     // fetchOrderId();
//     setItems(
//       items.map((item) =>
//         item.quantity > 0
//           ? { ...item, quantity: 0}
//           : item
//       )
//     );
//   }
//   const handlePaymentMethod = (ev) =>{
//     console.dir(ev.target.id);
//     setPaymentMethod(ev.target.id);
//   }
  
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setIsConfirmModalOpen(false);
//     setIsBillModalOpen(false);
//     setisPaymentModalOpen(false);
//     setisQRModalOpen(false);
//     console.log("inside Close Model");
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   // const handleConfirmOrder = () => {
//   //   setIsConfirmModalOpen(true);
//   //   setIsModalOpen(false);
//   // };

//   const handleConfirmOrder = async () => {
    
//     setPreviousItems( previousItems.concat(selectedItems) );
//     console.log(previousItems);

//     try {
//       const orderDetails = selectedItems.map(item => ({
//         dish_id: item.dish_id,
//         dish_name: item.dish_name,
//         quantity: item.quantity,
//         dish_cost: item.dish_cost,
//       }));
//       console.log(orderDetails, tableNo);
      
//       // const response = await axios.post(
//       //   "http://localhost:3000/api/post-order",
//       //   {
//       //     tableNo,
//       //     orderDetails,
//       //     restaurantId,
//       //   }
//       // );
  
//       // const responseData = response.data; // Use a different name for destructured data
//       socket.emit("newOrder",{
//         tableNo,
//         orderDetails,
//         restaurantId,
//       });
//       // console.log("Order Response:", responseData);
  
//       // setOrderId(responseData.order?.id || orderId); // Update order ID if available from API
//       setIsConfirmModalOpen(true);
//       setIsBillModalOpen(false);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };
  
  
//   const handleProceedToPay = () => {
//     setIsBillModalOpen(true);
//     setIsConfirmModalOpen(false);
//   };
  
//   const handlepayment = () => {
//     setisPaymentModalOpen(true);
//     setIsBillModalOpen(false);
//   }
  
//   const handleQR = (ev) => {
//     if( !(paymentMethod === "cash") ){
//       setisQRModalOpen(true);
//       console.log("inside payment method")
//     }else{
//       setTimeout(refreshPage, 2000);
//       setIsFinalSubmit(true);
//     }
//     setisPaymentModalOpen(false);
//     setIsConfirmModalOpen(false); 
//     setToZero();
//   }

//   const handleCloseBillModal = () => {
//     setIsBillModalOpen(false);
//     setIsConfirmModalOpen(true);
//   }

//   const handleClosePaymentModal = () => {
//     setisPaymentModalOpen(false);
//     setIsBillModalOpen(true);
//   }

//   const handleCloseQRModal = () => {
//     setIsFinalSubmit(false);
//     setisQRModalOpen(false);
//     setisPaymentModalOpen(true);
//   }
  
//   const selectedItems = items.filter(item => item.quantity > 0);
//   const currentPrice = selectedItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0);
//   const totalPrice = previousItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0);


//   return (
//     <>
//       <Sidebar handleChange={handleChange} />
//       <div className={`customer-menu-container ${isModalOpen ? 'blurred' : ''}`}>
//         <div className="customer-menu-searchbar">
//           <h1 className="customer-menu-title">Menu</h1>
//           <input type="text" placeholder="Search a food" className="customer-menu-search-input" />
//           <div className="customer-menu-order-details">
//             <span className="customer-menu-order-id">#{orderId}</span>
//             <div className="customer-menu-table-no">T2</div>
//           </div>
//         </div>

//         <div className="customer-menu-items">
//             {items.map((item) => (
              
//               <div className="customer-menu-item" key={item.dish_id}>
//                 <img src={item.image} alt={item.dish_name} className="customer-menu-item-image" />
//                 <h3 className="customer-menu-item-name">{item.dish_name}</h3>
//                 <p className="customer-menu-item-description">
//                 {item.dish_description || 'No Description'}
//                 </p>
//                 <div className="customer-menu-item-footer">
//                   <span className="customer-menu-item-price">₹ {item.dish_cost}</span>
//                   <div className="customer-menu-item-controls">
//                     <button
//                       className="customer-menu-minus-btn"
//                       onClick={() => handleDecrease(item.dish_id)}
//                       disabled={item.quantity === 0}
//                     >
//                       -
//                     </button>
//                     <span className="customer-menu-quantity">{item.quantity}</span>
//                     <button
//                       className="customer-menu-plus-btn"
//                       onClick={() => handleIncrease(item.dish_id)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 {/* <button style={{ padding: '0.3rem 1rem', cursor: 'pointer' }} className="btn">Customize</button> */}
//               </div>
//             ))}
//           </div>
//         <button className="customer-menu-continue-btn" onClick={handleOpenModal}>
//           <span role="img" aria-label="cart">🛒</span> Continue
//         </button>
//       </div>




//       {/* Order Summary Modal */}
//       {isModalOpen && (
//         <div className="order-summary-modal">
//           <div className="order-summary-content">
//             <div className="order-summary-header">
//               <div className="backbtn" onClick={handleCloseModal}>&lt;</div>
//               <div className="order-summary-details">
//                 <p> #{orderId} </p>
//                 <div className="order-summary-table-no">T2</div>
//               </div>
//             </div>
//             <h2 style={{ textAlign: 'left' }}>Order Summary</h2>
//             <div className="order-summary-amount">
//               {selectedItems.length === 0 ? (
//                 <>
//                   <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '7rem' }} />
//                   <p>No items in your cart.</p>
//                 </>
//               ) : (
//                 <>
//                   <ul>
//                     {selectedItems.map((item) => (
//                       <li key={item.dish_id}>
//                         {item.dish_name}
//                         <div className="order-summary-item-controls">
//                           <button
//                             className="order-summary-minus-btn"
//                             onClick={() => handleDecrease(item.dish_id)}
//                             disabled={item.quantity === 0}
//                           >
//                             -
//                           </button>
//                           <span className="order-summary-quantity">{item.quantity}</span>
//                           <button
//                             className="order-summary-plus-btn"
//                             onClick={() => handleIncrease(item.dish_id)}
//                           >
//                             +
//                           </button>
//                         </div>
//                         ₹{item.dish_cost * item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </div>

//             <div className="order-summary-bottom">
//               <div className="order-summary-total-price">
//                 <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
//                 <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{currentPrice}</span>
//               </div>
//               <button onClick={handleConfirmOrder} className="order-summary-content-btn">
//                 Confirm Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}





//       {/* Confirm Order Modal */}
//       {isConfirmModalOpen && (
//         <div className="order-addon-modal">
//           <div className="order-addon-content">
//             <div className="order-addon-header">
//               <div className="headingSummary" > <h2 style={{ textAlign: 'left', fontSize: '2rem' }}>Order Summary</h2> 
//               <p style={{ textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Click + to repeat order</p>
//               </div>
//               <div className="order-addon-details">
//                 <div className="order-addon-details-right">
//                   <span className="order-addon-id">#{orderId}</span>
//                   <div className="order-addon-table-no">T2</div>
//                 </div>
//               </div>
//             </div>

            
            
//             <div className="order-addon-amount">
//               {previousItems.length === 0 ? (   // chaenged from selectedItems to previousItems
//                 <>
//                   <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '7rem' }} />
//                   <p>No items in your cart.</p>
//                 </>
//               ) : (
//                 <>
//                   <ul className="invoiceAllItem">
//                     {previousItems.map((item) => ( // chaenged from selectedItems to previousItems
                      
//                       <li key={item.dish_id}>
//                         {item.dish_name}
                        
//                         <div className="order-summary-item-controls">  </div>
                        
//                         {item.quantity} &nbsp; x &nbsp; ₹{item.dish_cost * item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </div>

//             <div className="order-addon-bottom">
//               <div className="order-addon-total-price">
//                 <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
//                 <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{totalPrice}</span>
//               </div>
//               <button onClick={handleProceedToPay} className="order-addon-content-btn">
//                 Proceed to Pay
//               </button>
//               <button onClick={ ()=>{ handleCloseModal(); setToZero(); } } className="order-addon-new-btn">
//                 Add new Item
//               </button>
//             </div>
//           </div>
//         </div>
//       )}




//       {/* Bill Summary Modal */}
//       {isBillModalOpen && (
//         <div className="bill-modal">
//           <div className="bill-content">
//             <div className="bill-header">
//               <div className="bill-header-left">
//                 <div className="backbtn" onClick={handleCloseBillModal}>&lt;</div>
//                 <div className="customer-detail">
//                   <span className="orderDate"> {getDate()} </span>
//                   <span className="orderTimer"> {getTime()} </span>
//                 </div>
//               </div>
//               <div className="bill-table-no">T2</div>
//             </div>

//             <div className="bill-body">
//               <span className="bill-invoice-no" style={{ borderBottom: `1px solid rgba(77, 77, 77, 0.634)`, width: '100%', textAlign: 'left', paddingBottom: '0.7rem', fontSize: '1.2rem' }}> Invoice <b>#{orderId}</b> &nbsp;  &nbsp;  &nbsp;  &nbsp;    &nbsp;    Bill Summary </span>
//               <ul className="invoiceAllItem">
//                 {previousItems.map((item) => (
//                   <li key={item.id}>
//                     <p className="food-name">
//                       <span>{item.dish_name} &nbsp; x{item.quantity}</span>
//                     </p>
//                     <p className="food-price">
//                       <span>₹{item.dish_cost * item.quantity}</span>
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//               <div className="bill-total">
                
//                 <div className="bill-total-row">
//                   <p>Grand Total:</p>
//                   <p className="light-p">₹{totalPrice}+{totalPrice*0.025} (GST) </p>
//                 </div>
//               </div>
//               <button onClick={handlepayment} className="bill-confirm-btn">
//                 CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}







//       {isPaymentModalOpen && (
//         <div className="payment-modal">
//           <div className="payment-content">
//             <div className="payement-header" onClick={handleClosePaymentModal}>
//               <img src="/payment-imgs/Right.svg" alt="" />
//             </div>

//             <div className="payement-body">
//               <div className="payment-body-title">
//                 <h2 style={{ fontSize: '2.2rem' }}>Payment Method</h2>
//                 <h5>Choose your payment method</h5>
//               </div>

//               <div className="allPaymentOptions">
//               <div className="payment-body-row disable">
//                 <div className="left-content">
//                   <img src="/payment-imgs/fp.svg" alt="" />
//                   <div className="left-content-content">
//                     <h1 className="payment-method-name">FacePae <span style={{ fontSize: '1.5rem' }}>(Coming Soon)</span></h1>
//                     <h4 className="payment-method-desc">Pay with your Face</h4>
//                   </div>
//                 </div>
//                 <div className="right-checkbox">
//                   <input name="paymentMethod" id="facePae" onClick={handlePaymentMethod} type="radio" disabled />
//                 </div>
//               </div>


//               <div className="payment-body-row disable">
//                 <div className="left-content">
//                   <img src="/payment-imgs/image-2.svg" alt="" />
//                   <div className="left-content-content">
//                     <h1 className="payment-method-name">UPI Scan Code</h1>
//                     <h4 className="payment-method-desc">Pay using QR Scanner</h4>
//                   </div>
//                 </div>
//                 <div className="right-checkbox">
//                   <input name="paymentMethod" id="upi" onClick={handlePaymentMethod} type="radio" />
//                 </div>
//               </div>


//               <div className="payment-body-row">
//                 <div className="left-content">
//                   <img src="/payment-imgs/cash.svg" alt="" />
//                   <div className="left-content-content">
//                     <h1 className="payment-method-name">Pay at Restaurant</h1>
//                     <h4 className="payment-method-desc">Pay by Cash/Card</h4>
//                   </div>
//                 </div>
//                 <div className="right-checkbox">
//                   <input name="paymentMethod" id="cash" onClick={handlePaymentMethod} type="radio" />
//                 </div>
//               </div>
//               </div>
//               <button type="submit" value={paymentMethod} onClick={handleQR} className="payment-content-btn">
//                 Pay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}






//       {isQRModalOpen && (
//         <div className="qr-modal">
//           <div className="qr-content">
//             <div className="qr-header">
//               <span className="backbtn" onClick={handleCloseQRModal} style={{ fontSize: '2.4rem', marginRight: '1.5rem' }}>&larr;</span>
//               <div className="note">
//                 <i className="fas fa-info-circle"></i>
//                 <span style={{ fontWeight: 'bold' }}>Note: Please do not close the screen until payment is done</span>
//               </div>
//             </div>
//             <div className="qr-amount">₹{totalPrice}</div>
//             <div className="qr-instructions">Scan the code to pay</div>
//             <div className="qr-code">
//               <img src={qr} alt="QR Code" />
//             </div>
//             <div> <buttom>Done</buttom> </div>
//             {/* <div className="qr-footer" style={{ fontWeight: 'bold' }}>
//               This page will automatically expire in 2 minutes
//               <div className="qr-timer">
//                 <div
//                   className="qr-timer-progress"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       )}

//       {isFinalSubmit && (
//         <div className="qr-modal">
//           <div className="qr-content">
//             <div className="qr-header">
//               <span className="backbtn" onClick={handleCloseQRModal} style={{ fontSize: '2.4rem', marginRight: '1.5rem' }}>&larr;</span>
              
//             </div>
//             {/* <div className="qr-amount">₹{totalPrice}</div>
//             <div className="qr-instructions">Scan the code to pay</div> */}
//             <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay />
//             <div className="qr-code">
//               {/* <img src={require('./src/Animation - 1733590466814.gif')} alt="loading..." />
//               <iframe className="" src="https://lottie.host/embed/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie"></iframe>
//               <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay />
//               <img src="/payment-imgs/image 23.svg" alt="QR Code" /> */}
//             </div>
//             {/* <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay /> */}
//             {/* <div className="qr-footer" style={{ fontWeight: 'bold' }}>
//               This page will automatically expire in 2 minutes
//               <div className="qr-timer">
//                 <div
//                   className="qr-timer-progress"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Menu;




// 21 feb=======================================================================================

// Older Version Keep this its a working one with a good running tabs activity
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import axios, { all } from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { io } from "socket.io-client";
import { Timer, CheckCircle} from 'lucide-react'; 
import { use } from "react";
import Lottie from "lottie-react";
import animationDataRaw from "./assets/order is confirmed animation.json";

//const socket = io("https://eatopae-backend-trials.onrender.com");
const socket = io("http://localhost:3000");
function Menu() {
  const [allItems,setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [previousItems,setPreviousItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isPaymentModalOpen, setisPaymentModalOpen] = useState(false);
  const [isQRModalOpen, setisQRModalOpen] = useState(false);
  const [paymentMethod,setPaymentMethod] = useState("cash");
  const [isFinalSubmit,setIsFinalSubmit] = useState(false);
  const [qr,setQr] = useState("/payment-imgs/image 23.svg");
  const [orderId,setOrderId] = useState(219);
  const [totalCartItems, setTotalCartItems] = useState([]);
  const [cart, setCart] = useState({});
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countdown, setCountdown] = useState(10); 
  const [isStarted, setIsStarted] = useState(false);  
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(0);
  // const [message, setMessage] = useState("");
  const [ordercount, setOrderCount] = useState(0);  
  const [isBreadModalOpen, setIsBreadModalOpen] = useState(false); 
  const [isConfirmAnimationModalOpen, setIsConfirmAnimationModalOpen] = useState(false);
  const animationData = animationDataRaw.animation;
{/* new changes */}
//   const [adminDashModalOpen , setisAdminDashModalOpen] = useState(false);
//   const [adminId, setAdminId] = useState("");
//   const [requestSent, setRequestSent] = useState(false);

//   {/* new changes */}
//   const handleSubmit = () => {
//     if (adminId.trim()) {
//       console.log(adminId);
//       setRequestSent(true);
//     } else {
//       alert("Please enter an Admin Dashboard ID.");
//     }
//   };
// {/* new changes */}
//   const handleClose = () => {
//     setRequestSent(false);
//     setisAdminDashModalOpen(false)
//     setAdminId("");
//     onClose();
//   };

const [isAdminDashModalOpen, setIsAdminDashModalOpen] = useState(false);
const [restaurant_Id, setRestaurantId] = useState('');
const [request_Sent, setRequestSent] = useState(false);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [error, setError] = useState('');

const openAdminModal = () => {
  setIsAdminDashModalOpen(true);
  // Reset all states when opening modal
  setRestaurantId('');
  setLoading(false);
  setMessage('');
  setError('');
};

// 
const closeAdminModal = () => {
  setIsAdminDashModalOpen(false);
};
const handleSubmit = async () => {
  if (!restaurantId) {
    setError('Restaurant ID is required');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const response = await axios.post('http://localhost:3000/api/req', {
      restaurant_id: restaurantId
    });
    
    if (response.data.success) {
      setMessage('Access granted! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = `/admin-dashboard/${restaurantId}`;
      }, 1500);
    } else {
      setError(response.data.message || 'Invalid restaurant ID');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to verify restaurant ID');
  } finally {
    setLoading(false);
    setRequestSent(true);
  }
};
  
  const orderBottle = () => {
    // First calculate the new count
    const newCount = count + 1;
    
    // Then update both states separately
    setCount(newCount);
    setMessage(`1L Water Bottle x ${newCount} Order Placed`);
    console.log(`item:quantity:${newCount}`);
  };
  

 const quickOrder = (dishId, dishName) => {
  // Calculate new count FIRST
  const newCount = (ordercount[dishId] || 0) + 1;

  // Update both states SEPARATELY (no nesting)
  setOrderCount({ ...ordercount, [dishId]: newCount });
  setMessage(`[${newCount}] ${dishName} Ordered`);
  
  console.log(`Item: ${dishName} (ID: ${dishId}) - Quantity: ${newCount}`);
};






   useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted]);
  
  const refreshPage = () => {
    window.location.reload();
  };

  const restaurantId = 1 ;
  const tableNo = 2 ;

  function getDate() {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const today = new Date();
    const mn = today.getMonth() ;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}  ${month[mn]}  ${year}`;
  }
  function getTime(){
    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if(hour < 13){ return `${hour}:${minutes} AM` }
    return `${hour-12}:${minutes} PM`
  }
  let updatedData = [];
  useEffect(() => {

    // Fetch data and process dish images
    console.log("useEffect executed");
    const fetchData = async () => {
      const response = await fetch("https://eatopae-backend-trials.onrender.com/api/menu",{method: "GET"}); // Replace with your API endpoint
      const data = await response.json();
      // Add quantity = 0 and handle image processing
      updatedData = data.map((item) => {
        const base64Image = item.dish_images?.[0]?.dish_image; // Access first image in the dish_images array
        const imageFormat = '*' // Assume JPEG as default or get dynamically if available
        
        return {
          ...item,
          quantity: 0, // Add default quantity
          image: base64Image 
            ? `data:image/${imageFormat};base64,${base64Image}` 
            : "/sklton_img.png", // Fallback image
        };
        
      });
      

      // setQrData()
      // console.log(updatedData);
      setItems(updatedData);
      setAllItems(updatedData)
      
    };
    // const fetchQr = async() =>{
    //   const responseQr = await fetch("http://localhost:3000/api/qr/"+restaurantId,{method: "GET"}); // Replace with your API endpoint
    //   const imgData = await responseQr.json();

    //   const uint8Array = new Uint8Array(imgData.qr_code.data); 
    //   const blob = new Blob([uint8Array], { type: 'image/png' }); 
    //   const Qr = URL.createObjectURL(blob);

    //   if(Qr) setQr(Qr);
    // };
    // const fetchOrderId = async() =>{
    //   const responseOrderId = await fetch("http://localhost:3000/api/orderid/"+tableNo,{method: "GET"}); // Replace with your API endpoint
    //   const oid = await responseOrderId.json();
    //   console.dir(oid);
    //   setOrderId(oid.order_no);
    // };

    // fetchOrderId();
    fetchData();
    // fetchQr();
  }, []);
  
  

  const handleIncrease = (id, categoryId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));

  
    // console.log("clicked with id:", id, "category id:", categoryId);
    // const index = updatedData.findIndex((item) => item.dish_id === id);
    // if (index !== -1) {
    //   updatedData[index].quantity += 1;
    // }

    // setAllItems(
    //   allItems.map((item) =>{
    //     // console.log(item.quantity);
    //     if(item.dish_id === id){
    //       console.log("if executed");
    //       return { ...item, quantity: item.quantity + 1 };
    //     }else{
    //       return item;
    //     }
    //   }
    //   )
    // );
    // setItems(updatedData.filter((item) => item.category_id === categoryId));
  };

   const handleDecrease = (id, categoryId) => {
    setCart((prevCart) => {
        if (!prevCart[id] || prevCart[id] === 1) {
            // If item count is 1 or doesn't exist, remove it from the cart
            const updatedCart = { ...prevCart };
            delete updatedCart[id];
            return updatedCart;
        }
        return {
            ...prevCart,
            [id]: prevCart[id] - 1,
        };
    });
};
  
  
  // const addItem = () => {
  //   setSelectedDishes((prevDishes) => {
  //     const itemExists = prevDishes.some((itm) => itm.dish_id === item.dish_id);
  
  //     return itemExists
  //       ? prevDishes.map((itm) =>
  //           itm.dish_id === item.dish_id
  //             ? { ...itm, quantity: (itm.quantity || 0) + 1 }
  //             : itm
  //         )
  //       : [...prevDishes, { ...item, quantity: 1 }];
  //   });
  // };
  // const addItem = () => {
  //   if(selectedItems.length > 0){
  //     setSelectedDishes(...selectedDishes, ...selectedItems);
  //   }
  // };

  // const handleIncrease = (id) => {
  //   setItems(
  //     allItems.map((item) =>
  //       item.dish_id === id && item.quantity > 0
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );

  // };
  // const handleDecrease = (id) => {
  //   setItems(
  //     allItems.map((item) =>
  //       item.dish_id === id && item.quantity > 0
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );

  // };

  
  
  


  const handleChange = ( id )=>{
    console.log("clicked "+id)
    if((id==0)){
      setItems(allItems)
    } else {
      setItems(allItems.filter(item => item.category_id == id)) 
    }
    console.log(items)
    
  }


  const handleBreadCategoryClick = () => {
    handleChange(17);
    setIsBreadModalOpen(true);
  };

    const handleDrinkCategoryClick = () => {
      handleChange(8); 
      setIsBreadModalOpen(true);
    };
  

 
  



  
  
  const setToZero = () =>{  // set to zero
    // fetchOrderId();
    setItems(
      items.map((item) =>
        item.quantity > 0
          ? { ...item, quantity: 0}
          : item
      )
    );
  }
  const handlePaymentMethod = (ev) =>{
    console.dir(ev.target.id);
    setPaymentMethod(ev.target.id);
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
    setIsBillModalOpen(false);
    setisPaymentModalOpen(false);
    setisQRModalOpen(false);
    console.log("inside Close Model");
  };

  const handleCloseBreadModal = () => {
    setIsBreadModalOpen(false)
    setMessage("");
  };
  // let cartItems = [];
  const handleOpenModal = () => {
    setIsModalOpen(true);
    const cartItems = Object.keys(cart).map((id)=>{
      let tempItem = allItems.find((p)=> p.dish_id === Number(id));
      tempItem.quantity = cart[id];
      return tempItem; 
    });
    setPrice(cartItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0));
    console.log(cartItems);

  };

  // const handleConfirmOrder = () => {
  //   setIsConfirmModalOpen(true);
  //   setIsModalOpen(false);
  // };
  // let cartItems = [];
  const handleConfirmOrder = () => {
    const cartItem = Object.keys(cart).map((id)=>{
      let tempItem = allItems.find((p)=> p.dish_id === Number(id));
      tempItem.quantity = cart[id];
      return tempItem; 
    });
    // cartItems = cartItem;
    // console.log("this is cartItems",cartItems);
    setTotalCartItems([...totalCartItems, ...cartItem]);
    
    // setPreviousItems( previousItems.concat(selectedItems) );
    // console.log(previousItems);
    console.log("these are cart items", cartItem);
    console.log("these are total items", totalCartItems);
    setTimeout(() => {
      // console.log(cartItems);
      // setTotalPrice(totalCartItems.reduce((total, item)=> total + item.dish_cost * item.quantity,0))
      setCart({});
    }, 0);
    

    try {
      // const orderDetails = [];
      const orderDetails = cartItem.map(item => ({
        dish_id: item.dish_id,
        dish_name: item.dish_name,
        quantity: item.quantity,
        dish_cost: item.dish_cost,
      }));
      // console.log(orderDetails, tableNo);
      // const data = {
      //   data:{
      //     table_no:tableNo,
      //     restaurant_id:restaurantId,
      //     order_items:{
      //       create:{
      //         order_details:orderDetails,
      //         order_status:0,
      //         restaurant_id:restaurantId,
      //       },
      //     },
      //   },
      //   include:{
      //     order_items:true,
      //   }
      // }
      
      socket.emit("newOrder",{
          tableNo,
          orderDetails,
          restaurantId,

        });
        setIsConfirmAnimationModalOpen(true);
        setIsModalOpen(false);
    
       setTimeout(() => {
        setIsConfirmAnimationModalOpen(false);
        setIsConfirmModalOpen(true);
         setIsStarted(true);
      }, 3000);
      setIsBillModalOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  


  const handleProceedToPay = () => {
    setIsBillModalOpen(true);
    setIsConfirmModalOpen(false);
  };
  
  const handlepayment = () => {
    setisPaymentModalOpen(true);
    setIsBillModalOpen(false);
  }
  
  const handleQR = (ev) => {
    if( !(paymentMethod === "cash") ){
      setisQRModalOpen(true);
      console.log("inside payment method")
    }else{
      setTimeout(refreshPage, 2000);
      setIsFinalSubmit(true);
    }
    setisPaymentModalOpen(false);
    setIsConfirmModalOpen(false); 
    setToZero();
  }

  const handleCloseBillModal = () => {
    setIsBillModalOpen(false);
    setIsConfirmModalOpen(true);
  }

  const handleClosePaymentModal = () => {
    setisPaymentModalOpen(false);
    setIsBillModalOpen(true);
  }

  const handleCloseQRModal = () => {
    setIsFinalSubmit(false);
    setisQRModalOpen(false);
    setisPaymentModalOpen(true);
  }
  
  const selectedItems = allItems.filter(item => item.quantity > 0);
  // if(selectedItems.length > 0){
  //   setTotalSelectedOrder([...totalSelectedOrder, ...selectedItems]) //made this change today
  // }
  const currentPrice = selectedItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0);
  // const totalPrice = previousItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0);
// console.log("this is selectedItems",selectedItems);
// console.log("this is items",items);
// console.log("all items", allItems);
// console.log(cartItems);
// console.log(cartItems.reduce((total, item) => total + item.dish_cost * item.quantity, 0));

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <div className={`customer-menu-container ${isModalOpen ? 'blurred' : ''}`}>
        <div className="customer-menu-searchbar">
          <h1 className="customer-menu-title">Menu</h1>
{/*           <input type="text" placeholder="Search a food" className="customer-menu-search-input" /> */}
          <div className="customer-menu-order-details">
{/*             <span className="customer-menu-order-id">#{orderId}</span> */}
            <div className="customer-menu-table-no">T2</div>
          </div>
        </div>

        <div className="customer-menu-items">
            {items.map((item) => (
              
              <div className="customer-menu-item" key={item.dish_id}>
                <img src={item.image} alt={item.dish_name} className="customer-menu-item-image" />
                <h3 className="customer-menu-item-name">{item.dish_name}</h3>
                <p className="customer-menu-item-description">
                {item.dish_description || 'No Description'}
                </p>
                <div className="customer-menu-item-footer">
                  <span className="customer-menu-item-price">₹ {item.dish_cost}</span>
                  <div className="customer-menu-item-controls">
                    <button
                      className="customer-menu-minus-btn"
                      onClick={() => handleDecrease(item.dish_id, item.category_id)}
                      
                    >
                      -
                    </button>
                    <span className="customer-menu-quantity">{cart[item.dish_id] || 0}</span>
                    <button
                      className="customer-menu-plus-btn"
                      onClick={() => handleIncrease(item.dish_id, item.category_id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* <button style={{ padding: '0.3rem 1rem', cursor: 'pointer' }} className="btn">Customize</button> */}
              </div>
            ))}
          </div>
        <button className="customer-menu-continue-btn" onClick={handleOpenModal}>
          <span role="img" aria-label="cart">🛒</span> Continue
        </button>
        {/* new changes */}
        {/* <button className="connect-dash-btn" onClick={() => setisAdminDashModalOpen(true)}>
         Connect to Dashboard
        </button> */}
      </div>

  {/* new changes */}
{/* admin-connect form Modal */}
{/* {adminDashModalOpen && (
       <div className="connect-admin-modal">
       <div className="modal-backdrop">
         {!requestSent ? (
           <div className="modal-container">
             <div className="modal-header">
               <h3>Connect to Admin Dashboard</h3>
               <button className="close-btn" onClick={handleClose}>×</button>
             </div>
             <input
               type="text"
               placeholder="Enter the Admin Dashboard ID (e.g. ADMIN-v-4-1234)"
               value={adminId}
               onChange={(e) => setAdminId(e.target.value)}
               className="admin-input"
             />
             <button className="send-request-btn" onClick={handleSubmit}>
               Send Request
             </button>
           </div>
         ) : (
           <div className="modal-container slide-in">
             <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", fontSize: "18px" }}>
               Connection request sent! Please wait for admin approval.
             </p>
             <button className="send-request-btn" onClick={handleClose}>
               Close
             </button>
           </div>
         )}
       </div>
     </div>
     
       
      )} */}
{/*new chnge*/}
<div>
      {/* Your existing component content */}
      
      {/* Connect to Dashboard button */}
      <button 
        className="connect-dash-btn" 
        onClick={openAdminModal}
      >
        Connect to Dashboard
      </button>
        {isAdminDashModalOpen && (
        <div className="connect-admin-modal">
          <div className="modal-backdrop">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Connect to Admin Dashboard</h3>
                <button className="close-btn" onClick={closeAdminModal}>×</button>
              </div>
              
              <div className="modal-body">
                <label htmlFor="restaurantId" className="input-label">
                  Enter the Restaurant ID (e.g. REST-1234)
                </label>
                <input
                  type="text"
                  id="restaurantId"
                  placeholder="REST-1234"
                  value={restaurant_Id}
                  onChange={(e) => setRestaurantId(e.target.value)}
                  className="admin-input"
                />
                
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
                
                {message && (
                  <div className="success-message">
                    {message}
                  </div>
                )}
              </div>
              
              <button 
                className="send-request-btn" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


      {/* Order Summary Modal */}
      {isModalOpen && (
        <div className="order-summary-modal">
          <div className="order-summary-content">
            <div className="order-summary-header">
              <div className="backbtn" onClick={handleCloseModal}>&lt;</div>
              <h2 style={{ textAlign: 'left' }}>Order Summary</h2>
              <div className="order-summary-details">
                <p> #{orderId} </p>
                <div className="order-summary-table-no">T2</div>
              </div>
            </div>
{/*             <h2 style={{ textAlign: 'left' }}>Order Summary</h2> */}
            <div className="order-summary-amount">
              {Object.keys(cart).length === 0 ? (
                <>
                  <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '7rem' }} />
                  <p>No items in your cart.</p>
                </>
              ) : (
                <>
                  <ul>
                    {Object.keys(cart).map((id) => {
                      const product = allItems.find((p)=>p.dish_id === Number(id));
                      // console.log(product);
                      if (!product) return null;
                      return (
                      <li key={product.dish_id}>
                        {product.dish_name}
                        <div className="order-summary-item-controls">
                          <button
                            className="order-summary-minus-btn"
                            onClick={() => handleDecrease(product.dish_id)}
                            disabled={product.quantity === 0}
                          >
                            -
                          </button>
                          <span className="order-summary-quantity">{cart[id]}</span>
                          <button
                            className="order-summary-plus-btn"
                            onClick={() => handleIncrease(product.dish_id)}
                          >
                            +
                          </button>
                        </div>
                        ₹{product.dish_cost * cart[id]}
                      </li>
                      )
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="order-summary-bottom">
              <div className="order-summary-total-price">
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{price}</span>
              </div>
              <button onClick={handleConfirmOrder} className="order-summary-content-btn">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}



{/* Confirm Order Animation Modal */}
{isConfirmAnimationModalOpen && (
        <div className="order-animation-modal">
          <div className="confirm-animation">
          <Lottie animationData={animationData} loop={false} />
          <p style={{ color: "grey", fontSize: "20px" }}>Your order is confirmed!</p> 
          </div>
        </div>
      )}

      {/* Confirm Order Modal */}
      {isConfirmModalOpen && (
          <div className="order-addon-modal">
          <div className="container">
         {/* Header */}
          <div className="timer-header">
                 <div className="bill-header-left">
                   <div className="customer-detail">
                     <span className="orderDate"> {getDate()} </span>
                     <span className="orderTimer"> {getTime()} </span>
                   </div>
                 </div>
                 <div className="bill-table-no">T2</div>
               </div>
   
         {/* Order Status */}
         <div className={`status-box ${isReady ? 'status-ready' : 'status-pending'}`}>
           <div className="status-content">
             <div className="status-text">
               {isReady
                 ? "Your Order is ready! Please go and collect it at the counter! 👍"
                 : "Your order is getting ready! We will notify you once it's ready"}
                 {isReady ? (
               <button className="btn-done">
                 <CheckCircle size={20} />
                 Done!
               </button>
             ) : (
               <div className="status-badge">
                 <Timer size={20} />
                 Ready in {countdown} sec
               </div>
             )}
             </div>
             <img
             src={
               isReady
                 ? "/done.png"
                 : "/pending.png"
             }
             alt={isReady ? "Order ready" : "Order in progress"}
             className="status-img"
           />
           </div>
         </div>
         <p style={{color:'black', textAlign:'left',marginLeft:'20px'}}> Invoice <b>#{orderId}</b></p>
         <hr />
         <h3 style={{textAlign:'left',marginLeft:'20px',marginTop:"20px"}}>Bill Summary</h3>
         <div className="order-addon-amount">
               {totalCartItems.length === 0 ? (   // chaenged from selectedItems to previousItems
                   <>
                     <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '4rem' }} />
                     <p>No items in your cart.</p>
                 </>
                 ) : (
                   <>
                  <ul className="invoiceAllItem">
                     {totalCartItems.map((item) => { // chaenged from selectedItems to previousItems
                         // console.log(item);
                         return (
                           <li key={item.dish_id}>
                             {item.dish_name}
                             
                             {/* <div className="order-summary-item-controls">  </div> */}
                             
                             &nbsp; x &nbsp;{ item.quantity}
                          </li>
                        );
                      })}
                    </ul>
                   </>
                 )}
               </div>
   
         <div className="order-addon-bottom">
                 <div className="order-addon-total-price">
                   <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
                   <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{totalPrice}</span>
                 </div>
                <button onClick={handleProceedToPay} className="order-addon-content-btn">
                  Proceed to Pay
                 </button>
                 <button onClick={ ()=>{ handleCloseModal(); setToZero(); } } className="order-addon-new-btn">
                   Add new Item
                </button>
                </div>
       </div>
       {/* quick order section-1 here */}
       <div className="quick-order-section">
        <h3>Quick Order</h3>
        <div onClick={orderBottle} className="order-bottle-btn" >
        <img src="/bottle.png" alt=""/>
        {count > 0 && <span className="badge">{count}</span>}
        </div>
      <p style={{textAlign:"center",marginTop:"10px"}}>Water Bottle</p>

      <div className="roti-container" onClick={handleBreadCategoryClick}>
      <div className="order-rotis">
      <img src="/Butter-Roti.jpg"alt=""/>
        </div>
        <p style={{textAlign:"center",marginTop:"10px"}}>Breads</p>
      </div>

      <div className="drink-container" onClick={handleDrinkCategoryClick}>
      <div className="order-rotis">
      <img src="/drink.png"alt=""/>
        </div>
        <p style={{textAlign:"center",marginTop:"10px"}}>Drinks</p>
      </div>
    
    
    </div>
    {message && <p className="message">{message}</p>}


  {/* quick order section-2 here */}
  {isBreadModalOpen && (
    <div className="quick-order-section">
       <div style={{textAlign:"left",marginLeft:"10px",marginTop:"10px", cursor:"pointer"}} onClick={handleCloseBreadModal}>X</div>
       <div>
  {items.map((item) => (
    <div 
      key={item.dish_id}  
      onClick={() => quickOrder(item.dish_id, item.dish_name)} 
      className="order-item"
    >
      <img src={item.image} alt={item.dish_name} className="order-bottle-btn" />
      <h3 style={{ textAlign: "center", marginTop: "10px", color: "black", fontSize: "16px" }}>
        {item.dish_name}
      </h3>
      {/* Display count for this item if it exists */}
      {ordercount[item.dish_id] > 0 && (
        <div className="item-count">
          {ordercount[item.dish_id]}
        </div>
      )}
    </div>
  ))}
</div>

    {message && <p className="message">{message}</p>}
    </div>
    
    )}
           </div>

        // <div className="order-addon-modal">
        //   <div className="order-addon-content">
        //     <div className="order-addon-header">
        //       <div className="headingSummary" > <h2 style={{ textAlign: 'left', fontSize: '2rem' }}>Order Summary</h2> 
        //       <p style={{ textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Click + to repeat order</p>
        //       </div>
        //       <div className="order-addon-details">
        //         <div className="order-addon-details-right">
        //           <span className="order-addon-id">#{orderId}</span>
        //           <div className="order-addon-table-no">T2</div>
        //         </div>
        //       </div>
        //     </div>

            
            
        //     <div className="order-addon-amount">
        //       {totalCartItems.length === 0 ? (   // chaenged from selectedItems to previousItems
        //         <>
        //           <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '7rem' }} />
        //           <p>No items in your cart.</p>
        //         </>
        //       ) : (
        //         <>
        //           <ul className="invoiceAllItem">
        //             {totalCartItems.map((item) => { // chaenged from selectedItems to previousItems
        //               // console.log(item);
        //               return (
        //                 <li key={item.dish_id}>
        //                   {item.dish_name}
                          
        //                   <div className="order-summary-item-controls">  </div>
                          
        //                   {item.quantity} &nbsp; x &nbsp; ₹{item.dish_cost * item.quantity}
        //                 </li>
        //               );
        //             })}
        //           </ul>
        //         </>
        //       )}
        //     </div>

        //     <div className="order-addon-bottom">
        //       <div className="order-addon-total-price">
        //         <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
        //         <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{totalPrice}</span>
        //       </div>
        //       <button onClick={handleProceedToPay} className="order-addon-content-btn">
        //         Proceed to Pay
        //       </button>
        //       <button onClick={ ()=>{ handleCloseModal(); setToZero(); } } className="order-addon-new-btn">
        //         Add new Item
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )}




      {/* Bill Summary Modal */}
      {isBillModalOpen && (
        <div className="bill-modal">
          <div className="bill-content">
            <div className="bill-header">
              <div className="bill-header-left">
                <div className="backbtn" onClick={handleCloseBillModal}>&lt;</div>
                <div className="customer-detail">
                  <span className="orderDate"> {getDate()} </span>
                  <span className="orderTimer"> {getTime()} </span>
                </div>
              </div>
              <div className="bill-table-no">T2</div>
            </div>

            <div className="bill-body">
              <span className="bill-invoice-no" style={{ borderBottom: `1px solid rgba(77, 77, 77, 0.634)`, width: '100%', textAlign: 'left', paddingBottom: '0.7rem', fontSize: '1.2rem' }}> Invoice <b>#{orderId}</b> &nbsp;  &nbsp;  &nbsp;  &nbsp;    &nbsp;    Bill Summary </span>
              <ul className="invoiceAllItem">
                {previousItems.map((item) => (
                  <li key={item.id}>
                    <p className="food-name">
                      <span>{item.dish_name} &nbsp; x{item.quantity}</span>
                    </p>
                    <p className="food-price">
                      <span>₹{item.dish_cost * item.quantity}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <div className="bill-total">
                
                <div className="bill-total-row">
                  <p>Grand Total:</p>
                  <p className="light-p">₹{totalPrice}+{totalPrice*0.05} (GST) </p>
                </div>
              </div>
              <button onClick={handlepayment} className="bill-confirm-btn">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}







      {isPaymentModalOpen && (
        <div className="payment-modal">
          <div className="payment-content">
            <div className="payement-header" onClick={handleClosePaymentModal}>
              <img src="/payment-imgs/Right.svg" alt="" />
            </div>

            <div className="payement-body">
              <div className="payment-body-title">
                <h2 style={{ fontSize: '2.2rem' }}>Payment Method</h2>
                <h5>Choose your payment method</h5>
              </div>

              <div className="allPaymentOptions">
              <div className="payment-body-row disable">
                <div className="left-content">
{/*                   <img src="/payment-imgs/fp.svg" alt="" /> */}
                  <div className="left-content-content">
                    <h1 className="payment-method-name">FacePae <span style={{ fontSize: '1.5rem' }}>(Coming Soon)</span></h1>
                    <h4 className="payment-method-desc">Pay with your Face</h4>
                  </div>
                </div>
                <div className="right-checkbox">
                  {/* <input name="paymentMethod" id="facePae" onClick={handlePaymentMethod} type="radio" disabled /> */}
                </div>
              </div>


              {/* <div className="payment-body-row disable">
                <div className="left-content">
                  <img src="/payment-imgs/image-2.svg" alt="" />
                  <div className="left-content-content">
                    <h1 className="payment-method-name">UPI Scan Code</h1>
                    <h4 className="payment-method-desc">Pay using QR Scanner</h4>
                  </div>
                </div>
                <div className="right-checkbox">
                  <input name="paymentMethod" id="upi" onClick={handlePaymentMethod} type="radio" />
                </div>
              </div> */}


              <div className="payment-body-row">
                <div className="left-content">
{/*                   <img src="/payment-imgs/cash.svg" alt="" /> */}
                  <div className="left-content-content">
                    <h1 className="payment-method-name">Pay at Restaurant</h1>
                    <h4 className="payment-method-desc">Pay by Cash/Card</h4>
                  </div>
                </div>
                <div className="right-checkbox">
                  <input name="paymentMethod" id="cash" onClick={handlePaymentMethod} type="radio" />
                </div>
              </div>
              </div>
              <button type="submit" value={paymentMethod} onClick={handleQR} className="payment-content-btn">
                Pay
              </button>
            </div>
          </div>
        </div>
      )}






      {isQRModalOpen && (
        <div className="qr-modal">
          <div className="qr-content">
            <div className="qr-header">
              <span className="backbtn" onClick={handleCloseQRModal} style={{ fontSize: '2.4rem', marginRight: '1.5rem' }}>&larr;</span>
              <div className="note">
                <i className="fas fa-info-circle"></i>
                <span style={{ fontWeight: 'bold' }}>Note: Please do not close the screen until payment is done</span>
              </div>
            </div>
            <div className="qr-amount">₹{totalPrice}</div>
            <div className="qr-instructions">Scan the code to pay</div>
            <div className="qr-code">
              <img src={qr} alt="QR Code" />
            </div>
            <div> <buttom>Done</buttom> </div>
            {/* <div className="qr-footer" style={{ fontWeight: 'bold' }}>
              This page will automatically expire in 2 minutes
              <div className="qr-timer">
                <div
                  className="qr-timer-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {isFinalSubmit && (
        <div className="qr-modal">
          <div className="qr-content">
            <div className="qr-header">
              <span className="backbtn" onClick={handleCloseQRModal} style={{ fontSize: '2.4rem', marginRight: '1.5rem' }}>&larr;</span>
              
            </div>
            {/* <div className="qr-amount">₹{totalPrice}</div>
            <div className="qr-instructions">Scan the code to pay</div> */}
            <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay />
            <div className="qr-code">
              {/* <img src={require('./src/Animation - 1733590466814.gif')} alt="loading..." />
              <iframe className="" src="https://lottie.host/embed/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie"></iframe>
              <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay />
              <img src="/payment-imgs/image 23.svg" alt="QR Code" /> */}
            </div>
            {/* <DotLottieReact src="https://lottie.host/39fcc089-e911-456b-a2cf-46d7a63d08ff/r8Kb1pYdf6.lottie" loop autoplay /> */}
            {/* <div className="qr-footer" style={{ fontWeight: 'bold' }}>
              This page will automatically expire in 2 minutes
              <div className="qr-timer">
                <div
                  className="qr-timer-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;





// import React, { useState, useEffect } from "react";
// import Sidebar from "./sidebar";
// import axios from "axios";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function Menu() {
//   const [allItems, setAllItems] = useState([]); // Global state for all items
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isBillModalOpen, setIsBillModalOpen] = useState(false);
//   const [isPaymentModalOpen, setisPaymentModalOpen] = useState(false);
//   const [isQRModalOpen, setisQRModalOpen] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [isFinalSubmit, setIsFinalSubmit] = useState(false);
//   const [qr, setQr] = useState("/payment-imgs/image 23.svg");
//   const [orderId, setOrderId] = useState(219);

//   const restaurantId = 1;
//   const tableNo = 1;

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://localhost:3000/api/menu", { method: "GET" });
//       const data = await response.json();
//       const updatedData = data.map((item) => ({
//         ...item,
//         quantity: 0, // Default quantity
//         image: item.dish_images?.[0]?.dish_image
//           ? `data:image/*;base64,${item.dish_images[0].dish_image}`
//           : "/sklton_img.png", // Fallback image
//       }));
//       setAllItems(updatedData); // Set global state
//     };
//     fetchData();
//   }, []);

//   // Handle increase quantity
//   const handleIncrease = (id) => {
//     setAllItems((prevItems) =>
//       prevItems.map((item) =>
//         item.dish_id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Handle decrease quantity
//   const handleDecrease = (id) => {
//     setAllItems((prevItems) =>
//       prevItems.map((item) =>
//         item.dish_id === id && item.quantity > 0
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // Handle category change
//   const handleChange = (id) => {
//     // No need to set `items` state; filter `allItems` dynamically when rendering
//   };

//   // Get current category items
//   const getCurrentCategoryItems = (categoryId) => {
//     return categoryId === 0
//       ? allItems // Show all items if categoryId is 0
//       : allItems.filter((item) => item.category_id === categoryId);
//   };

//   // Get selected items
//   const selectedItems = allItems.filter((item) => item.quantity > 0);
//   const currentPrice = selectedItems.reduce(
//     (total, item) => total + item.dish_cost * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Sidebar handleChange={handleChange} />
//       <div className={`customer-menu-container ${isModalOpen ? 'blurred' : ''}`}>
//         <div className="customer-menu-searchbar">
//           <h1 className="customer-menu-title">Menu</h1>
//           <input type="text" placeholder="Search a food" className="customer-menu-search-input" />
//           <div className="customer-menu-order-details">
//             <span className="customer-menu-order-id">#{orderId}</span>
//             <div className="customer-menu-table-no">T1</div>
//           </div>
//         </div>

//         <div className="customer-menu-items">
//           {getCurrentCategoryItems(0).map((item) => ( // Change `0` to the current category ID
//             <div className="customer-menu-item" key={item.dish_id}>
//               <img src={item.image} alt={item.dish_name} className="customer-menu-item-image" />
//               <h3 className="customer-menu-item-name">{item.dish_name}</h3>
//               <p className="customer-menu-item-description">
//                 {item.dish_description || 'No Description'}
//               </p>
//               <div className="customer-menu-item-footer">
//                 <span className="customer-menu-item-price">₹ {item.dish_cost}</span>
//                 <div className="customer-menu-item-controls">
//                   <button
//                     className="customer-menu-minus-btn"
//                     onClick={() => handleDecrease(item.dish_id)}
//                     disabled={item.quantity === 0}
//                   >
//                     -
//                   </button>
//                   <span className="customer-menu-quantity">{item.quantity}</span>
//                   <button
//                     className="customer-menu-plus-btn"
//                     onClick={() => handleIncrease(item.dish_id)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className="customer-menu-continue-btn" onClick={() => setIsModalOpen(true)}>
//           <span role="img" aria-label="cart">🛒</span> Continue
//         </button>
//       </div>

//       {/* Order Summary Modal */}
//       {isModalOpen && (
//         <div className="order-summary-modal">
//           <div className="order-summary-content">
//             <div className="order-summary-header">
//               <div className="backbtn" onClick={() => setIsModalOpen(false)}>&lt;</div>
//               <div className="order-summary-details">
//                 <p> #{orderId} </p>
//                 <div className="order-summary-table-no">T1</div>
//               </div>
//             </div>
//             <h2 style={{ textAlign: 'left' }}>Order Summary</h2>
//             <div className="order-summary-amount">
//               {selectedItems.length === 0 ? (
//                 <>
//                   <img src="/menu-food-imgs/Group 69.svg" alt="" style={{ height: '7rem' }} />
//                   <p>No items in your cart.</p>
//                 </>
//               ) : (
//                 <>
//                   <ul>
//                     {selectedItems.map((item) => (
//                       <li key={item.dish_id}>
//                         {item.dish_name}
//                         <div className="order-summary-item-controls">
//                           <button
//                             className="order-summary-minus-btn"
//                             onClick={() => handleDecrease(item.dish_id)}
//                             disabled={item.quantity === 0}
//                           >
//                             -
//                           </button>
//                           <span className="order-summary-quantity">{item.quantity}</span>
//                           <button
//                             className="order-summary-plus-btn"
//                             onClick={() => handleIncrease(item.dish_id)}
//                           >
//                             +
//                           </button>
//                         </div>
//                         ₹{item.dish_cost * item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </div>

//             <div className="order-summary-bottom">
//               <div className="order-summary-total-price">
//                 <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</p>
//                 <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{currentPrice}</span>
//               </div>
//               <button onClick={() => setIsConfirmModalOpen(true)} className="order-summary-content-btn">
//                 Confirm Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Menu;
