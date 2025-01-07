import React, { useState, useEffect } from 'react';
import { fetchOrders, createOrder, deleteOrder } from '../services/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customerID: '', shippingAddress: '', items: [] });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await fetchOrders();
    setOrders(data);
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    await createOrder(newOrder);
    setNewOrder({ customerID: '', shippingAddress: '', items: [] });
    loadOrders();
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    loadOrders();
  };

  return (
    <div>
      <h2>Orders</h2>
      <form onSubmit={handleAddOrder}>
        <input
          type="text"
          placeholder="Customer ID"
          value={newOrder.customerID}
          onChange={(e) => setNewOrder({ ...newOrder, customerID: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={newOrder.shippingAddress}
          onChange={(e) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })}
          required
        />
        <button type="submit">Add Order</button>
      </form>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - {order.customerID}
            <button onClick={() => handleDelete(order._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
