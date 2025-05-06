const OrderCard = ({ order, reqStatus, onUpdateStatus, handleSlectedTable }) => {
    // console.log(order);
    // Filter order items based on the requested status
    const filteredItems = order.order_items.filter(
      (item) => item.order_status === reqStatus
    );
  
    if (filteredItems.length === 0) {
      return null;
    }
    
    function getTime(){
      const d = new Date();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      if(hour < 13){ return `${hour}:${minutes} AM` }
      return `${hour-12}:${minutes} PM`;
    }
    function getCurrentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1; // JavaScript months are 0-indexed
      const year = today.getFullYear();
    
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  
    const acceptAction = (item,order) =>{
      onUpdateStatus(
        item.order_no,
        1,
        order.order_id,
        item.order_details
      )
      
      triggerPrint(item,order,getTime());
    }
    
    const confirmAction = (item,order) => {
      onUpdateStatus(
        item.order_no,
        2,
        order.order_id,
        item.order_details
      )
      triggerPrintForCustomer(item,order,getTime(),getCurrentDate());
    }
  
    const gettotalcost =(item)=>{
      let cost = 0;
      item.order_details.map((item)=>{
        cost+=item.quantity*item.dish_cost})
        console.log(cost)
        return cost;
    }
  
    let c = 1;
    return (
      <div className="order-card order-column" onClick={()=>(handleSlectedTable(order, reqStatus ))}>
        <div className="orderBox" >
          Table no. { order.table_no } 
        </div>
        <p>
          <strong>Order ID:</strong> {order.order_id}
        </p>
        {/* commendet code */}
        {/* <div className="order-items">
          {filteredItems.map((item) => (
            <div className="order-item" key={item.order_no}>
              <p>
                <strong>Item No:</strong> {item.order_no}
              </p>
              <p>
                <strong>Total amount:</strong>{gettotalcost(item)}
              </p>
              <p>
                <strong>Details:</strong> 
                  {item.order_details.map( (item)=>{
                    return <> <br/> {c++}. { item.dish_name } x { item.quantity } </>;
                  } )}
              </p>
              { item.order_status == 0 && <button className="printButton" onClick={ ()=>{ acceptAction(item,order) } } >
                Prt
              </button> }
              { item.order_status == 1 && <button onClick={() => { confirmAction(item,order) } } >
                Order Completed
              </button>}
            </div>
          ))}
        </div> */}
  
        {/* commented code */}
      </div>
    );
  };

  export default OrderCard;