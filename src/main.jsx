
import { createRoot } from 'react-dom/client'
import './index.css'
import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Zomato from './zomato_orders/zomato.jsx';
import Inventory from './Inventory/Inventory.jsx';
import Reorder from './Inventory/Reorder.jsx';
import AddDish from './add-dish/add-dish.jsx';
import App from './App.jsx';
import Dashboard from './dashboard/dasboard.jsx';
import Ingredients from './ingredients/Ingredients.jsx';
import OrdersPage from './table/Table.jsx';
import SetupPage from './Set-up/setup_page.jsx';
import RestaurantHistory from './Retsro-History/restro-history.jsx';
import ReportPage from './Report/report.jsx';
// import OrderTable from './tables/OrderTable.jsx';

const Orders = lazy(() => import('./orders/orders.jsx'));

createRoot(document.getElementById('root')).render(
        <>
      <Router>
          <Routes>
            <Route path="/" element={<App/>} >
            <Route index element= {<Dashboard/>}/>
            <Route path="add-dish" element={<AddDish />} />
            <Route path="orders" element={<Orders />} />
            <Route path="/table" element={<OrdersPage />} />
            {/* <Route path="/add-dish" element={<AddDish />} /> */}
            <Route path="zomato" element={<Zomato />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="reorder" element={<Reorder />} />
            {/* <Route path="/settings" element={<Setting />} /> */}
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="setup" element={<SetupPage />} />
            <Route path="history" element={<RestaurantHistory />} />
            <Route path="report" element={<ReportPage />} />
            {/* <Route path="tables" element={<OrderTable />} /> */}
            </Route>
          </Routes>
      </Router>
    </>
)
