import React, { useState, useEffect } from "react";
const Zomato = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);

    const reloadPage = () => {
        window.location.reload();
      };

      const updateOrderStatus = (orderNo, status, orderId, orderDetails) => {
        socket.emit("updateOrderStatus", {
          order_no: orderNo,
          status,
          order_id: orderId,
          order_details: orderDetails,
        });
      };

      useEffect(() => {
      
        });
    

   return(
    <>
    <br></br><br /><br />
     <div>
     <h1>Zomato Orders <button onClick={reloadPage} style={{ padding: '10px 20px', fontSize: '16px' }}>Refresh Page </button></h1>

     <OrderSection
        title="New Orders"
        orders={newOrders}
        reqStatus={0}
        onUpdateStatus={updateOrderStatus}
      />
      <OrderSection
        title="Preparing Orders"
        orders={preparingOrders}
        reqStatus={1}
        onUpdateStatus={updateOrderStatus}
      />
      <OrderSection
        title="Delivered Orders"
        orders={finishedOrders}
        reqStatus={2}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
    </>
   )
   
}


const OrderSection = ({ title, orders, reqStatus, onUpdateStatus }) => {
  return (
    <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
      <h2>{title}</h2>
      <div className="order-container">
        {orders.map((order) => (
          <OrderCard
            key={order.order_id}
            order={order}
            reqStatus={reqStatus}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, reqStatus, onUpdateStatus }) => {
  
  // Filter order items based on the requested status
  const filteredItems = order.order_items.filter(
    (item) => item.order_status === reqStatus
  );

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="order-card">
      <p>
        <strong>Order ID:</strong> {order.order_id}
      </p>
      <div className="order-items">
        {filteredItems.map((item) => (
          <div className="order-item" key={item.order_no}>
            <p>
              <strong>Item No:</strong> {item.order_no}
            </p>
            <p>
              <strong>Details:</strong> {JSON.stringify(item.order_details)}
            </p>
            <p>
              <strong>Status:</strong> {item.order_status}
            </p>
            <button
              onClick={() =>
                onUpdateStatus(
                  item.order_no,
                  1,
                  order.order_id,
                  item.order_details
                )
              }
            >
              Move to Preparing
            </button>
            <button
              onClick={() =>
                onUpdateStatus(
                  item.order_no,
                  2,
                  order.order_id,
                  item.order_details
                )
              }
            >
              Move to Finished
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

 
export default Zomato;

