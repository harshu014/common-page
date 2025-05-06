// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css' 
// import { Link, Outlet} from "react-router-dom";
// function App() {

 
//   return (
//     <>
      
//       <nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
//         <div class="container">
//         <h1> EatOAdmin </h1>
//     <button
//       class="navbar-toggler"
//       type="button"
//       data-mdb-toggle="collapse"
//       data-mdb-target="#navbarSupportedContent"
//       aria-controls="navbarSupportedContent"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <i class="fas fa-bars"></i>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul class="navbar-nav ms-auto align-items-center">
//         <li class="nav-item">
//           <Link to ='/' class='nav-link mx-2'>Dashboard</Link>
//         </li>
//         <li class="nav-item">
//           <Link to ='/add-dish' class='nav-link mx-2'>Add Dish</Link>
//         </li>
//         {/* <li class="nav-item">
//           <Link to ='/tables' class='nav-link mx-2'>Dinning Orders</Link>
//         </li> */}
//         <li class="nav-item">
//           <Link to ='/zomato' class='nav-link mx-2'>Zomato Orders</Link>
//         </li>
        
//         <li class="nav-item">
//           <Link to ='/inventory' class='nav-link mx-2'>Inventory</Link>
//         </li>
      
        
//          <li class="nav-item">
//           <Link to ='/ingredients' class='nav-link mx-2'>Add Ingredients</Link>
//         </li>
//            <li class="nav-item">
//           <Link to ='#' class='nav-link mx-2'>Settings</Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
// <Outlet/>
//     </>
//   )
// }

// export default App;

import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import menu from './assets/Menu.png'
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between">
          {isSidebarOpen ? <h3>EatOAdmin</h3> : <img src={menu} onClick={toggleSidebar} style={{cursor:'pointer'}}></img>}
          <button 
            onClick={toggleSidebar}
            className="sidebar-toggle"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? '◀' : ''}
          </button>
        </div>
        
        <hr className="my-3" />
        
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to='/' className='nav-link'>
              {/* <i className="fas fa-tachometer-alt"></i> */}
              {isSidebarOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/add-dish' className='nav-link'>
              {/* <i className="fas fa-utensils"></i> */}
              {isSidebarOpen && <span>Add Dish</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/table' className='nav-link'>
              {/* <i className="fas fa-utensils"></i> */}
              {isSidebarOpen && <span>Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/zomato' className='nav-link'>
              {/* <i className="fas fa-motorcycle"></i> */}
              {isSidebarOpen && <span>Zomato Orders</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/inventory' className='nav-link'>
              {/* <i className="fas fa-boxes"></i> */}
              {isSidebarOpen && <span>Inventory</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/report' className='nav-link'>
              {/* <i className="fas fa-cog"></i> */}
              {isSidebarOpen && <span>Report</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/ingredients' className='nav-link'>
              {/* <i className="fas fa-carrot"></i> */}
              {isSidebarOpen && <span>Add Ingredients</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/setup' className='nav-link'>
              {/* <i className="fas fa-carrot"></i> */}
              {isSidebarOpen && <span>Set Up</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/history' className='nav-link'>
              {/* <i className="fas fa-cog"></i> */}
              {isSidebarOpen && <span>History</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='#' className='nav-link'>
              {/* <i className="fas fa-cog"></i> */}
              {isSidebarOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

