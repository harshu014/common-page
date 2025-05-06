// import { useEffect } from 'react';
// import OrderCard from './OrderCard';
// import { io } from 'socket.io-client';
// const socket =  io("http://localhost:3000");

// const OrderSection = ({ title, orders, reqStatus, onUpdateStatus, handleSlectedTable, acceptAction }) => {
//     useEffect(() => {
//       // Auto-accept orders with a delay if they are in 'new' status (status = 0)
//       orders.forEach((order) => {
//         console.log(order);
//         if (reqStatus === 0) { // Check only new orders
//           const timeoutId = setTimeout(() => {
//             console.log(`Auto-accepting order ${order}`);
//             handleSlectedTable(order, 0,); // Auto-accept the order (1 = Accepted)
//             acceptAction(order)
//             // (orderNo, status, orderId, orderDetails)
//             // socket.emit("updateOrderStatus", {
//             //   order_no: order.order_id,
//             //   status: 1,
//             //   order_id: order.order_id,
//             //   order_details: order,
//             // });
//           }, 40000); // 10 seconds delay
          
//           // Cleanup timeout when order changes or component unmounts
//           return () => clearTimeout(timeoutId);
//         }
//         return null;
//       });
//     }, []); // Re-run when orders or onUpdateStatus change
//     useEffect(() => {
//       // Auto-accept orders with a delay if they are in 'new' status (status = 0)
//       orders.forEach((order) => {
//         console.log(order);
//         if (reqStatus === 0) { // Check only new orders
//           const timeoutId = setTimeout(() => {
//             console.log(`Auto-accepting order ${order}`);
//             handleSlectedTable(order, 0,); // Auto-accept the order (1 = Accepted)
//             acceptAction(order)
//             // (orderNo, status, orderId, orderDetails)
//             // socket.emit("updateOrderStatus", {
//             //   order_no: order.order_id,
//             //   status: 1,
//             //   order_id: order.order_id,
//             //   order_details: order,
//             // });
//           }, 40000); // 10 seconds delay
          
//           // Cleanup timeout when order changes or component unmounts
//           return () => clearTimeout(timeoutId);
//         }
//         return null;
//       });
//     }, [orders, onUpdateStatus]); // Re-run when orders or onUpdateStatus change
    
  
//     return (
//       <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
//         <h2>{title}</h2>
//         <div className="order-container">
//           {orders.map((order) => (
//             <OrderCard
//               key={order.order_id}
//               order={order}
//               reqStatus={reqStatus}
//               onUpdateStatus={onUpdateStatus}
//               handleSlectedTable={handleSlectedTable}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default OrderSection;



// // import { useEffect } from 'react';
// // import { io } from 'socket.io-client';
// // import OrderCard from './OrderCard';

// // const socket = io("http://localhost:3000");

// // const OrderSection = ({ title, orders, reqStatus, onUpdateStatus, handleSlectedTable }) => {
  
// //   useEffect(() => {
// //     if (reqStatus === 0) { // Only for new orders
// //       const timeouts = orders.map((order) => 
// //         setTimeout(() => {
// //           console.log(`Auto-accepting order ${order.order_id}`);
// //           socket.emit("updateOrderStatus", {
// //             order_no: order.order_id,
// //             status: 1, // ✅ Fixed issue with unnamed key
// //             order_id: order.order_id,
// //             order_details: order.order_details, // ✅ Fixed undefined variable
// //           });
// //         }, 10000) // 10 seconds delay
// //       );

// //       // Cleanup function to clear all timeouts
// //       return () => timeouts.forEach(clearTimeout);
// //     }
// //   }, []); // ✅ Fixed missing dependency
  
// //   useEffect(() => {
// //     const timeouts = orders.map((order) => {
// //       if (order.status === 0) {
// //         return setTimeout(() => {
// //           console.log(`Auto-accepting order ${order.order_id}`);
// //           onUpdateStatus(order.order_id, 1);
// //         }, 10000);
// //       }
// //       return null;
// //     });

// //     // Cleanup function to clear all timeouts
// //     return () => timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
// //   }, [orders, onUpdateStatus]);

// //   return (
// //     <div className={`order-section ${title.replace(" ", "").toLowerCase()}`}>
// //       <h2>{title}</h2>
// //       <div className="order-container">
// //         {orders.map((order) => (
// //           <OrderCard
// //             key={order.order_id}
// //             order={order}
// //             reqStatus={reqStatus}
// //             onUpdateStatus={onUpdateStatus}
// //             handleSlectedTable={handleSlectedTable}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderSection;





import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const OrderSection = ({ title, orders, reqStatus, onUpdateStatus, handleSlectedTable, acceptAction, orderPrint}) => {
  const autoAccept = (item) => {
    console.log(new Date());
    const tempItems = item.order_items.filter(
      (item) => item.order_status === 0
    );
    
    tempItems.map((ord) =>{
      console.log(ord.order_no);
      const tableNo = item.table_no;
      orderPrint(ord,tableNo);
      onUpdateStatus(
        ord.order_no,
        1,
        // order.order_id,
        item.order_id,
        ord.order_details
      )

    });
  };

  useEffect(() => {
    if (reqStatus === 0 && orders.length > 0) {
      const timer = setTimeout(() => {
        console.log("Timeout executed after 10 seconds");
        autoAccept(orders[0]);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [orders]);
  
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
            handleSlectedTable={handleSlectedTable}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderSection;
