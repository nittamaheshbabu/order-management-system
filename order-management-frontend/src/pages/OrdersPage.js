import React, { useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderDate: '',
    customerId: '',
    shippingAddress: '',
    orderStatus: 'pending', // default status
    createdOn: new Date().toISOString(),
    orderLines: [], // holds order line items
  });

  // Add new order line
  const addOrderLine = () => {
    const newLine = {
      productId: '',
      quantity: 1,
      subtotal: 0,
    };
    setOrderDetails({
      ...orderDetails,
      orderLines: [...orderDetails.orderLines, newLine],
    });
  };

  // Update order line
  const updateOrderLine = (index, field, value) => {
    const updatedLines = [...orderDetails.orderLines];
    updatedLines[index][field] = value;
    // Recalculate subtotal for the line item
    if (field === 'quantity') {
      updatedLines[index].subtotal = updatedLines[index].quantity * 20; // Assume price is 20 for now
    }
    setOrderDetails({
      ...orderDetails,
      orderLines: updatedLines,
    });
  };

  // Delete order line
  const deleteOrderLine = (index) => {
    const updatedLines = [...orderDetails.orderLines];
    updatedLines.splice(index, 1);
    setOrderDetails({
      ...orderDetails,
      orderLines: updatedLines,
    });
  };

  // Calculate total for the order
  const calculateTotal = () => {
    return orderDetails.orderLines.reduce((total, line) => total + line.subtotal, 0);
  };

  // Submit order (for example, save to the database)
  const handleSubmit = () => {
    setOrders([...orders, orderDetails]);
    setOrderDetails({
      orderDate: '',
      customerId: '',
      shippingAddress: '',
      orderStatus: 'pending',
      createdOn: new Date().toISOString(),
      orderLines: [],
    });
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="date"
          placeholder="Order Date"
          value={orderDetails.orderDate}
          onChange={(e) => setOrderDetails({ ...orderDetails, orderDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={orderDetails.customerId}
          onChange={(e) => setOrderDetails({ ...orderDetails, customerId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={orderDetails.shippingAddress}
          onChange={(e) => setOrderDetails({ ...orderDetails, shippingAddress: e.target.value })}
        />
        <select
          value={orderDetails.orderStatus}
          onChange={(e) => setOrderDetails({ ...orderDetails, orderStatus: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="processed">Processed</option>
          <option value="shipped">Shipped</option>
        </select>
        <button onClick={handleSubmit}>Create Order</button>
      </form>

      <h3>Order Lines</h3>
      {orderDetails.orderLines.map((line, index) => (
        <div key={index}>
          <input
            type="number"
            placeholder="Product ID"
            value={line.productId}
            onChange={(e) => updateOrderLine(index, 'productId', e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={line.quantity}
            onChange={(e) => updateOrderLine(index, 'quantity', e.target.value)}
          />
          <button onClick={() => deleteOrderLine(index)}>Delete Line</button>
        </div>
      ))}
      <button onClick={addOrderLine}>Add Order Line</button>

      <h3>Total: ${calculateTotal()}</h3>

      <h3>Existing Orders</h3>
      {orders.map((order, index) => (
        <div key={index}>
          <p>Order Date: {order.orderDate}</p>
          <p>Customer ID: {order.customerId}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <p>Status: {order.orderStatus}</p>
          <p>Created On: {order.createdOn}</p>
          <div>
            {order.orderLines.map((line, lineIndex) => (
              <div key={lineIndex}>
                <p>Product ID: {line.productId}</p>
                <p>Quantity: {line.quantity}</p>
                <p>Subtotal: ${line.subtotal}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
